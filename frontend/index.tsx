import './vertex-ai-proxy-interceptor.js';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Capacitacion from './components/Capacitacion';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
const Page = window.location.pathname === '/capacitacion' ? Capacitacion : App;
root.render(
  <React.StrictMode>
    <Page />
  </React.StrictMode>
);