import React, { useState } from 'react';
import { Search, ChevronUp, BookOpen, Terminal, CheckCircle2, Play, ArrowLeft, Layout, ShieldAlert, Cpu, Database, Network } from 'lucide-react';

// --- COMPONENTE DEL CURSO INTERACTIVO ---
function CourseView({ setView }) {
  const [activeTab, setActiveTab] = useState('prompting');

  // Estado Ejercicio 1: Prompting
  const [rol, setRol] = useState('Especialista en normalización marcaria de Prosur');
  const [contexto, setContexto] = useState('Evaluación de solicitudes de marcas colectivas e indicaciones geográficas entre países miembros.');
  const [tarea, setTarea] = useState('Analizar el pliego de condiciones anexo y verificar la concordancia con la Clasificación de Niza.');
  const [restricciones, setRestricciones] = useState('Basa tu análisis estrictamente en las clases 29 a 33. No formules supuestos adicionales.');
  const [formato, setFormato] = useState('Tabla con 3 columnas: Término, Infracción, Clasificación Sugerida.');
  const [simulatedOutput1, setSimulatedOutput1] = useState('');
  const [isSimulating1, setIsSimulating1] = useState(false);

  // Estado Ejercicio 2: Arquitectura RAG
  const [ragQuery, setRagQuery] = useState('¿Cuál es el periodo de gracia para modelos de utilidad?');
  const [ragOutput, setRagOutput] = useState(null);
  const [isSimulatingRag, setIsSimulatingRag] = useState(false);

  const handleSimulate1 = () => {
    setIsSimulating1(true);
    setSimulatedOutput1('');
    setTimeout(() => {
      setSimulatedOutput1(`[Respuesta del Modelo Generativo]\n\nAnálisis completado basándome en los parámetros estrictos de Prosur:\n\n| Término Observado | Infracción Detectada | Clasificación Sugerida |\n|-------------------|-----------------------|------------------------|\n| "Queso de cabra"  | Ninguna               | Clase 29               |\n| "Vino espumoso"   | Fuera de rango (29-33)| Clase 33               |\n| "Servicio logíst."| Infracción (Servicio) | Clase 39 (Rechazada)   |\n\nNota: Cumplimiento exitoso de restricción. No se infirieron clases fuera del rango autorizado.`);
      setIsSimulating1(false);
    }, 1500);
  };

  const handleSimulateRag = () => {
    setIsSimulatingRag(true);
    setRagOutput(null);
    setTimeout(() => {
      setRagOutput({
        lexical: ["...el periodo abarca...", "...utilidad de los modelos..."],
        vector: ["...modelos de utilidad gozarán de un periodo de gracia improrrogable de seis meses..."],
        final: "Basado en las Directrices Prosur 2023 (Pág. 45), las solicitudes sobre modelos de utilidad gozarán de un periodo de gracia improrrogable de seis meses para la presentación de traducciones oficiales en el país receptor."
      });
      setIsSimulatingRag(false);
    }, 2000);
  };

  const progress = [rol, contexto, tarea, restricciones, formato].filter(Boolean).length * 20;

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#1a1a1a] font-sans">
      {/* Header Académico */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setView('landing')} className="text-gray-400 hover:text-red-600 transition-colors flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
              <ArrowLeft className="w-4 h-4" /> Volver
            </button>
            <div className="h-6 w-[1px] bg-gray-200 mx-2"></div>
            <BookOpen className="w-5 h-5 text-red-600" />
            <span className="text-[12px] tracking-widest font-bold text-[#1a1a1a] uppercase">
              Academia Prosur: Ejercicios Prácticos
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12">
        {/* Sidebar Temario */}
        <aside className="w-full lg:w-1/4">
          <div className="bg-white p-6 border border-gray-200 shadow-sm sticky top-24">
            <h3 className="text-xs font-bold tracking-[0.15em] text-gray-400 uppercase mb-6">Arquitectura Curricular</h3>
            <nav className="space-y-4">
              {/* Modulo 1 */}
              <div>
                <div className="flex items-center gap-3 text-red-600 font-bold text-sm mb-2">
                  <CheckCircle2 className="w-4 h-4" /> Módulo 1: Fundamentos
                </div>
                <ul className="pl-7 space-y-3 text-sm text-gray-500 border-l border-gray-100 ml-2">
                  <li 
                    onClick={() => setActiveTab('prompting')}
                    className={`cursor-pointer transition-colors flex items-center gap-2 ${activeTab === 'prompting' ? 'text-[#1a1a1a] font-semibold' : 'hover:text-red-600'}`}
                  >
                    {activeTab === 'prompting' && <Terminal className="w-3 h-3 text-red-600" />} 
                    Ingeniería de Prompts
                  </li>
                </ul>
              </div>
              {/* Modulo 4 */}
              <div className="pt-2">
                <div className="flex items-center gap-3 text-red-600 font-bold text-sm mb-2">
                  <Cpu className="w-4 h-4" /> Módulo 4: Arquitecturas
                </div>
                <ul className="pl-7 space-y-3 text-sm text-gray-500 border-l border-gray-100 ml-2">
                  <li 
                    onClick={() => setActiveTab('rag')}
                    className={`cursor-pointer transition-colors flex items-center gap-2 ${activeTab === 'rag' ? 'text-[#1a1a1a] font-semibold' : 'hover:text-red-600'}`}
                  >
                    {activeTab === 'rag' && <Database className="w-3 h-3 text-red-600" />} 
                    Simulador RAG (Azure)
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </aside>

        {/* Área Central de Ejercicios */}
        <main className="w-full lg:w-3/4">
          
          {/* EJERCICIO 1: PROMPTING */}
          {activeTab === 'prompting' && (
            <div className="animate-in fade-in slide-in-from-bottom-4">
              <div className="mb-10">
                <span className="text-red-600 text-[11px] font-bold tracking-widest uppercase block mb-3">— TEMA 2</span>
                <h1 className="text-4xl font-bold tracking-tight mb-4">Laboratorio: Ingeniería de Prompts</h1>
                <p className="text-gray-500 leading-relaxed max-w-3xl">
                  En Prosur, formalizamos una estructura innegociable de 5 componentes para garantizar respuestas deterministas y reproducibles. <strong>Modifica el prompt y ejecuta la simulación:</strong>
                </p>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Editor */}
                <div className="bg-white border border-gray-200 p-8 shadow-sm">
                  <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                    <h2 className="text-lg font-bold flex items-center gap-2">
                      <Terminal className="w-5 h-5 text-gray-400" /> Constructor
                    </h2>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-red-600 bg-red-50 px-3 py-1">
                      Estructura Prosur
                    </span>
                  </div>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">1. Rol Institucional</label>
                      <input type="text" value={rol} onChange={(e)=>setRol(e.target.value)} className="w-full text-sm p-3 border border-gray-200 focus:border-red-600 outline-none transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">2. Contexto Operativo</label>
                      <textarea value={contexto} onChange={(e)=>setContexto(e.target.value)} rows="2" className="w-full text-sm p-3 border border-gray-200 focus:border-red-600 outline-none resize-none transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">3. Tarea Específica</label>
                      <textarea value={tarea} onChange={(e)=>setTarea(e.target.value)} rows="2" className="w-full text-sm p-3 border border-gray-200 focus:border-red-600 outline-none resize-none transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-red-600 mb-2">4. Restricciones</label>
                      <textarea value={restricciones} onChange={(e)=>setRestricciones(e.target.value)} rows="2" className="w-full text-sm p-3 border border-red-200 bg-red-50/30 focus:border-red-600 outline-none resize-none transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">5. Formato de Salida</label>
                      <input type="text" value={formato} onChange={(e)=>setFormato(e.target.value)} className="w-full text-sm p-3 border border-gray-200 focus:border-red-600 outline-none transition-colors" />
                    </div>
                  </div>
                </div>

                {/* Consola */}
                <div className="flex flex-col gap-6">
                  <div className="bg-[#1e1e1e] p-6 text-gray-300 font-mono text-xs leading-relaxed shadow-lg relative h-64 overflow-y-auto">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-red-900"></div>
                    <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-2">
                      <span className="text-gray-500 font-sans font-bold tracking-widest uppercase text-[10px]">Prompt Compilado</span>
                      <span className="text-green-400 font-sans font-bold text-[10px]">{progress}% Calidad</span>
                    </div>
                    <p><span className="text-blue-400">Rol:</span> {rol || '...'}</p>
                    <p className="mt-2"><span className="text-blue-400">Contexto:</span> {contexto || '...'}</p>
                    <p className="mt-2"><span className="text-blue-400">Tarea:</span> {tarea || '...'}</p>
                    <p className="mt-2"><span className="text-red-400">Restricciones:</span> {restricciones || '...'}</p>
                    <p className="mt-2"><span className="text-blue-400">Formato:</span> {formato || '...'}</p>
                  </div>
                  <button onClick={handleSimulate1} disabled={progress < 100 || isSimulating1} className="w-full py-4 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 text-white font-bold tracking-widest uppercase text-xs flex items-center justify-center gap-2 transition-colors">
                    {isSimulating1 ? 'Procesando en LLM...' : <><Play className="w-4 h-4" /> Ejecutar Simulación</>}
                  </button>
                  {simulatedOutput1 && (
                    <div className="bg-white border border-gray-200 p-6 shadow-sm animate-in fade-in">
                      <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" /> Resultado Generado
                      </h3>
                      <pre className="font-mono text-xs whitespace-pre-wrap text-gray-700">{simulatedOutput1}</pre>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* EJERCICIO 2: RAG */}
          {activeTab === 'rag' && (
            <div className="animate-in fade-in slide-in-from-bottom-4">
              <div className="mb-10">
                <span className="text-red-600 text-[11px] font-bold tracking-widest uppercase block mb-3">— TEMA 14</span>
                <h1 className="text-4xl font-bold tracking-tight mb-4">Simulador: Arquitectura RAG Empresarial</h1>
                <p className="text-gray-500 leading-relaxed max-w-3xl">
                  La Generación Aumentada por Recuperación (RAG) resuelve las alucinaciones inyectando fragmentos documentales de Prosur en el modelo de lenguaje. <strong>Observa cómo el sistema recupera la información antes de generar la respuesta:</strong>
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
                      <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
                        <Database className="w-4 h-4" /> 1. Búsqueda Léxica (BM25)
                      </h3>
                      <p className="text-sm text-gray-500 italic bg-white p-3 border border-gray-100">"{ragOutput.lexical[0]}"</p>
                    </div>
                    <div className="bg-red-50/50 p-6 border border-red-100">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-red-600 mb-4 flex items-center gap-2">
                        <Cpu className="w-4 h-4" /> 2. Búsqueda Vectorial (Similitud)
                      </h3>
                      <p className="text-sm text-red-900 bg-white p-3 border border-red-200 font-medium">"{ragOutput.vector[0]}"</p>
                    </div>
                  </div>
                  <div className="bg-[#1e1e1e] p-8 text-white shadow-xl relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-green-500"></div>
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" /> 3. Respuesta Final Inyectada (LLM)
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-200">
                      {ragOutput.final}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

        </main>
      </div>
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
      
      {/* Header - Minimalist EYRC Style */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/logoprosur.png" alt="Grupo PROSUR" className="h-8 object-contain" />
            <span className="text-[13px] tracking-widest font-medium text-gray-500 hidden md:block">
              RETO DE INTELIGENCIA ARTIFICIAL
            </span>
          </div>
          
          <nav className="hidden lg:flex items-center gap-8 text-[11px] font-bold tracking-[0.15em] uppercase text-gray-600">
            <a href="#proposito" className="hover:text-red-600 transition-colors">Propósito</a>
            <a href="#categorias" className="hover:text-red-600 transition-colors">Categorías</a>
            <a href="#scorecard" className="hover:text-red-600 transition-colors">Scorecard</a>
            <a href="#etapas" className="hover:text-red-600 transition-colors">Etapas</a>
            {/* BOTÓN NUEVO DE ACADEMIA PROSUR */}
            <button 
              onClick={() => setCurrentView('course')}
              className="flex items-center gap-2 bg-[#1a1a1a] text-white px-5 py-2.5 hover:bg-red-600 transition-colors"
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
          <a href="#categorias" className="hover:text-red-600 transition-colors">5 CATEGORÍAS</a>
          <a href="#scorecard" className="hover:text-red-600 transition-colors">100 PUNTOS</a>
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
              <span className="text-red-600 text-[11px] font-bold tracking-widest uppercase mb-4 block">— 01</span>
              <h3 className="text-xl font-bold mb-3">Problema Real</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Dolor operativo y necesidad detectada en la empresa.</p>
            </div>
            <div>
              <span className="text-red-600 text-[11px] font-bold tracking-widest uppercase mb-4 block">— 02</span>
              <h3 className="text-xl font-bold mb-3">Solución Operativa</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Uso sustantivo y explicable de Inteligencia Artificial ya funcionando.</p>
            </div>
            <div>
              <span className="text-red-600 text-[11px] font-bold tracking-widest uppercase mb-4 block">— 03</span>
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
              <span className="text-red-600 text-[11px] font-bold tracking-[0.15em] uppercase mb-3 block">— CATEGORÍA A</span>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-red-600 transition-colors">Finanzas, Contabilidad y Tesorería</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Cierres contables, conciliaciones automatizadas, cumplimiento fiscal y dispersión bancaria masiva sin errores.</p>
            </div>

            <div className="group cursor-pointer">
              <div className="aspect-[4/3] overflow-hidden mb-6 bg-gray-200">
                <img src="https://images.unsplash.com/photo-1586528116311-ad8ed7c8d63a?q=80&w=2070&auto=format&fit=crop" alt="Operaciones" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <span className="text-red-600 text-[11px] font-bold tracking-[0.15em] uppercase mb-3 block">— CATEGORÍA B</span>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-red-600 transition-colors">Operaciones, Taller y Logística</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Control físico de inventarios, optimización de tiempos en talleres mecánicos, mermas y reportes integrados.</p>
            </div>

            <div className="group cursor-pointer">
              <div className="aspect-[4/3] overflow-hidden mb-6 bg-gray-200">
                <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" alt="Ventas" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <span className="text-red-600 text-[11px] font-bold tracking-[0.15em] uppercase mb-3 block">— CATEGORÍA C</span>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-red-600 transition-colors">Ventas y Marketing</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Captación de leads, asistentes de voz conversacionales, CRM inteligente y seguimiento de retención proactiva.</p>
            </div>

            <div className="group cursor-pointer">
              <div className="aspect-[4/3] overflow-hidden mb-6 bg-gray-200">
                <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop" alt="Capital Humano" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <span className="text-red-600 text-[11px] font-bold tracking-[0.15em] uppercase mb-3 block">— CATEGORÍA D</span>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-red-600 transition-colors">Capital Humano y Compliance</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Atracción de talento (ATS), portales gamificados, trackers de normativas (STPS) y bases de conocimiento.</p>
            </div>

            <div className="group cursor-pointer">
              <div className="aspect-[4/3] overflow-hidden mb-6 bg-gray-200">
                <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" alt="Tecnología" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <span className="text-red-600 text-[11px] font-bold tracking-[0.15em] uppercase mb-3 block">— CATEGORÍA E</span>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-red-600 transition-colors">Tecnología e Innovación</h3>
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
            <div className="bg-red-50 p-6 border-l-4 border-red-600">
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
              <span className="text-red-600 text-[11px] font-bold tracking-[0.15em] uppercase mb-2 block">— FASE 1</span>
              <h3 className="text-2xl font-bold mb-4">Lanzamiento</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">Convocatoria oficial, bases e inscripciones.</p>
              <span className="text-[11px] font-bold text-[#1a1a1a] tracking-widest uppercase border-b border-gray-300 pb-1">Fechas por definir</span>
            </div>
            <div className="group">
              <span className="text-red-600 text-[11px] font-bold tracking-[0.15em] uppercase mb-2 block">— FASE 2</span>
              <h3 className="text-2xl font-bold mb-4">Validación</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">Admisibilidad, mentoría y auditoría de la evidencia.</p>
              <span className="text-[11px] font-bold text-[#1a1a1a] tracking-widest uppercase border-b border-gray-300 pb-1">Próximamente</span>
            </div>
            <div className="group">
              <span className="text-red-600 text-[11px] font-bold tracking-[0.15em] uppercase mb-2 block">— FASE 3</span>
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
