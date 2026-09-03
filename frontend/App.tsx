import React from 'react';
import { Search, ChevronUp } from 'lucide-react';

export default function App() {
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
          
          <nav className="hidden lg:flex items-center gap-10 text-[11px] font-bold tracking-[0.15em] uppercase text-gray-600">
            <a href="#proposito" className="hover:text-red-600 transition-colors">Propósito</a>
            <a href="#categorias" className="hover:text-red-600 transition-colors">Categorías</a>
            <a href="#scorecard" className="hover:text-red-600 transition-colors">Scorecard</a>
            <a href="#etapas" className="hover:text-red-600 transition-colors">Etapas</a>
            <button className="ml-4">
              <Search className="w-5 h-5 text-gray-400 hover:text-[#1a1a1a] transition-colors" />
            </button>
          </nav>
        </div>
      </header>

      {/* Sub-nav (Optional, like in EYRC) */}
      <div className="border-b border-gray-100 hidden md:block">
        <div className="max-w-[1600px] mx-auto px-6 h-12 flex items-center gap-8 text-[10px] font-bold tracking-[0.1em] uppercase text-gray-400">
          <span className="text-[#1a1a1a]">CONVOCATORIA</span>
          <a href="#categorias" className="hover:text-red-600 transition-colors">5 CATEGORÍAS</a>
          <a href="#scorecard" className="hover:text-red-600 transition-colors">100 PUNTOS</a>
        </div>
      </div>

      {/* Hero Split Section (Like EYRC Houses/Buildings) */}
      <section className="w-full h-[70vh] flex flex-col md:flex-row">
        {/* Left Side: Idea */}
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
        
        {/* Right Side: Impacto */}
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

      {/* Categories Grid (Like EYRC Blog/Projects) */}
      <section id="categorias" className="py-24 bg-[#f9f9f9]">
        <div className="max-w-[1600px] mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-16 uppercase">5 Categorías Oficiales</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            
            {/* Category A */}
            <div className="group cursor-pointer">
              <div className="aspect-[4/3] overflow-hidden mb-6 bg-gray-200">
                <img src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop" alt="Finanzas" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <span className="text-red-600 text-[11px] font-bold tracking-[0.15em] uppercase mb-3 block">— CATEGORÍA A</span>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-red-600 transition-colors">Finanzas, Contabilidad y Tesorería</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Cierres contables, conciliaciones automatizadas, cumplimiento fiscal y dispersión bancaria masiva sin errores.</p>
            </div>

            {/* Category B */}
            <div className="group cursor-pointer">
              <div className="aspect-[4/3] overflow-hidden mb-6 bg-gray-200">
                <img src="https://images.unsplash.com/photo-1586528116311-ad8ed7c8d63a?q=80&w=2070&auto=format&fit=crop" alt="Operaciones" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <span className="text-red-600 text-[11px] font-bold tracking-[0.15em] uppercase mb-3 block">— CATEGORÍA B</span>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-red-600 transition-colors">Operaciones, Taller y Logística</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Control físico de inventarios, optimización de tiempos en talleres mecánicos, mermas y reportes integrados.</p>
            </div>

            {/* Category C */}
            <div className="group cursor-pointer">
              <div className="aspect-[4/3] overflow-hidden mb-6 bg-gray-200">
                <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" alt="Ventas" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <span className="text-red-600 text-[11px] font-bold tracking-[0.15em] uppercase mb-3 block">— CATEGORÍA C</span>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-red-600 transition-colors">Ventas y Marketing</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Captación de leads, asistentes de voz conversacionales, CRM inteligente y seguimiento de retención proactiva.</p>
            </div>

            {/* Category D */}
            <div className="group cursor-pointer">
              <div className="aspect-[4/3] overflow-hidden mb-6 bg-gray-200">
                <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop" alt="Capital Humano" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <span className="text-red-600 text-[11px] font-bold tracking-[0.15em] uppercase mb-3 block">— CATEGORÍA D</span>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-red-600 transition-colors">Capital Humano y Compliance</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Atracción de talento (ATS), portales gamificados, trackers de normativas (STPS) y bases de conocimiento.</p>
            </div>

            {/* Category E */}
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

      {/* Profile/Timeline Section (Like EYRC Profile Image) */}
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

      {/* Footer (Dark like EYRC) */}
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
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Portal de Empleados</a></li>
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
