
/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import 'dotenv/config';
import express from 'express';
import { GoogleAuth } from 'google-auth-library';
import fetch from 'node-fetch';
import rateLimit from 'express-rate-limit';
import { WebSocketServer, WebSocket } from 'ws';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({limit: process?.env?.API_PAYLOAD_MAX_SIZE || "7mb"}));
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process?.env?.PORT || process?.env?.API_BACKEND_PORT || 5000;
const API_BACKEND_HOST = process?.env?.API_BACKEND_HOST || "0.0.0.0";

const GOOGLE_CLOUD_LOCATION = process?.env?.GOOGLE_CLOUD_LOCATION;
const GOOGLE_CLOUD_PROJECT = process?.env?.GOOGLE_CLOUD_PROJECT;
if (!GOOGLE_CLOUD_PROJECT || !GOOGLE_CLOUD_LOCATION) {
  console.error("Error: Environment variables GOOGLE_CLOUD_PROJECT and GOOGLE_CLOUD_LOCATION must be set.");
  process.exit(1);
}
const PROXY_HEADER = process?.env?.PROXY_HEADER;
if (!PROXY_HEADER) {
  console.error("Error: Environment variables PROXY_HEADER must be set.");
  process.exit(1);
}

app.set('trust proxy', 1 /* number of proxies between user and server */);

// IMPORTANT: Vertex AI Studio Rate Limiting
// This rate limiting configuration protects your backend APIs from abuse.
// Removing it exposes your service to DoS attacks and unexpected costs.
const proxyLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // Set ratelimit window at 15min (in ms)
    max: 100, // Limit each IP to 100 requests per window 
    standardHeaders: true, // Return rate limit info in the "RateLimit-*" headers
    legacyHeaders: false, // no "X-RateLimit-*" headers
    message: {
      error: 'Too many requests',
      message: 'You have exceed the request limit, please try again later.'
    },
});
// Apply the rate limiter to the /api-proxy route before the main proxy logic
app.use('/api-proxy', proxyLimiter);

const API_CLIENT_MAP = [
 {
    name: "VertexGenAi:generateContent",
    patternForProxy: "https://aiplatform.googleapis.com/{{version}}/publishers/google/models/{{model}}:generateContent",
    getApiEndpoint: (context, params) => {
      return `https://aiplatform.clients6.google.com/${params['version']}/projects/${context.projectId}/locations/${context.region}/publishers/google/models/${params['model']}:generateContent`;
    },
    isStreaming: false,
    transformFn: null,
  },
 {
    name: "VertexGenAi:predict",
    patternForProxy: "https://aiplatform.googleapis.com/{{version}}/publishers/google/models/{{model}}:predict",
    getApiEndpoint: (context, params) => {
      return `https://aiplatform.clients6.google.com/${params['version']}/projects/${context.projectId}/locations/${context.region}/publishers/google/models/${params['model']}:predict`;
    },
    isStreaming: false,
    transformFn: null,
  },
 {
    name: "VertexGenAi:streamGenerateContent",
    patternForProxy: "https://aiplatform.googleapis.com/{{version}}/publishers/google/models/{{model}}:streamGenerateContent",
    getApiEndpoint: (context, params) => {
      return `https://aiplatform.clients6.google.com/${params['version']}/projects/${context.projectId}/locations/${context.region}/publishers/google/models/${params['model']}:streamGenerateContent`;
    },
    isStreaming: true,
    transformFn: (response) => {
        let normalizedResponse = response.trim();
        while (normalizedResponse.startsWith(',') || normalizedResponse.startsWith('[')) {
          normalizedResponse = normalizedResponse.substring(1).trim();
        }
        while (normalizedResponse.endsWith(',') || normalizedResponse.endsWith(']')) {
          normalizedResponse = normalizedResponse.substring(0, normalizedResponse.length - 1).trim();
        }

        if (!normalizedResponse.length) {
          return {result: null, inProgress: false};
        }

        if (!normalizedResponse.endsWith('}')) {
          return {result: normalizedResponse, inProgress: true};
        }

        try {
          const parsedResponse = JSON.parse(`${normalizedResponse}`);
          const transformedResponse = `data: ${JSON.stringify(parsedResponse)}\n\n`;
          return {result: transformedResponse, inProgress: false};
        } catch (error) {
          throw new Error(`Failed to parse response: ${error}.`);
        }
    },
  },
].map((client) => ({ ...client, patternInfo: parsePattern(client.patternForProxy) }));

// IMPORTANT: Vertex AI Studio SSRF Protection
// The set below is the exhaustive allow-list of upstream hostnames this
// proxy may forward authenticated requests to. It is sourced at code
// generation time from the RestApiClient.getAllowedUpstreamHosts() of every
// client embedded in API_CLIENT_MAP. Removing, weakening, or widening this
// check (for example, by adding wildcards or computing entries from request
// data) re-introduces the SSRF vulnerability that allows the deployed
// service account's OAuth access token to be exfiltrated to an
// attacker-controlled host.
const ALLOWED_UPSTREAM_HOSTS = new Set([
  "aiplatform.clients6.google.com",
]);

// Uses Google Application Default Credentials (ADC).
// Users need to run "gcloud auth application-default login" in order to use the proxy.
const auth = new GoogleAuth({
  scopes: ['https://www.googleapis.com/auth/cloud-platform'],
});

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function parsePattern(pattern) {
  const paramRegex = /\{\{(.*?)\}\}/g;
  const params = [];
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = paramRegex.exec(pattern)) !== null) {
    params.push(match[1]);
    const literalPart = pattern.substring(lastIndex, match.index);
    parts.push(escapeRegex(literalPart));
    parts.push(`(?<${match[1]}>[^/]+)`);
    lastIndex = paramRegex.lastIndex;
  }
  parts.push(escapeRegex(pattern.substring(lastIndex)));
  const regexString = parts.join('');

  return {regex: new RegExp(`^${regexString}$`), params};
}

function extractParams(patternInfo, url) {
  const match = url.match(patternInfo.regex);
  if (!match) return null;
  const params = {};
  patternInfo.params.forEach((paramName, index) => {
    params[paramName] = match[index + 1];
  });
  return params;
}

async function getAccessToken(res) {
  try {
    const authClient = await auth.getClient();
    const token = await authClient.getAccessToken();
    return token.token;
  } catch (error) {
    console.error('[Node Proxy] Authentication error:', error);
    if (!res) return null;
    if (error.code === 'ERR_GCLOUD_NOT_LOGGED_IN' || (error.message && error.message.includes('Could not load the default credentials'))) {
      res.status(401).json({
        error: 'Authentication Required',
        message: 'Google Cloud Application Default Credentials not found or invalid. Please run "gcloud auth application-default login" and try again.',
      });
    } else {
      res.status(500).json({ error: `Authentication failed: ${error.message}` });
    }
    return null;
  }
}

function getRequestHeaders(accessToken) {
  return {
    'Authorization': `Bearer ${accessToken}`,
    'X-Goog-User-Project': GOOGLE_CLOUD_PROJECT,
    'Content-Type': 'application/json',
  };
}

// --- Proxy Endpoint ---
app.post('/api-proxy', async (req, res) => {

  // Check for the custom header added by the shim
  if (req.headers['x-app-proxy'] !== PROXY_HEADER) {
    return res.status(403).send('Forbidden: Request must originate from the Vertex App shim.');
  }

  const { originalUrl, method, headers, body } = req.body;
  if (!originalUrl) {
    return res.status(400).send('Bad Request: originalUrl is required.');
  }

  // 1. Find the matching API client
  const apiClient = API_CLIENT_MAP.find(p => {
    // We store extractedParams on req for use later if needed, though getVertexUrl takes it as arg.
    req.extractedParams = extractParams(p.patternInfo, originalUrl);
    return req.extractedParams !== null;
  });

  if (!apiClient) {
    console.error(`[Node Proxy] No API client handler found for URL: ${originalUrl}`);
    return res.status(404).json({ error: `No proxy handler found for URL: ${originalUrl}` });
  }

  const extractedParams = req.extractedParams;
  console.log(`[Node Proxy] Matched API client: ${apiClient.name}`);
  try {
    // 2. Get authenticated access token
    const accessToken = await getAccessToken(res);
    if (!accessToken) return;

    // 3. Construct the full API URL using env-set GOOGLE_CLOUD_PROJECT/LOCATION and extracted params
    const context = {projectId: GOOGLE_CLOUD_PROJECT, region: GOOGLE_CLOUD_LOCATION};
    const apiUrl = apiClient.getApiEndpoint(context, extractedParams);

    // IMPORTANT: Vertex AI Studio SSRF Protection
    // Parse the constructed apiUrl with the standard URL parser (not a
    // regex) and require the resulting hostname to be in the hardcoded
    // ALLOWED_UPSTREAM_HOSTS set. This neutralizes attacks that smuggle a
    // URL-grammar delimiter (e.g. '#') into a pattern parameter to redirect
    // the authenticated upstream request to an attacker-controlled host.
    let parsedApiUrl;
    try {
      parsedApiUrl = new URL(apiUrl);
    } catch (e) {
      console.error(`[Node Proxy] Invalid API URL: ${apiUrl}`);
      return res.status(400).json({ error: 'Invalid API URL.' });
    }
    if (!ALLOWED_UPSTREAM_HOSTS.has(parsedApiUrl.hostname.toLowerCase())) {
      console.error(`[Node Proxy] Upstream host not allowed: ${parsedApiUrl.hostname}`);
      return res.status(400).json({ error: 'Upstream host not allowed.' });
    }
    console.log(`[Node Proxy] Forwarding to Vertex API: ${apiUrl}`);

    // 4. Prepare headers for the API call
    const apiHeaders = getRequestHeaders(accessToken);

    const apiFetchOptions = {
      method: method || 'POST',
      headers: {...apiHeaders, ...headers},
      body: body ? body : undefined,
    };

    // 5. Make the call to the API
    const apiResponse = await fetch(apiUrl, apiFetchOptions);

    // 6. Respond to the client based on stream type
    if (apiClient.isStreaming) {
      console.log(`[Node Proxy] Sending STREAMING response for ${apiClient.name}`);
      // Set headers for a streaming JSON response
      res.writeHead(apiResponse.status, {
        'Content-Type': 'text/event-stream',
        'Transfer-Encoding': 'chunked',
        'Connection': 'keep-alive',
      });
      // Immediately send headers
      res.flushHeaders();

      if (!apiResponse.body) {
        console.error('[Node Proxy] Streaming response has no body.');
        return res.end(JSON.stringify({ error: 'Streaming response body is null' }));
      }

      const decoder = new TextDecoder();
      let deltaChunk = '';
      apiResponse.body.on('data', (encodedChunk) => {
        if (res.writableEnded) return; // Prevent writing after res.end()

        try {
          if (!apiClient.transformFn) {
            res.write(encodedChunk);
          } else {
            const decodedChunk = decoder.decode(encodedChunk, { stream: true });
            deltaChunk = deltaChunk + decodedChunk;

            const {result, inProgress} = apiClient.transformFn(deltaChunk);
            if (result && !inProgress) {
              deltaChunk = '';
              res.write(new TextEncoder().encode(result));
            }
          }
        } catch (error) {
          console.error(`[Node Proxy] Error processing streaming response for ${apiClient.name}`);
          console.error(error);
        }
      });

      apiResponse.body.on('end', () => {
        deltaChunk = '';
        console.log(`[Node Proxy] Vertex stream finished and all data processed for ${apiClient.name}`);
        res.end();
      });

      apiResponse.body.on('error', (streamError) => {
        console.error('[Node Proxy] Error from Vertex stream:', streamError);
        if (!res.writableEnded) {
          res.end(JSON.stringify({ proxyError: 'Stream error from Vertex AI', details: streamError.message }));
        }
      });

      res.on('error', (resError) => {
        console.error('[Node Proxy] Error writing to client response:', resError);
        // The source stream might need to be destroyed if an error occurs here.
        if (apiResponse.body && typeof apiResponse.body.destroy === 'function') {
             apiResponse.body.destroy(resError);
        }
      });
    } else {
      // Non-streaming response handling
      console.log(`[Node Proxy] Sending JSON response for ${apiClient.name}`);
      const data = await apiResponse.json();
      res.status(apiResponse.status).json(data);
    }
  } catch (error) {
    console.error(`[Node Proxy] Error proxying request for ${apiClient.name}`);
    console.error(error)
    res.status(500).json({ error: error });
  }
});

const ADMIN_ACCESS_CODE = process?.env?.ADMIN_ACCESS_CODE || "ProsurAdmin2026";

function parseCSV(text) {
  const result = [];
  let row = [];
  let currentVal = '';
  let inQuotes = false;
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];
    
    if (inQuotes) {
      if (char === '"') {
        if (nextChar === '"') {
          currentVal += '"';
          i++; // skip next quote
        } else {
          inQuotes = false;
        }
      } else {
        currentVal += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        row.push(currentVal);
        currentVal = '';
      } else if (char === '\r') {
        // ignore
      } else if (char === '\n') {
        row.push(currentVal);
        result.push(row);
        row = [];
        currentVal = '';
      } else {
        currentVal += char;
      }
    }
  }
  
  if (row.length > 0 || currentVal) {
    row.push(currentVal);
    result.push(row);
  }
  
  return result;
}

function serializeCSV(rows) {
  return rows.map(row => {
    return row.map(val => {
      const stringVal = String(val);
      if (stringVal.includes('"') || stringVal.includes(',') || stringVal.includes('\n') || stringVal.includes('\r')) {
        return `"${stringVal.replace(/"/g, '""')}"`;
      }
      return stringVal;
    }).join(',');
  }).join('\n');
}

// --- Google Sheet Proxy Endpoint ---
app.get('/sheet-proxy', async (req, res) => {
  try {
    const csvUrl = "https://docs.google.com/spreadsheets/d/1EtwmDT0nwUhMTXTPTQsHRdWWi-ehLgib3dBwpXUp0Nc/export?format=csv&gid=362040753";
    console.log(`[Node Proxy] Fetching Google Sheet CSV from: ${csvUrl}`);
    const response = await fetch(csvUrl);
    if (!response.ok) throw new Error("HTTP error " + response.status);
    const csvText = await response.text();
    
    // Check if the request includes a valid admin access token
    const clientToken = req.query.token || req.headers['x-admin-token'];
    const isAdmin = clientToken === ADMIN_ACCESS_CODE;
    
    let responseText = csvText;
    
    if (!isAdmin) {
      console.log("[Node Proxy] Non-admin access, censoring sensitive columns...");
      const parsedRows = parseCSV(csvText);
      const headerIndex = parsedRows.findIndex(row => row[0] && row[0].toLowerCase().includes("nombre del equipo"));
      
      if (headerIndex !== -1) {
        for (let i = headerIndex + 1; i < parsedRows.length; i++) {
          const row = parsedRows[i];
          if (!row[0] || !row[0].trim()) continue;
          
          // Censor sensitive fields only if they have content
          if (row.length > 1 && row[1] && row[1].trim()) row[1] = '[Protegido]';
          if (row.length > 4 && row[4] && row[4].trim()) row[4] = '[Protegido]';
          if (row.length > 5 && row[5] && row[5].trim()) row[5] = '[Protegido por confidencialidad]';
          if (row.length > 7 && row[7] && row[7].trim()) row[7] = '[Protegido por confidencialidad]';
          if (row.length > 8 && row[8] && row[8].trim()) row[8] = '[Protegido por confidencialidad]';
          if (row.length > 9 && row[9] && row[9].trim()) row[9] = '[Protegido por confidencialidad]';
        }
      }
      responseText = serializeCSV(parsedRows);
    } else {
      console.log("[Node Proxy] Admin access granted, returning full CSV dataset");
    }
    
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Expose-Headers', 'X-Is-Admin');
    res.setHeader('X-Is-Admin', isAdmin ? 'true' : 'false');
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.send(responseText);
  } catch (error) {
    console.error("[Node Proxy] Error proxying Google Sheet:", error);
    res.status(500).json({ error: error.message });
  }
});


// ==========================================
// BLOG DE TENDENCIAS DE IA Y RED SOCIAL INTERNA
// ==========================================

const trendsFilePath = path.join(__dirname, 'data', 'trends.json');
const postsFilePath = path.join(__dirname, 'data', 'posts.json');
const chatHistoryFilePath = path.join(__dirname, 'data', 'chat_history.json');

const FALLBACK_TRENDS = [
  {
    id: 1,
    title: "Agentes Autónomos en Procesos de Manufactura",
    category: "Agentes de Software",
    summary: "Los agentes basados en LLMs están automatizando flujos de trabajo complejos de compras y control de calidad corporativos, integrándose con ERPs locales.",
    content: "La adopción de agentes autónomos inteligentes está marcando el inicio de una nueva era industrial. A diferencia de las automatizaciones rígidas del pasado, estos agentes interpretan correos de clientes, verifican stock en tiempo real y toman decisiones adaptativas sobre compras de repuestos.\n\nEn operaciones logísticas complejas, los agentes coordinan dinámicamente con transportistas ante demoras climáticas, negociando alternativas basadas en costo e historial de entregas. Su capacidad de interactuar mediante APIs con ERPs existentes reduce procesos administrativos que tomaban días a solo minutos, eliminando el error humano de transcripción.",
    keyPoints: [
      "Interoperabilidad fluida con ERPs y bases de datos heredadas mediante APIs.",
      "Toma de decisiones lógicas basadas en variables dinámicas de precio y stock.",
      "Reducción demostrada de un 35% en tiempos de gestión operativa inicial."
    ],
    impact: "Se prevé que el 65% de las grandes manufactureras desplieguen agentes autónomos integrados en compras y planeamiento de insumos para el cierre de 2027.",
    author: "Comité de Innovación Prosur",
    readTime: "5 min de lectura",
    date: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
  },
  {
    id: 2,
    title: "Modelos Locales Eficientes (Edge AI) para Privacidad Absoluta",
    category: "Modelos de Lenguaje",
    summary: "Los nuevos Small Language Models (SLMs) ejecutables localmente abren la puerta a la adopción de IA corporativa sin exponer propiedad intelectual.",
    content: "La seguridad de los datos es el reto principal al incorporar IA en procesos clave. Los modelos de lenguaje pequeños (SLMs) ofrecen una solución a esta problemática, pues pueden ejecutarse en servidores locales corporativos o incluso computadoras de escritorio modernas con NPUs integradas.\n\nEste esquema evita el envío de información confidencial de clientes o finanzas a servidores en la nube de terceros. Su precisión en tareas enfocadas, como auditoría de contratos, análisis de nóminas y resúmenes de minutas internas, ya rivaliza con modelos comerciales gigantescos a una fracción del costo operativo.",
    keyPoints: [
      "Cumplimiento garantizado al procesar información confidencial in-house.",
      "Costos de infraestructura fijos y predecibles, eliminando tarifas por token.",
      "Optimización específica del modelo para terminología técnica de la empresa."
    ],
    impact: "Aumento drástico en la demanda de hardware de cómputo local con aceleración de IA dedicada y despliegues aislados en redes internas seguras.",
    author: "Área de Ciberseguridad Prosur",
    readTime: "4 min de lectura",
    date: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
  },
  {
    id: 3,
    title: "Generadores de Código e Interfaces de Usuario Express",
    category: "Productividad",
    summary: "Plataformas de programación generativa permiten a equipos de negocio crear herramientas internas personalizadas en horas en lugar de meses.",
    content: "El desarrollo de herramientas departamentales está viviendo un cambio fundamental. Gracias a generadores de UI impulsados por IA, analistas de negocio y coordinadores pueden estructurar dashboards, formularios de registro y gestores de solicitudes escribiendo simplemente lo que necesitan en español.\n\nEstas aplicaciones se configuran visualmente siguiendo paletas de colores corporativas y esquemas estándar. Esto reduce drásticamente el tiempo de desarrollo (backlog) de los equipos de tecnología, permitiendo un prototipado veloz y adaptativo a los requerimientos de la operación diaria.",
    keyPoints: [
      "Desarrollo ágil de soluciones departamentales a partir de lenguaje natural.",
      "Reducción del 50% en solicitudes menores de soporte y desarrollo a TI.",
      "Creación de interfaces web responsive y funcionales listas para uso interno."
    ],
    impact: "El empoderamiento de usuarios no técnicos (citizen developers) liderará la optimización de procesos pequeños pero críticos en las unidades de negocio.",
    author: "División de TI Prosur",
    readTime: "3 min de lectura",
    date: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
  }
];

function initDataStorage() {
  const dataDir = path.join(__dirname, 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
    console.log(`[Data Storage] Created directory: ${dataDir}`);
  }
  
  if (!fs.existsSync(trendsFilePath)) {
    fs.writeFileSync(trendsFilePath, JSON.stringify([], null, 2), 'utf-8');
    console.log(`[Data Storage] Created empty file: ${trendsFilePath}`);
  }
  
  if (!fs.existsSync(postsFilePath)) {
    const initialPosts = [
      {
        id: "1",
        title: "Claude 3.5 Sonnet",
        url: "https://www.anthropic.com/claude",
        category: "Programación",
        description: "Modelo de lenguaje avanzado líder en codificación y razonamiento lógico.",
        utility: "Nos ayuda a generar scripts de automatización de datos de ventas de manera mucho más rápida e interactiva.",
        author: "María Pérez",
        likes: 12,
        likedBy: [],
        createdAt: new Date(Date.now() - 3600000 * 24 * 3).toISOString(),
        comments: [
          {
            id: "c1",
            author: "Juan Gómez",
            text: "Totalmente de acuerdo, la velocidad de desarrollo ha mejorado significativamente.",
            createdAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString()
          }
        ]
      },
      {
        id: "2",
        title: "v0 by Vercel",
        url: "https://v0.dev",
        category: "Diseño y Creatividad",
        description: "Generador de interfaces de usuario React/HTML interactivo mediante lenguaje natural.",
        utility: "Permite a analistas armar prototipos visuales de pantallas internas en minutos sin escribir CSS desde cero.",
        author: "Carlos Barrientos",
        likes: 8,
        likedBy: [],
        createdAt: new Date(Date.now() - 3600000 * 24 * 1).toISOString(),
        comments: []
      }
    ];
    fs.writeFileSync(postsFilePath, JSON.stringify(initialPosts, null, 2), 'utf-8');
    console.log(`[Data Storage] Seeded social network file: ${postsFilePath}`);
  }

  if (!fs.existsSync(chatHistoryFilePath)) {
    const seedMessages = [
      {
        id: "m1",
        author: "Moderador Prosur",
        text: "¡Hola a todos! Bienvenidos al canal de chat en vivo de la comunidad de IA Prosur. Compartan cualquier duda o idea aquí en tiempo real.",
        createdAt: new Date(Date.now() - 3600000).toISOString()
      }
    ];
    fs.writeFileSync(chatHistoryFilePath, JSON.stringify(seedMessages, null, 2), 'utf-8');
    console.log(`[Data Storage] Seeded chat history file: ${chatHistoryFilePath}`);
  }
}

async function generateTrendsFromVertex() {
  const token = await getAccessToken();
  if (!token) {
    throw new Error("No Google Application Default Credentials available.");
  }
  const location = GOOGLE_CLOUD_LOCATION === 'global' ? 'us-central1' : GOOGLE_CLOUD_LOCATION;
  const apiUrl = `https://${location}-aiplatform.clients6.google.com/v1/projects/${GOOGLE_CLOUD_PROJECT}/locations/${location}/publishers/google/models/gemini-1.5-flash:generateContent`;

  const prompt = `Actúa como un analista experto en tecnología e Inteligencia Artificial corporativa.
Genera un array JSON de exactamente 3 artículos con tendencias actuales de IA para hoy (${new Date().toLocaleDateString('es-ES')}).
Cada objeto del artículo debe tener exactamente estas claves:
- "id": número único (1, 2, 3)
- "title": título corto y sumamente atractivo
- "category": categoría (ej. "Modelos de Lenguaje", "Agentes de Software", "Diseño y Creatividad", "Productividad", "IA en Negocios")
- "summary": resumen ejecutivo de 1 o 2 frases
- "content": artículo detallado con formato markdown básico (mínimo 2 párrafos de análisis tecnológico)
- "keyPoints": array con exactamente 3 puntos clave (strings)
- "impact": proyección del impacto de esta tendencia a 12 meses para empresas como Grupo Prosur
- "author": un nombre realista de analista (ej. "Comité de Innovación Prosur", "Analista de TI")
- "readTime": tiempo de lectura estimado (ej. "4 min de lectura")
- "date": fecha formateada en español (ej. "14 de Julio, 2026")

Importante: Devuelve ÚNICAMENTE el array de objetos JSON limpio, sin bloques de código markdown, sin \`\`\`json y sin texto introductorio o de cierre. Debe ser directamente parseable por JSON.parse.`;

  const requestBody = {
    contents: [
      {
        role: "user",
        parts: [
          { text: prompt }
        ]
      }
    ],
    generationConfig: {
      responseMimeType: "application/json",
      temperature: 0.7
    }
  };

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'X-Goog-User-Project': GOOGLE_CLOUD_PROJECT,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Vertex AI error status ${response.status}: ${errorText}`);
  }

  const result = await response.json();
  const responseText = result.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!responseText) {
    throw new Error("Empty response from Vertex AI");
  }

  const parsed = JSON.parse(responseText.trim());
  if (!Array.isArray(parsed)) {
    throw new Error("Response is not an array");
  }
  return parsed;
}

async function getOrUpdateTrends(force = false) {
  try {
    let shouldUpdate = force;
    if (!shouldUpdate) {
      if (!fs.existsSync(trendsFilePath)) {
        shouldUpdate = true;
      } else {
        const stats = fs.statSync(trendsFilePath);
        const fileAgeHours = (Date.now() - stats.mtimeMs) / (1000 * 60 * 60);
        const currentData = fs.readFileSync(trendsFilePath, 'utf-8');
        if (fileAgeHours >= 24 || currentData.trim() === '[]' || currentData.trim() === '') {
          shouldUpdate = true;
        }
      }
    }

    if (shouldUpdate) {
      console.log("[Trends Service] Trends are stale or missing, generating new trends...");
      try {
        const freshTrends = await generateTrendsFromVertex();
        fs.writeFileSync(trendsFilePath, JSON.stringify(freshTrends, null, 2), 'utf-8');
        console.log("[Trends Service] Successfully generated trends from Vertex AI.");
      } catch (err) {
        console.error("[Trends Service] Failed to call Vertex AI, using high-quality fallback trends:", err.message);
        // Write fallbacks only if current file is empty or missing
        const currentData = fs.existsSync(trendsFilePath) ? fs.readFileSync(trendsFilePath, 'utf-8') : '';
        if (currentData.trim() === '[]' || currentData.trim() === '') {
          fs.writeFileSync(trendsFilePath, JSON.stringify(FALLBACK_TRENDS, null, 2), 'utf-8');
        }
      }
    }
  } catch (error) {
    console.error("[Trends Service] Critical error updating trends:", error);
  }
}

// --- Endpoints del API de Tendencias (Blog) ---
app.get('/api/trends', async (req, res) => {
  try {
    await getOrUpdateTrends();
    const data = fs.readFileSync(trendsFilePath, 'utf-8');
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  } catch (error) {
    console.error("Error in GET /api/trends:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/trends/refresh', async (req, res) => {
  try {
    await getOrUpdateTrends(true);
    const data = fs.readFileSync(trendsFilePath, 'utf-8');
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  } catch (error) {
    console.error("Error in POST /api/trends/refresh:", error);
    res.status(500).json({ error: error.message });
  }
});

// --- Endpoints del API de la Red Social ---
app.get('/api/posts', (req, res) => {
  try {
    const data = fs.readFileSync(postsFilePath, 'utf-8');
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  } catch (error) {
    console.error("Error in GET /api/posts:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/posts', (req, res) => {
  try {
    const { title, url, category, description, utility, author } = req.body;
    if (!title || !category || !description || !utility || !author) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const posts = JSON.parse(fs.readFileSync(postsFilePath, 'utf-8'));
    const newPost = {
      id: Date.now().toString(),
      title,
      url: url || "",
      category,
      description,
      utility,
      author,
      likes: 0,
      likedBy: [],
      createdAt: new Date().toISOString(),
      comments: []
    };

    posts.unshift(newPost); // Most recent first
    fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2), 'utf-8');
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error in POST /api/posts:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/posts/:id/like', (req, res) => {
  try {
    const { id } = req.params;
    const clientIp = req.ip || req.headers['x-forwarded-for'] || "127.0.0.1";
    const posts = JSON.parse(fs.readFileSync(postsFilePath, 'utf-8'));
    
    const postIndex = posts.findIndex(p => p.id === id);
    if (postIndex === -1) {
      return res.status(404).json({ error: "Post not found." });
    }

    const post = posts[postIndex];
    if (!post.likedBy) post.likedBy = [];

    if (post.likedBy.includes(clientIp)) {
      // Toggle off
      post.likes = Math.max(0, post.likes - 1);
      post.likedBy = post.likedBy.filter(ip => ip !== clientIp);
    } else {
      // Toggle on
      post.likes += 1;
      post.likedBy.push(clientIp);
    }

    fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2), 'utf-8');
    res.json(post);
  } catch (error) {
    console.error("Error in POST /api/posts/:id/like:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/posts/:id/comment', (req, res) => {
  try {
    const { id } = req.params;
    const { author, text } = req.body;
    if (!author || !text) {
      return res.status(400).json({ error: "Missing comment fields." });
    }

    const posts = JSON.parse(fs.readFileSync(postsFilePath, 'utf-8'));
    const postIndex = posts.findIndex(p => p.id === id);
    if (postIndex === -1) {
      return res.status(404).json({ error: "Post not found." });
    }

    const newComment = {
      id: Date.now().toString(),
      author,
      text,
      createdAt: new Date().toISOString()
    };

    posts[postIndex].comments.push(newComment);
    fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2), 'utf-8');
    res.status(201).json(newComment);
  } catch (error) {
    console.error("Error in POST /api/posts/:id/comment:", error);
    res.status(500).json({ error: error.message });
  }
});


// Serve index.html for any other route if it exists (Single Page Application fallback)
app.get(/.*/, (req, res, next) => {
  if (req.path.startsWith('/api-proxy') || req.path.startsWith('/sheet-proxy') || req.path.startsWith('/ws-proxy')) {
    return next();
  }
  const indexPath = path.join(__dirname, 'public', 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Not Found');
  }
});


const server = app.listen(PORT, API_BACKEND_HOST, () => {
  console.log(`Vertex AI Backend listening at http://localhost:${PORT}`);
  initDataStorage();
  // Inicialización de tendencias diaria de forma asíncrona
  getOrUpdateTrends();
});


const chatWss = new WebSocketServer({ noServer: true });
const wss = new WebSocketServer({ noServer: true });

// --- WebSocket Live Chat Server ---
const chatClients = new Set();

chatWss.on('connection', (ws) => {
  chatClients.add(ws);
  console.log(`[Chat WS] Client connected. Total clients: ${chatClients.size}`);
  
  try {
    const history = JSON.parse(fs.readFileSync(chatHistoryFilePath, 'utf-8') || '[]');
    ws.send(JSON.stringify({ type: 'history', messages: history.slice(-50) }));
  } catch (err) {
    console.error("[Chat WS] Error sending history:", err);
  }

  ws.on('message', (messageData) => {
    try {
      const data = JSON.parse(messageData.toString());
      if (data.type === 'message' && data.author && data.text) {
        const newMessage = {
          id: Date.now().toString() + '-' + Math.random().toString(36).substr(2, 4),
          author: data.author,
          text: data.text,
          createdAt: new Date().toISOString()
        };

        const history = JSON.parse(fs.readFileSync(chatHistoryFilePath, 'utf-8') || '[]');
        history.push(newMessage);
        if (history.length > 100) history.shift();
        fs.writeFileSync(chatHistoryFilePath, JSON.stringify(history, null, 2), 'utf-8');

        const broadcastData = JSON.stringify({ type: 'message', message: newMessage });
        for (const client of chatClients) {
          if (client.readyState === WebSocket.OPEN) {
            client.send(broadcastData);
          }
        }
      }
    } catch (err) {
      console.error("[Chat WS] Error broadcasting message:", err);
    }
  });

  ws.on('close', () => {
    chatClients.delete(ws);
    console.log(`[Chat WS] Client disconnected. Total clients: ${chatClients.size}`);
  });

  ws.on('error', (err) => {
    console.error("[Chat WS] Client error:", err);
    chatClients.delete(ws);
  });
});

server.on('upgrade', async (request, socket, head) => {
  const url = new URL(request.url, `http://${request.headers.host}`);

  if (url.pathname === '/ws-proxy') {
    
    let targetUrl = url.searchParams.get('target');
    if (!targetUrl) {
      console.log('[Node Proxy] Missing target URL');
      socket.destroy();
      return;
    }

    if (targetUrl === 'wss://aiplatform.googleapis.com//ws/google.cloud.aiplatform.v1beta1.LlmBidiService/BidiGenerateContent') {
      const location = GOOGLE_CLOUD_LOCATION === 'global' ? 'us-central1' : GOOGLE_CLOUD_LOCATION;
      targetUrl = `wss://${location}-aiplatform.googleapis.com//ws/google.cloud.aiplatform.v1beta1.LlmBidiService/BidiGenerateContent`;
    } else {
      console.log('[Node Proxy] Invalid target URL');
      socket.destroy();
      return;
    }

    let accessToken;

    try {
      accessToken = await getAccessToken();
      if (!accessToken) throw new Error('No token');
    } catch (err) {
      console.log('[Node Proxy] Authentication failed');
      socket.destroy();
      return;
    }

    console.log(`[Node Proxy] Initiating upstream connection to: ${targetUrl}`);

    let upstreamWs;

    try {
      upstreamWs = new WebSocket(targetUrl, {
        headers: getRequestHeaders(accessToken)
      });
    } catch (e) {
      console.error('[Node Proxy] Invalid Upstream URL');
      socket.destroy();
      return;
    }

    const initialErrorHandler = (error) => {
      console.error('[Node Proxy] Upstream connection failed:', error);
      upstreamWs.removeEventListener('open', onUpstreamOpen);

      if (socket.writable) {
        socket.write('HTTP/1.1 502 Bad Gateway\r\n\r\n');
        socket.destroy();
      }
    };

    upstreamWs.once('error', initialErrorHandler);

    // 5. Handle Successful Upstream Connection
    const onUpstreamOpen = () => {
      // Remove the "bootstrapping" error handler
      upstreamWs.removeListener('error', initialErrorHandler);

      // Perform the HTTP -> WebSocket upgrade for the Client
      wss.handleUpgrade(request, socket, head, (ws) => {

        upstreamWs.on('message', (data, isBinary) => {
          const logMsg = isBinary ? '<Binary Data>' : data.toString();
          console.log(`[Upstream -> Client] [${new Date().toISOString()}]: ${logMsg}`);

          if (ws.readyState === WebSocket.OPEN) {
            if (data === undefined || data === null) {
              console.warn('[Node Proxy] Attempted to send undefined/null data to client');
              return;
            }
            ws.send(data, { binary: isBinary });
          }
        });

        ws.on('message', (data, isBinary) => {
          const logMsg = isBinary ? '<Binary Data>' : data.toString();

          let dataJson = {};
          try {
            dataJson = JSON.parse(data.toString());
          } catch (error) {
            console.error('[Node Proxy] Failed to parse message from client:', error);
            ws.close(1011, 'Failed to parse message');
          }

          if (dataJson['setup']) {
            dataJson['setup']['model'] = `projects/${GOOGLE_CLOUD_PROJECT}/locations/${GOOGLE_CLOUD_LOCATION}/${dataJson['setup']['model']}`;
          }

          if (upstreamWs.readyState === WebSocket.OPEN) {
            upstreamWs.send(JSON.stringify(dataJson), { binary: false });
          }
        });

        upstreamWs.on('error', (error) => {
          console.error('[Node Proxy] Upstream error:', error);
          ws.close(1011, error.message);
        });

        upstreamWs.on('close', (code, reason) => {
          console.log(`[Node Proxy] Upstream closed: ${code} ${reason}`);
          if (ws.readyState === WebSocket.OPEN) {
            ws.close(code, reason);
          }
        });

        ws.on('error', (error) => {
          console.error('[Node Proxy] Client error:', error);
          upstreamWs.close(1011, error.message);
        });

        ws.on('close', (code, reason) => {
          console.log(`[Node Proxy] Client closed: ${code} ${reason}`);
          if (upstreamWs.readyState === WebSocket.OPEN) {
            upstreamWs.close(1000, reason);
          }
        });

        wss.emit('connection', ws, request);
      });
    };

    upstreamWs.once('open', onUpstreamOpen);

  } else if (url.pathname === '/ws-chat') {
    chatWss.handleUpgrade(request, socket, head, (ws) => {
      chatWss.emit('connection', ws, request);
    });
  } else {
    // Path did not match
    socket.destroy();
  }
});


