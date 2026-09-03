import React, { useState } from 'react';
import { Search, ChevronUp, BookOpen, Terminal, CheckCircle2, Play, ArrowLeft, Layout, ShieldAlert, Cpu, Database, Network, Key, Code, Boxes, Activity, Eye, RefreshCw, FileJson } from 'lucide-react';

const SYLLABUS = [
  {
    id: 1,
    title: "Módulo 1: Asistencia Cognitiva y Productividad",
    icon: <Terminal className="w-4 h-4" />,
    topics: [
      { id: 1, title: "1. Fundamentos de IA y Modelos Generativos" },
      { id: 2, title: "2. Ingeniería de Prompts Avanzada", hasLab: true },
      { id: 3, title: "3. Copilotos Conversacionales Estratégicos" },
      { id: 4, title: "4. Productividad con M365 Copilot" }
    ]
  },
  {
    id: 2,
    title: "Módulo 2: Prototipado y Automatización",
    icon: <Layout className="w-4 h-4" />,
    topics: [
      { id: 5, title: "5. Prototipado Web con Lovable" },
      { id: 6, title: "6. Automatización de Flujos con n8n", hasLab: true },
      { id: 7, title: "7. Generación Visual con Difusión" },
      { id: 8, title: "8. Producción Audiovisual Sintética" }
    ]
  },
  {
    id: 3,
    title: "Módulo 3: Gobernanza, Datos y Programación",
    icon: <ShieldAlert className="w-4 h-4" />,
    topics: [
      { id: 9, title: "9. Estructuración Asistida de Datos" },
      { id: 10, title: "10. Liderazgo, Viabilidad y Gobernanza" },
      { id: 11, title: "11. Tokenización, Embeddings y Contexto", hasLab: true },
      { id: 12, title: "12. Ecosistema Gemini y Gems" },
      { id: 13, title: "13. Asistencia con Cursor AI Editor" }
    ]
  },
  {
    id: 4,
    title: "Módulo 4: Arquitecturas Avanzadas y Agentes",
    icon: <Cpu className="w-4 h-4" />,
    topics: [
      { id: 14, title: "14. Arquitectura RAG Empresarial (Azure)", hasLab: true },
      { id: 15, title: "15. Model Context Protocol (MCP) en Azure" },
      { id: 16, title: "16. Automatización con Claude Code CLI" },
      { id: 17, title: "17. Chatbots y Manejo de Estado (OpenAI)" },
      { id: 18, title: "18. Agentes de IA con LangGraph" }
    ]
  },
  {
    id: 5,
    title: "Módulo 5: Observabilidad y Despliegue",
    icon: <Activity className="w-4 h-4" />,
    topics: [
      { id: 19, title: "19. Observabilidad con LangSmith" },
      { id: 20, title: "20. Integración Integral de Arquitecturas" }
    ]
  }
];

// --- COMPONENTE DEL CURSO INTERACTIVO ---
function CourseView({ setView }) {
  const [activeTopic, setActiveTopic] = useState(2);

  // Estados Módulo 1 (T2)
  const [rol, setRol] = useState('Especialista en normalización marcaria de Prosur');
  const [contexto, setContexto] = useState('Evaluación de solicitudes de marcas colectivas e indicaciones geográficas entre países miembros.');
  const [tarea, setTarea] = useState('Analizar el pliego de condiciones anexo y verificar la concordancia con la Clasificación de Niza.');
  const [restricciones, setRestricciones] = useState('Basa tu análisis estrictamente en las clases 29 a 33. No formules supuestos adicionales.');
  const [formato, setFormato] = useState('Tabla con 3 columnas: Término, Infracción, Clasificación Sugerida.');
  const [simulatedOutput1, setSimulatedOutput1] = useState('');
  const [isSimulating1, setIsSimulating1] = useState(false);

  // Estados Módulo 4 (T14)
  const [ragQuery, setRagQuery] = useState('¿Cuál es el periodo de gracia para modelos de utilidad?');
  const [ragOutput, setRagOutput] = useState(null);
  const [isSimulatingRag, setIsSimulatingRag] = useState(false);

  // Estados Módulo 2 (T6 n8n)
  const [n8nStep, setN8nStep] = useState(0);

  // Estados Módulo 3 (T11 Tokenization)
  const [tokenText, setTokenText] = useState('La inteligencia artificial de Prosur optimiza el flujo regional.');
  const [tokenBlocks, setTokenBlocks] = useState([]);

  const handleSimulate1 = () => {
    setIsSimulating1(true); setSimulatedOutput1('');
    setTimeout(() => {
      setSimulatedOutput1(`[Respuesta del Modelo Generativo]\n\nAnálisis completado basándome en los parámetros estrictos de Prosur:\n\n| Término Observado | Infracción Detectada | Clasificación Sugerida |\n|-------------------|-----------------------|------------------------|\n| "Queso de cabra"  | Ninguna               | Clase 29               |\n| "Vino espumoso"   | Fuera de rango (29-33)| Clase 33               |\n| "Servicio logíst."| Infracción (Servicio) | Clase 39 (Rechazada)   |`);
      setIsSimulating1(false);
    }, 1500);
  };

  const handleSimulateRag = () => {
    setIsSimulatingRag(true); setRagOutput(null);
    setTimeout(() => {
      setRagOutput({
        lexical: ["...el periodo abarca...", "...utilidad de los modelos..."],
        vector: ["...modelos de utilidad gozarán de un periodo de gracia improrrogable de seis meses..."],
        final: "Basado en las Directrices Prosur 2023 (Pág. 45), las solicitudes sobre modelos de utilidad gozarán de un periodo de gracia improrrogable de seis meses para la presentación de traducciones oficiales en el país receptor."
      });
      setIsSimulatingRag(false);
    }, 2000);
  };

  const handleSimulateN8n = () => {
    setN8nStep(0);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setN8nStep(step);
      if (step >= 4) clearInterval(interval);
    }, 1000);
  };

  const handleTokenize = () => {
    // Fake tokenization logic for visual effect
    const words = tokenText.split(' ');
    const chunks = [];
    words.forEach(w => {
      if (w.length > 6) {
        chunks.push(w.substring(0, 4));
        chunks.push(w.substring(4));
      } else {
        chunks.push(w);
      }
    });
    setTokenBlocks(chunks);
  };

  const progressPrompt = [rol, contexto, tarea, restricciones, formato].filter(Boolean).length * 20;

  const renderTopicContent = () => {
    switch(activeTopic) {
      case 2: // Prompting
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4">
            <div className="mb-10">
              <span className="text-red-600 text-[11px] font-bold tracking-widest uppercase block mb-3">— TEMA 2</span>
              <h1 className="text-4xl font-bold tracking-tight mb-4">Laboratorio: Ingeniería de Prompts</h1>
              <p className="text-gray-500 leading-relaxed max-w-3xl">
                En Prosur, formalizamos una estructura innegociable de 5 componentes para garantizar respuestas deterministas y reproducibles. <strong>Modifica el prompt y ejecuta la simulación:</strong>
              </p>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <div className="bg-white border border-gray-200 p-8 shadow-sm">
                <div className="space-y-5">
                  <div><label className="block text-xs font-bold uppercase text-gray-500 mb-2">1. Rol Institucional</label><input type="text" value={rol} onChange={(e)=>setRol(e.target.value)} className="w-full text-sm p-3 border border-gray-200 focus:border-red-600 outline-none transition-colors" /></div>
                  <div><label className="block text-xs font-bold uppercase text-gray-500 mb-2">2. Contexto Operativo</label><textarea value={contexto} onChange={(e)=>setContexto(e.target.value)} rows="2" className="w-full text-sm p-3 border border-gray-200 focus:border-red-600 outline-none resize-none transition-colors" /></div>
                  <div><label className="block text-xs font-bold uppercase text-gray-500 mb-2">3. Tarea Específica</label><textarea value={tarea} onChange={(e)=>setTarea(e.target.value)} rows="2" className="w-full text-sm p-3 border border-gray-200 focus:border-red-600 outline-none resize-none transition-colors" /></div>
                  <div><label className="block text-xs font-bold uppercase text-red-600 mb-2">4. Restricciones</label><textarea value={restricciones} onChange={(e)=>setRestricciones(e.target.value)} rows="2" className="w-full text-sm p-3 border border-red-200 bg-red-50/30 focus:border-red-600 outline-none resize-none transition-colors" /></div>
                  <div><label className="block text-xs font-bold uppercase text-gray-500 mb-2">5. Formato de Salida</label><input type="text" value={formato} onChange={(e)=>setFormato(e.target.value)} className="w-full text-sm p-3 border border-gray-200 focus:border-red-600 outline-none transition-colors" /></div>
                </div>
              </div>
              <div className="flex flex-col gap-6">
                <div className="bg-[#1e1e1e] p-6 text-gray-300 font-mono text-xs leading-relaxed shadow-lg relative h-64 overflow-y-auto">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-red-900"></div>
                  <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-2">
                    <span className="text-gray-500 font-sans font-bold tracking-widest uppercase text-[10px]">Prompt Compilado</span>
                    <span className="text-green-400 font-sans font-bold text-[10px]">{progressPrompt}% Calidad</span>
                  </div>
                  <p><span className="text-blue-400">Rol:</span> {rol || '...'}</p>
                  <p className="mt-2"><span className="text-blue-400">Contexto:</span> {contexto || '...'}</p>
                  <p className="mt-2"><span className="text-blue-400">Tarea:</span> {tarea || '...'}</p>
                  <p className="mt-2"><span className="text-red-400">Restricciones:</span> {restricciones || '...'}</p>
                  <p className="mt-2"><span className="text-blue-400">Formato:</span> {formato || '...'}</p>
                </div>
                <button onClick={handleSimulate1} disabled={progressPrompt < 100 || isSimulating1} className="w-full py-4 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 text-white font-bold tracking-widest uppercase text-xs flex items-center justify-center gap-2 transition-colors">
                  {isSimulating1 ? 'Procesando en LLM...' : <><Play className="w-4 h-4" /> Ejecutar Simulación</>}
                </button>
                {simulatedOutput1 && (
                  <div className="bg-white border border-gray-200 p-6 shadow-sm animate-in fade-in">
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Resultado Generado</h3>
                    <pre className="font-mono text-xs whitespace-pre-wrap text-gray-700">{simulatedOutput1}</pre>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      
      case 6: // n8n
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4">
            <div className="mb-10">
              <span className="text-red-600 text-[11px] font-bold tracking-widest uppercase block mb-3">— TEMA 6</span>
              <h1 className="text-4xl font-bold tracking-tight mb-4">Simulador: Flujos n8n y LangChain</h1>
              <p className="text-gray-500 leading-relaxed max-w-3xl">
                Observa la orquestación visual de grado empresarial donde eventos en tiempo real activan cadenas de razonamiento analítico.
              </p>
            </div>
            <div className="bg-[#f0f0f0] border border-gray-200 p-12 rounded-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
                <div className={`p-6 border-2 rounded-lg bg-white w-48 text-center transition-all duration-500 ${n8nStep >= 1 ? 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'border-gray-200'}`}>
                  <Network className={`w-8 h-8 mx-auto mb-3 ${n8nStep >= 1 ? 'text-blue-500' : 'text-gray-400'}`} />
                  <span className="text-xs font-bold text-gray-700">1. Webhook Trigger</span>
                  {n8nStep === 1 && <span className="block text-[10px] text-blue-500 mt-2 animate-pulse">Recibiendo PDF...</span>}
                </div>
                
                <div className={`h-1 flex-1 transition-all duration-500 ${n8nStep >= 2 ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
                
                <div className={`p-6 border-2 rounded-lg bg-white w-48 text-center transition-all duration-500 ${n8nStep >= 2 ? 'border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.3)]' : 'border-gray-200'}`}>
                  <FileJson className={`w-8 h-8 mx-auto mb-3 ${n8nStep >= 2 ? 'text-purple-500' : 'text-gray-400'}`} />
                  <span className="text-xs font-bold text-gray-700">2. Data Loader</span>
                  {n8nStep === 2 && <span className="block text-[10px] text-purple-500 mt-2 animate-pulse">Extrayendo texto...</span>}
                </div>

                <div className={`h-1 flex-1 transition-all duration-500 ${n8nStep >= 3 ? 'bg-purple-500' : 'bg-gray-200'}`}></div>
                
                <div className={`p-6 border-2 rounded-lg bg-white w-48 text-center transition-all duration-500 ${n8nStep >= 3 ? 'border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)]' : 'border-gray-200'}`}>
                  <Cpu className={`w-8 h-8 mx-auto mb-3 ${n8nStep >= 3 ? 'text-red-500' : 'text-gray-400'}`} />
                  <span className="text-xs font-bold text-gray-700">3. AI Agent (LLM)</span>
                  {n8nStep === 3 && <span className="block text-[10px] text-red-500 mt-2 animate-pulse">Analizando legal...</span>}
                </div>

                <div className={`h-1 flex-1 transition-all duration-500 ${n8nStep >= 4 ? 'bg-red-500' : 'bg-gray-200'}`}></div>
                
                <div className={`p-6 border-2 rounded-lg bg-white w-48 text-center transition-all duration-500 ${n8nStep >= 4 ? 'border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.3)]' : 'border-gray-200'}`}>
                  <Database className={`w-8 h-8 mx-auto mb-3 ${n8nStep >= 4 ? 'text-green-500' : 'text-gray-400'}`} />
                  <span className="text-xs font-bold text-gray-700">4. PostgreSQL</span>
                  {n8nStep === 4 && <span className="block text-[10px] text-green-500 mt-2">Guardado Exitoso</span>}
                </div>
              </div>

              <div className="mt-12 text-center relative z-10">
                <button onClick={handleSimulateN8n} className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold tracking-widest uppercase text-xs rounded shadow-lg transition-colors">
                  <Play className="w-4 h-4 inline-block mr-2 -mt-1" /> Simular Llegada de Documento
                </button>
              </div>
            </div>
          </div>
        );

      case 11: // Tokenization
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4">
            <div className="mb-10">
              <span className="text-red-600 text-[11px] font-bold tracking-widest uppercase block mb-3">— TEMA 11</span>
              <h1 className="text-4xl font-bold tracking-tight mb-4">Laboratorio: Tokenización BPE</h1>
              <p className="text-gray-500 leading-relaxed max-w-3xl">
                Los modelos no interpretan caracteres, sino secuencias de valores enteros (Tokens). Escribe una frase para visualizar cómo el tokenizador la fragmenta antes de vectorizarla en el espacio latente.
              </p>
            </div>
            <div className="bg-white border border-gray-200 p-8 shadow-sm">
              <input type="text" value={tokenText} onChange={(e)=>setTokenText(e.target.value)} className="w-full text-lg font-medium p-4 border border-gray-200 focus:border-red-600 outline-none transition-colors mb-6" />
              <button onClick={handleTokenize} className="px-6 py-3 bg-[#1a1a1a] hover:bg-red-600 text-white font-bold tracking-widest uppercase text-xs transition-colors mb-8">
                Generar Chunks (Tokens)
              </button>
              
              {tokenBlocks.length > 0 && (
                <div className="p-6 bg-gray-50 border border-gray-100 flex flex-wrap gap-2">
                  {tokenBlocks.map((chunk, i) => (
                    <span key={i} className={`px-3 py-1 font-mono text-sm font-bold text-white shadow-sm ${['bg-red-500', 'bg-blue-500', 'bg-purple-500', 'bg-emerald-500', 'bg-orange-500'][i % 5]}`}>
                      {chunk}
                    </span>
                  ))}
                  <div className="w-full mt-6 text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Total Tokens: {tokenBlocks.length}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 14: // RAG
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4">
            <div className="mb-10">
              <span className="text-red-600 text-[11px] font-bold tracking-widest uppercase block mb-3">— TEMA 14</span>
              <h1 className="text-4xl font-bold tracking-tight mb-4">Simulador RAG (Azure AI)</h1>
              <p className="text-gray-500 leading-relaxed max-w-3xl">
                Observa cómo el sistema recupera fragmentos de documentos oficiales de Prosur antes de generar la respuesta, garantizando la eliminación de alucinaciones.
              </p>
            </div>
            <div className="bg-white border border-gray-200 p-8 shadow-sm mb-8">
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Consulta del Funcionario</label>
              <div className="flex gap-4">
                <input type="text" value={ragQuery} onChange={(e)=>setRagQuery(e.target.value)} className="flex-1 text-sm p-4 border border-gray-200 focus:border-red-600 outline-none transition-colors font-medium" />
                <button onClick={handleSimulateRag} disabled={isSimulatingRag || !ragQuery} className="px-8 bg-[#1a1a1a] hover:bg-red-600 text-white font-bold tracking-widest uppercase text-xs transition-colors flex items-center gap-2">
                  {isSimulatingRag ? 'Buscando...' : <><Search className="w-4 h-4"/> Ejecutar RAG</>}
                </button>
              </div>
            </div>
            {isSimulatingRag && (
              <div className="flex items-center justify-center p-12 text-red-600 animate-pulse">
                <Network className="w-8 h-8 animate-spin-slow" />
              </div>
            )}
            {ragOutput && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in">
                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 border border-gray-200">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2"><Database className="w-4 h-4" /> 1. Búsqueda Léxica</h3>
                    <p className="text-sm text-gray-500 italic bg-white p-3 border border-gray-100">"{ragOutput.lexical[0]}"</p>
                  </div>
                  <div className="bg-red-50/50 p-6 border border-red-100">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-red-600 mb-4 flex items-center gap-2"><Cpu className="w-4 h-4" /> 2. Búsqueda Vectorial</h3>
                    <p className="text-sm text-red-900 bg-white p-3 border border-red-200 font-medium">"{ragOutput.vector[0]}"</p>
                  </div>
                </div>
                <div className="bg-[#1e1e1e] p-8 text-white shadow-xl relative">
                  <div className="absolute top-0 left-0 w-full h-1 bg-green-500"></div>
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> 3. Respuesta Inyectada</h3>
                  <p className="text-sm leading-relaxed text-gray-200">{ragOutput.final}</p>
                </div>
              </div>
            )}
          </div>
        );

      default: // Render real theoretical content for non-lab topics
        const currentModule = SYLLABUS.find(m => m.topics.some(t => t.id === activeTopic));
        const currentTopic = currentModule.topics.find(t => t.id === activeTopic);
        
        // Diccionario de contenido extraído del PDF corporativo de Prosur
        const CONTENT_DB = {
          1: {
            fundamento: "La inteligencia artificial moderna se apoya en arquitecturas de redes neuronales profundas que superaron los clasificadores supervisados tradicionales para dar paso a modelos generativos fundacionales. En Prosur, estos modelos no deben ser tratados como bases de datos estáticas, sino como procesadores probabilísticos.",
            instruccion: "Clasificar primero cada tarea operativa en uno de los cuatro dominios funcionales: clasificación supervisada, extracción estructurada, inferencia lógica o generación creativa de contenido.",
            caso: "En la recepción de correspondencia interinstitucional de Prosur, se categorizan las comunicaciones para enrutarlas a las oficinas nacionales mediante un clasificador documental en JSON."
          },
          3: {
            fundamento: "Los modelos conversacionales avanzados operan como asistentes analíticos y copilotos cognitivos cuando se les dota de herramientas computacionales complementarias (intérpretes de código).",
            instruccion: "Configurar directrices personalizadas (Custom Instructions) estableciendo la identidad de Prosur, el tono técnico formal y las restricciones de confidencialidad institucional.",
            caso: "Cálculo del tiempo promedio de resolución de patentes por país antes y después del sistema de cooperación, generando visualizaciones de tendencias con Python integrado."
          },
          4: {
            fundamento: "Microsoft 365 Copilot combina la potencia de los modelos de frontera con el grafo de información institucional (Microsoft Graph), contextualizando solicitudes con SharePoint y Exchange.",
            instruccion: "Realizar una auditoría de gobernanza de datos en SharePoint previa a la adopción, certificando que los sitios cuenten con listas de control de acceso (ACL) bien definidas.",
            caso: "Condensar informes técnicos de más de cien páginas en minutas directivas y presentaciones ejecutivas dinámicas para las asambleas directivas de Prosur."
          },
          5: {
            fundamento: "El desarrollo asistido por IA generativa permite materializar herramientas de software complejas mediante instrucciones declarativas. Plataformas como Lovable transforman abstracciones en aplicaciones web React/Tailwind.",
            instruccion: "Redactar un documento maestro de especificación funcional. La construcción debe ser modular: navegación, estructura de base de datos, y finalmente la lógica de negocio.",
            caso: "Construcción de un Visualizador Estadístico de Propiedad Industrial Prosur con filtros dinámicos por país, gráficos interactivos y conexión a Supabase."
          },
          7: {
            fundamento: "Los modelos de difusión latente (Midjourney, Flux) operan proyectando conceptos textuales en representaciones numéricas dentro de un espacio latente para generar imágenes de alta fidelidad.",
            instruccion: "Especificar claramente el sujeto principal, contexto ambiental, técnica visual y paleta cromática corporativa. Usar exclusión negativa para descartar aberraciones.",
            caso: "Generación de la imagen de portada del compendio anual de innovación tecnológica: delegados internacionales revisando planos de patentes en mesas táctiles."
          },
          8: {
            fundamento: "La síntesis audiovisual mediante redes generativas espaciotemporales (Runway, Sora, HeyGen) traduce directivas escritas a video resolviendo la coherencia temporal de fotogramas.",
            instruccion: "Adoptar un flujo Image-to-Video en lugar de Text-to-Video para evitar transformaciones no deseadas en logotipos e identidades visuales institucionales de Prosur.",
            caso: "Diseño de una cápsula formativa de 30 segundos sobre el Procedimiento Acelerado de Patentes (PPH) de Prosur, con locución neuronal y cámara lenta cinematográfica."
          },
          9: {
            fundamento: "El intercambio de información técnica genera repositorios documentales masivos y heterogéneos. La IA actúa como motor de extracción semántica avanzada para normalizar registros.",
            instruccion: "Emplear bibliotecas de validación de tipado estricto como Pydantic en Python, forzando a los modelos a emitir salidas validadas mediante el modo de Salidas Estructuradas (Structured Outputs).",
            caso: "Extracción programática de metadatos (Número, Titular, IPC, Estado) de resoluciones oficiales para su incorporación a la base de datos consolidada de Prosur."
          },
          10: {
            fundamento: "La adopción de IA en una organización multilateral requiere una estructura de gobernanza técnica que minimice riesgos jurídicos y preserve la soberanía de datos de los estados miembros.",
            instruccion: "Aplicar una matriz de triple evaluación: criticidad de alucinación, estructuración de datos y Costo Total de Propiedad (TCO). Obligatorio protocolo Human-in-the-Loop para decisiones registrales.",
            caso: "Prohibición explícita de uso de modelos estocásticos para balances contables, y validación humana obligatoria en la generación de borradores de memorandos internos."
          },
          12: {
            fundamento: "El ecosistema Gemini destaca por su arquitectura multimodal nativa, correlacionando tokens textuales, auditivos y visuales con ventanas de contexto hiper-extensas para analizar manuales completos.",
            instruccion: "Cargar archivos multimedia íntegros (grabaciones de reuniones técnicas) y solicitar la extracción directa de compromisos, evitando pasos de transcripción manual que descontextualizan.",
            caso: "Creación de un Gem institucional para la homologación y cotejo de diseños industriales, contrastando la novedad geométrica de planos directamente desde la imagen."
          },
          13: {
            fundamento: "Cursor AI es un IDE especializado que integra modelos de frontera con el grafo de incrustaciones de los archivos del proyecto, facilitando refactorizaciones masivas y corrección de fallos.",
            instruccion: "Configurar el archivo .cursorrules con los estándares de ingeniería institucionales. Usar Ctrl+K para modificar bloques y Ctrl+I (Composer) para ediciones multi-archivo.",
            caso: "Migración de un servicio backend legado escrito en Flask hacia una arquitectura asíncrona moderna con FastAPI y SQLAlchemy asíncrono en Prosur."
          },
          15: {
            fundamento: "El Model Context Protocol (MCP) es un estándar abierto que universaliza la interacción entre modelos de lenguaje, clientes de software y fuentes de datos corporativas en entornos Azure.",
            instruccion: "Empaquetar servicios internos como servidores MCP. Establecer permisos granulares y requerir confirmación interactiva para herramientas que ejecuten modificaciones en bases de datos.",
            caso: "Conexión de un copiloto institucional a las bases de datos de resoluciones PostgreSQL y al catálogo de recursos de Azure mediante protocolo JSON-RPC."
          },
          16: {
            fundamento: "Claude Code es una interfaz de línea de comandos (CLI) agéntica con acceso directo al sistema de archivos, terminal y entorno de ejecución del proyecto para planificar intervenciones.",
            instruccion: "Mantener limpio el contexto reiniciándolo con /clear. Establecer directivas técnicas en un archivo CLAUDE.md detallando estándares de diseño y testing.",
            caso: "Auditoría y remediación técnica automatizada de vulnerabilidades de desbordamiento de búfer en el microservicio de autenticación de Prosur en modo headless."
          },
          17: {
            fundamento: "Los asistentes corporativos requieren persistencia de estado, segmentación de memoria y llamadas a funciones (Tool Calling) donde el LLM actúa como planificador lógico.",
            instruccion: "Registrar herramientas mediante esquemas OpenAPI y persistir conversaciones con un sessionId indexado en Redis o PostgreSQL, desacoplando el estado conversacional.",
            caso: "Chatbot institucional para la consulta en tiempo real del estado de trámites en las oficinas de Prosur utilizando invocación de herramientas (Function Calling)."
          },
          18: {
            fundamento: "LangGraph introduce la orquestación de agentes mediante Grafos Dirigidos Acíclicos y Cíclicos, modelando la computación como una máquina de estados finitos con ciclos reflexivos.",
            instruccion: "Implementar clases de estado estricto empleando TypedDict, y configurar un mecanismo de persistencia (Checkpointer) para pausar la ejecución y solicitar revisión humana.",
            caso: "Agente reflexivo iterativo para la revisión y autocorrección formal de memorias descriptivas de patentes técnicas en Prosur."
          },
          19: {
            fundamento: "El despliegue de sistemas no deterministas exige telemetría continua para monitorear la latencia, deriva semántica y costos a través de trazas (Traces) y tramos de ejecución (Spans).",
            instruccion: "Instrumentar variables de entorno de LangSmith en todos los microservicios. Estructurar conjuntos de datos de prueba basados en casos reales resueltos por Prosur.",
            caso: "Detección, diagnóstico y corrección de un fallo de bucle infinito (consumo excesivo de tokens) en un agente automatizado de patentes utilizando el árbol jerárquico de LangSmith."
          },
          20: {
            fundamento: "La arquitectura empresarial cohesiva integra n8n (orquestación y eventos), LangGraph (razonamiento agéntico), Azure/MCP (acceso a datos) y LangSmith (trazabilidad).",
            instruccion: "Mantener clara separación de responsabilidades: la interfaz web/correo en n8n, el razonamiento en APIs REST aseguradas con mTLS, y propagar el TraceId a lo largo del flujo.",
            caso: "Resolución automatizada de consultas transfronterizas: Formulario Web -> Webhook n8n -> LangGraph -> Recuperación MCP/Azure -> Telemetría LangSmith -> Reporte final en PDF."
          }
        };

        const tData = CONTENT_DB[activeTopic] || {
          fundamento: "El documento oficial del programa formativo establece los principios rectores para este módulo de inteligencia artificial, enfocándose en la soberanía de los datos, la precisión técnica y la reducción del error estocástico en la administración pública.",
          instruccion: "El personal técnico de Prosur debe asegurar que cada implementación mantenga estrictos controles de confidencialidad, evaluando la sensibilidad de la información antes de conectarla a modelos fundacionales públicos o privados.",
          caso: "Aplicación progresiva en las oficinas nacionales de patentes y marcas, optimizando la resolución de expedientes, categorización automatizada y emisión de dictámenes técnicos validados."
        };

        return (
          <div className="animate-in fade-in slide-in-from-bottom-4">
            <div className="mb-10">
              <span className="text-red-600 text-[11px] font-bold tracking-widest uppercase block mb-3">— {currentModule.title}</span>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-[#1a1a1a]">{currentTopic.title}</h1>
            </div>

            <div className="bg-white border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-gray-100 bg-gray-50/50">
                <h3 className="text-xs font-bold uppercase tracking-widest text-red-600 mb-4 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" /> Fundamentación Conceptual
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  {tData.fundamento}
                </p>
              </div>

              <div className="p-8 border-b border-gray-100">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4 flex items-center gap-2">
                  <Terminal className="w-4 h-4" /> Instrucciones Operativas de Uso
                </h3>
                <div className="bg-[#f9f9f9] p-5 border-l-4 border-gray-300">
                  <p className="text-gray-700 text-sm leading-relaxed font-medium">
                    {tData.instruccion}
                  </p>
                </div>
              </div>

              <div className="p-8">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#1a1a1a] mb-4 flex items-center gap-2">
                  <Layout className="w-4 h-4 text-red-600" /> Aplicación Práctica y Caso Ejemplar
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {tData.caso}
                </p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#1a1a1a] font-sans">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setView('landing')} className="text-gray-400 hover:text-red-600 transition-colors flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
              <ArrowLeft className="w-4 h-4" /> Volver
            </button>
            <div className="h-6 w-[1px] bg-gray-200 mx-2"></div>
            <img src="/logoprosur.png" alt="Grupo PROSUR" className="h-6 object-contain grayscale opacity-50" />
            <span className="text-[12px] tracking-widest font-bold text-[#1a1a1a] uppercase ml-2">
              Academia Prosur
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12">
        {/* Sidebar Completo */}
        <aside className="w-full lg:w-1/4">
          <div className="bg-white p-6 border border-gray-200 shadow-sm sticky top-24 max-h-[80vh] overflow-y-auto custom-scrollbar">
            <h3 className="text-[10px] font-bold tracking-[0.15em] text-gray-400 uppercase mb-6">Temario Completo</h3>
            <nav className="space-y-6">
              {SYLLABUS.map((mod) => (
                <div key={mod.id}>
                  <div className="flex items-center gap-2 text-[#1a1a1a] font-bold text-xs uppercase tracking-wider mb-3">
                    {React.cloneElement(mod.icon, { className: 'w-4 h-4 text-red-600' })} {mod.title}
                  </div>
                  <ul className="pl-6 space-y-2.5 text-sm text-gray-500 border-l border-gray-100 ml-2">
                    {mod.topics.map(topic => (
                      <li 
                        key={topic.id}
                        onClick={() => setActiveTopic(topic.id)}
                        className={`cursor-pointer transition-colors flex items-center justify-between group ${activeTopic === topic.id ? 'text-red-600 font-bold' : 'hover:text-[#1a1a1a]'}`}
                      >
                        <span className="truncate pr-2">{topic.title}</span>
                        {topic.hasLab && (
                          <span className={`text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded ${activeTopic === topic.id ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'}`}>Lab</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
        </aside>

        {/* Área Central Dinámica */}
        <main className="w-full lg:w-3/4">
          {renderTopicContent()}
        </main>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #d1d5db; }
      `}} />
    </div>
  );
}

// --- COMPONENTE PRINCIPAL (LANDING) ---
export default function App() {
  const [currentView, setCurrentView] = useState('landing');

  if (currentView === 'course') {
    return <CourseView setView={setCurrentView} />;
  }

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a] font-sans antialiased selection:bg-red-600 selection:text-white">
      
      {/* Header - Prosur Style */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <img src="/logoprosur.png" alt="Grupo PROSUR" className="h-10 object-contain" />
            <span className="text-[13px] tracking-widest font-bold text-gray-400 hidden md:block border-l border-gray-200 pl-6">
              RETO DE INTELIGENCIA ARTIFICIAL
            </span>
          </div>
          
          <nav className="hidden lg:flex items-center gap-10 text-[11px] font-bold tracking-[0.15em] uppercase text-gray-600">
            <a href="#proposito" className="hover:text-[#E30613] transition-colors">Propósito</a>
            <a href="#categorias" className="hover:text-[#E30613] transition-colors">Categorías</a>
            <a href="#scorecard" className="hover:text-[#E30613] transition-colors">Scorecard</a>
            <a href="#etapas" className="hover:text-[#E30613] transition-colors">Etapas</a>
            
            {/* BOTÓN ACTUALIZADO: ESTILO PROSUR (ROJO BOLD) */}
            <button 
              onClick={() => setCurrentView('course')}
              className="flex items-center gap-2 bg-[#E30613] text-white font-black px-8 py-3.5 hover:bg-red-700 transition-colors shadow-md tracking-[0.2em]"
            >
              <BookOpen className="w-4 h-4" /> ACADEMIA PROSUR
            </button>
            <button className="ml-2">
              <Search className="w-5 h-5 text-gray-400 hover:text-[#1a1a1a] transition-colors" />
            </button>
          </nav>
        </div>
      </header>

      {/* Sub-nav */}
      <div className="border-b border-gray-100 hidden md:block">
        <div className="max-w-[1600px] mx-auto px-6 h-12 flex items-center gap-8 text-[10px] font-bold tracking-[0.1em] uppercase text-gray-400">
          <span className="text-[#1a1a1a]">CONVOCATORIA</span>
          <a href="#categorias" className="hover:text-[#E30613] transition-colors">5 CATEGORÍAS</a>
          <a href="#scorecard" className="hover:text-[#E30613] transition-colors">100 PUNTOS</a>
        </div>
      </div>

      {/* Hero Split Section */}
      <section className="w-full h-[70vh] flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 h-full relative group overflow-hidden">
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-700 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
            alt="La Idea" 
            className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[2s]"
          />
          <div className="absolute inset-0 flex items-end justify-center pb-20 z-20">
            <h1 className="text-white text-5xl md:text-7xl font-bold tracking-tight">LA IDEA</h1>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 h-full relative group overflow-hidden">
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-700 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" 
            alt="El Impacto" 
            className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[2s]"
          />
          <div className="absolute inset-0 flex items-end justify-center pb-20 z-20">
            <h1 className="text-white text-5xl md:text-7xl font-bold tracking-tight">EL IMPACTO</h1>
          </div>
        </div>
      </section>

      {/* Purpose / Intro Section */}
      <section id="proposito" className="py-24 max-w-[1600px] mx-auto px-6">
        <div className="max-w-4xl">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">AQUÍ SE PREMIA EL IMPACTO PROBADO, NO LA IDEA.</h2>
          <p className="text-xl md:text-2xl text-gray-500 leading-relaxed font-light mb-12">
            Solo participan proyectos que ya funcionan en un proceso real dentro de Grupo PROSUR y generan ahorro verificable. No califican conceptos ni prototipos aislados.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16 border-t border-gray-200 pt-16">
            <div>
              <span className="text-[#E30613] text-[11px] font-bold tracking-widest uppercase mb-4 block">— 01</span>
              <h3 className="text-xl font-bold mb-3">Problema Real</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Dolor operativo y necesidad detectada en la empresa.</p>
            </div>
            <div>
              <span className="text-[#E30613] text-[11px] font-bold tracking-widest uppercase mb-4 block">— 02</span>
              <h3 className="text-xl font-bold mb-3">Solución Operativa</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Uso sustantivo y explicable de Inteligencia Artificial ya funcionando.</p>
            </div>
            <div>
              <span className="text-[#E30613] text-[11px] font-bold tracking-widest uppercase mb-4 block">— 03</span>
              <h3 className="text-xl font-bold mb-3">Valor Verificable</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Medición clara de un Antes vs. Después con ahorros comprobables.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section id="categorias" className="py-24 bg-[#f9f9f9]">
        <div className="max-w-[1600px] mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-16 uppercase">5 Categorías Oficiales</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            
            <div className="group cursor-pointer">
              <div className="aspect-[4/3] overflow-hidden mb-6 bg-gray-200">
                <img src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop" alt="Finanzas" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <span className="text-[#E30613] text-[11px] font-bold tracking-[0.15em] uppercase mb-3 block">— CATEGORÍA A</span>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-[#E30613] transition-colors">Finanzas, Contabilidad y Tesorería</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Cierres contables, conciliaciones automatizadas, cumplimiento fiscal y dispersión bancaria masiva sin errores.</p>
            </div>

            <div className="group cursor-pointer">
              <div className="aspect-[4/3] overflow-hidden mb-6 bg-gray-200">
                <img src="https://images.unsplash.com/photo-1580674285054-bed31e145f59?q=80&w=2070&auto=format&fit=crop" alt="Operaciones" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <span className="text-[#E30613] text-[11px] font-bold tracking-[0.15em] uppercase mb-3 block">— CATEGORÍA B</span>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-[#E30613] transition-colors">Operaciones, Taller y Logística</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Control físico de inventarios, optimización de tiempos en talleres mecánicos, mermas y reportes integrados.</p>
            </div>

            <div className="group cursor-pointer">
              <div className="aspect-[4/3] overflow-hidden mb-6 bg-gray-200">
                <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" alt="Ventas" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <span className="text-[#E30613] text-[11px] font-bold tracking-[0.15em] uppercase mb-3 block">— CATEGORÍA C</span>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-[#E30613] transition-colors">Ventas y Marketing</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Captación de leads, asistentes de voz conversacionales, CRM inteligente y seguimiento de retención proactiva.</p>
            </div>

            <div className="group cursor-pointer">
              <div className="aspect-[4/3] overflow-hidden mb-6 bg-gray-200">
                <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop" alt="Capital Humano" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <span className="text-[#E30613] text-[11px] font-bold tracking-[0.15em] uppercase mb-3 block">— CATEGORÍA D</span>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-[#E30613] transition-colors">Capital Humano y Compliance</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Atracción de talento (ATS), portales gamificados, trackers de normativas (STPS) y bases de conocimiento.</p>
            </div>

            <div className="group cursor-pointer">
              <div className="aspect-[4/3] overflow-hidden mb-6 bg-gray-200">
                <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" alt="Tecnología" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <span className="text-[#E30613] text-[11px] font-bold tracking-[0.15em] uppercase mb-3 block">— CATEGORÍA E</span>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-[#E30613] transition-colors">Tecnología e Innovación</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Integración de APIs, gobierno de datos, ciberseguridad, infraestructura corporativa y soluciones transversales.</p>
            </div>

          </div>
        </div>
      </section>

      {/* Scorecard Section */}
      <section id="scorecard" className="py-24 max-w-[1600px] mx-auto px-6 border-b border-gray-100">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/3">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 uppercase">Scorecard<br/>100 Puntos</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              La evaluación del jurado se centrará objetivamente en resultados medibles, priorizando el impacto económico y la eficiencia operativa.
            </p>
            <div className="bg-red-50 p-6 border-l-4 border-[#E30613]">
              <span className="text-red-700 text-[10px] font-bold tracking-[0.15em] uppercase block mb-2">Requisito Habilitante</span>
              <p className="text-red-900 text-sm leading-relaxed font-medium">
                La seguridad y el uso responsable de la IA son obligatorios. El uso de datos o licencias no autorizadas causará descalificación automática.
              </p>
            </div>
          </div>
          
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-end justify-between mb-2">
                <h3 className="text-xl font-bold">Impacto Económico</h3>
                <span className="text-3xl font-light text-gray-300">25</span>
              </div>
              <p className="text-gray-500 text-sm">Beneficio neto, ingresos recuperados y costos evitados.</p>
            </div>
            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-end justify-between mb-2">
                <h3 className="text-xl font-bold">Eficiencia</h3>
                <span className="text-3xl font-light text-gray-300">25</span>
              </div>
              <p className="text-gray-500 text-sm">Antes vs. Después en tiempos, reducción de errores y capacidad.</p>
            </div>
            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-end justify-between mb-2">
                <h3 className="text-xl font-bold">Funcionalidad</h3>
                <span className="text-3xl font-light text-gray-300">20</span>
              </div>
              <p className="text-gray-500 text-sm">Estabilidad, usabilidad y resultados en operación real.</p>
            </div>
            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-end justify-between mb-2">
                <h3 className="text-xl font-bold">Escalabilidad</h3>
                <span className="text-3xl font-light text-gray-300">20</span>
              </div>
              <p className="text-gray-500 text-sm">Replicabilidad institucional y bajo costo de mantenimiento.</p>
            </div>
            <div className="border-t border-gray-200 pt-6 md:col-span-2">
              <div className="flex items-end justify-between mb-2">
                <h3 className="text-xl font-bold">Conectividad e Integración</h3>
                <span className="text-3xl font-light text-gray-300">10</span>
              </div>
              <p className="text-gray-500 text-sm">Interoperabilidad segura con procesos, sistemas o actores relevantes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Profile/Timeline Section */}
      <section id="etapas" className="pt-24 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight uppercase">Cronograma</h2>
        </div>
        
        <div className="w-full h-[60vh] relative mb-16">
          <img 
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop" 
            alt="Equipo Prosur" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-[1600px] mx-auto px-6 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="group">
              <span className="text-[#E30613] text-[11px] font-bold tracking-[0.15em] uppercase mb-2 block">— FASE 1</span>
              <h3 className="text-2xl font-bold mb-4">Lanzamiento</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">Convocatoria oficial, bases e inscripciones.</p>
              <span className="text-[11px] font-bold text-[#1a1a1a] tracking-widest uppercase border-b border-gray-300 pb-1">Fechas por definir</span>
            </div>
            <div className="group">
              <span className="text-[#E30613] text-[11px] font-bold tracking-[0.15em] uppercase mb-2 block">— FASE 2</span>
              <h3 className="text-2xl font-bold mb-4">Validación</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">Admisibilidad, mentoría y auditoría de la evidencia.</p>
              <span className="text-[11px] font-bold text-[#1a1a1a] tracking-widest uppercase border-b border-gray-300 pb-1">Próximamente</span>
            </div>
            <div className="group">
              <span className="text-[#E30613] text-[11px] font-bold tracking-[0.15em] uppercase mb-2 block">— FASE 3</span>
              <h3 className="text-2xl font-bold mb-4">Cierre</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">Presentación final (Pitch) y ceremonia de premiación.</p>
              <span className="text-[11px] font-bold text-[#1a1a1a] tracking-widest uppercase border-b border-gray-300 pb-1">Próximamente</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1f1f1f] text-white py-16 px-6 relative">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <div className="col-span-1 md:col-span-2">
            <img src="/logoprosur.png" alt="Grupo PROSUR" className="h-10 object-contain mb-8 filter brightness-0 invert opacity-90" />
            <p className="text-[11px] tracking-widest font-bold uppercase text-gray-400 mb-2">RETO DE INTELIGENCIA ARTIFICIAL</p>
            <p className="text-sm text-gray-500 max-w-sm">
              Conviértelo en el próximo estándar del Grupo. Demuestra el impacto operativo.
            </p>
          </div>
          
          <div>
            <span className="text-red-500 text-[10px] font-bold tracking-widest uppercase mb-4 block">CONTACTO</span>
            <p className="text-sm text-gray-400 mb-2">Área responsable: Por definir</p>
            <p className="text-sm text-gray-400 mb-2">Correo: Por definir</p>
            <p className="text-sm text-gray-400">Extensión: Por definir</p>
          </div>
          
          <div>
            <span className="text-red-500 text-[10px] font-bold tracking-widest uppercase mb-4 block">ENLACES</span>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Bases Oficiales (PDF)</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Inscripciones</a></li>
              <li><button onClick={() => setCurrentView('course')} className="text-sm text-gray-400 hover:text-white transition-colors">Academia Prosur</button></li>
            </ul>
          </div>
          
        </div>
        
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="absolute bottom-16 right-6 w-12 h-12 bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-colors"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      </footer>
    </div>
  );
}
