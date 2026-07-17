import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '../../../../../Documents/Desarrollos/prosurIA');

console.log("Starting backend server from:", projectRoot);

const serverProcess = spawn('node', ['backend/server.js'], {
  cwd: projectRoot,
  env: {
    ...process.env,
    API_BACKEND_PORT: '5500', // Use a separate test port
    PORT: '5500'
  }
});

serverProcess.stdout.on('data', (data) => {
  console.log(`[Server Stdout]: ${data.toString().trim()}`);
});

serverProcess.stderr.on('data', (data) => {
  console.error(`[Server Stderr]: ${data.toString().trim()}`);
});

// Wait for server to start, then hit the refresh endpoint
setTimeout(async () => {
  console.log("\nTriggering POST to /api/trends/refresh...");
  try {
    const res = await globalThis.fetch('http://127.0.0.1:5500/api/trends/refresh', {
      method: 'POST'
    });
    console.log("Status Code:", res.status);
    const body = await res.json();
    console.log("Response Body (first 150 chars):", JSON.stringify(body).substring(0, 150) + "...");
    
    if (res.status === 200) {
      console.log("\nSUCCESS: Vertex AI refresh returned successfully!");
    } else {
      console.warn("\nWARNING: Server returned an error (likely due to missing local GCP ADC credentials). This is expected if 'gcloud auth application-default login' hasn't been run locally. If so, verify on the cPanel production server.");
    }
  } catch (err) {
    console.error("Failed to fetch from test server:", err.message);
  } finally {
    console.log("Shutting down test server...");
    serverProcess.kill();
    process.exit(0);
  }
}, 4000);
