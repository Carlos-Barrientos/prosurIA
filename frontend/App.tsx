import React from 'react';
import { 
  Rocket, 
  Target, 
  BarChart, 
  Zap, 
  Network, 
  ShieldCheck, 
  Layers, 
  Briefcase, 
  Users, 
  Wrench, 
  Database,
  ArrowRight,
  ChevronRight
} from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-rose-500/30 selection:text-rose-200 overflow-hidden font-sans">
      
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-rose-600/5 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-indigo-600/5 blur-[120px]" />
        <div className="absolute top-[40%] left-[60%] w-[30vw] h-[30vw] rounded-full bg-violet-600/5 blur-[100px]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
      </div>

      <div className="relative z-10">
        
        {/* Navbar */}
        <nav className="border-b border-slate-800/50 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-rose-500/20">
                <Zap className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">Grupo PROSUR</span>
            </div>
            <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
              <a href="#proposito" className="hover:text-rose-400 transition-colors">Propósito</a>
              <a href="#categorias" className="hover:text-rose-400 transition-colors">Categorías</a>
              <a href="#scorecard" className="hover:text-rose-400 transition-colors">Scorecard</a>
              <a href="#etapas" className="hover:text-rose-400 transition-colors">Etapas</a>
            </div>
            <button className="px-6 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white font-medium border border-white/10 transition-all flex items-center gap-2">
              Bases Oficiales <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-24 px-6 relative">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 text-rose-400 font-semibold text-sm mb-8 border border-rose-500/20 shadow-[0_0_20px_rgba(225,29,72,0.2)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
              </span>
              Nueva Convocatoria Abierta
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[1.05] mb-8">
              Reto de <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500">IA PROSUR</span>
            </h1>
            
            <p className="text-2xl md:text-3xl font-light text-slate-300 mb-6">
              De la Idea al <strong className="text-white font-bold">Impacto.</strong>
            </p>
            
            <p className="text-lg text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed">
              Aquí se premia el impacto probado, no la idea. Solo participan proyectos con inteligencia artificial o automatización ya funcionales en la empresa, que generen ahorros y valor verificable.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-bold text-lg transition-all shadow-[0_0_30px_rgba(225,29,72,0.3)] hover:shadow-[0_0_40px_rgba(225,29,72,0.5)] flex items-center justify-center gap-2">
                Preparar mi Proyecto <Rocket className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mt-20 flex flex-wrap justify-center gap-12 text-sm font-bold tracking-widest uppercase text-slate-500">
              <div className="flex flex-col items-center gap-2">
                <span className="text-4xl text-slate-200">5</span>
                Categorías
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="text-4xl text-slate-200">5</span>
                Pilares
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-indigo-500">100</span>
                Puntos
              </div>
            </div>
          </div>
        </section>

        {/* The Principle / Ruta de Valor */}
        <section id="proposito" className="py-24 bg-slate-900/50 border-y border-slate-800/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-white mb-4">Ruta de Valor</h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">No califican ideas, conceptos ni prototipos aislados. Demuestra el flujo completo.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { icon: Target, title: "1. Problema Real", desc: "Dolor operativo y necesidad detectada en la empresa." },
                { icon: Zap, title: "2. Solución Operativa", desc: "Uso sustantivo y explicable de IA ya funcionando." },
                { icon: BarChart, title: "3. Valor Verificable", desc: "Medición clara de un Antes vs. Después." },
                { icon: Network, title: "4. Escalabilidad", desc: "Beneficio económico, ahorros y potencial de expansión." }
              ].map((step, i) => (
                <div key={i} className="bg-slate-800/30 border border-slate-700/50 p-8 rounded-3xl hover:bg-slate-800/50 transition-colors relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <step.icon className="w-32 h-32 text-white" />
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center mb-6 border border-slate-700 group-hover:border-rose-500/50 transition-colors">
                    <step.icon className="w-6 h-6 text-rose-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 relative z-10">{step.title}</h3>
                  <p className="text-slate-400 relative z-10">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section id="categorias" className="py-24 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div>
                <h2 className="text-4xl font-black text-white mb-4">5 Categorías Oficiales</h2>
                <p className="text-slate-400 text-lg max-w-2xl">Cada proyecto compite en una sola categoría basada en su área principal de impacto.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { id: "A", icon: Briefcase, color: "from-blue-500/20 to-blue-600/5", border: "group-hover:border-blue-500/50", title: "Finanzas, Contabilidad y Tesorería", desc: "Cierres contables, conciliaciones automatizadas, cumplimiento fiscal y RPA." },
                { id: "B", icon: Wrench, color: "from-orange-500/20 to-orange-600/5", border: "group-hover:border-orange-500/50", title: "Operaciones, Taller, Logística y Posventa", desc: "Inventarios, optimización en talleres, mermas, logística de traslados y reportes." },
                { id: "C", icon: Users, color: "from-emerald-500/20 to-emerald-600/5", border: "group-hover:border-emerald-500/50", title: "Ventas, Marketing y Relación con Clientes", desc: "Asignación de prospectos, asistentes de voz, CRM y seguimiento proactivo." },
                { id: "D", icon: Layers, color: "from-purple-500/20 to-purple-600/5", border: "group-hover:border-purple-500/50", title: "Capital Humano, Compliance y Gobernanza", desc: "Atracción de talento, portales gamificados, cumplimiento normativo (STPS)." },
                { id: "E", icon: Database, color: "from-rose-500/20 to-rose-600/5", border: "group-hover:border-rose-500/50", title: "Tecnología, Datos e Innovación", desc: "Integración de sistemas, gobierno de datos, ciberseguridad e infraestructura." },
              ].map((cat) => (
                <div key={cat.id} className={`group bg-gradient-to-br ${cat.color} bg-slate-900 border border-slate-800 p-8 rounded-3xl transition-all ${cat.border} relative overflow-hidden`}>
                  <div className="absolute top-4 right-6 text-6xl font-black text-white/5 group-hover:text-white/10 transition-colors">
                    {cat.id}
                  </div>
                  <cat.icon className="w-10 h-10 text-white mb-6" />
                  <h3 className="text-2xl font-bold text-white mb-3 pr-8">{cat.title}</h3>
                  <p className="text-slate-400">{cat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Scorecard */}
        <section id="scorecard" className="py-24 bg-slate-900/50 border-y border-slate-800/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-white mb-4">Scorecard: 100 Puntos</h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">La evaluación es objetiva y basada en evidencia comprobable.</p>
            </div>
            
            <div className="max-w-4xl mx-auto bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-slate-800">
                {[
                  { name: "Impacto Económico", pts: "25", desc: "Beneficio neto generado." },
                  { name: "Eficiencia", pts: "25", desc: "Mejora real en el proceso." },
                  { name: "Funcionalidad", pts: "20", desc: "Operación y usabilidad real." },
                  { name: "Escalabilidad", pts: "20", desc: "Potencial de adopción." },
                  { name: "Conectividad", pts: "10", desc: "Integración segura." }
                ].map((item, i) => (
                  <div key={i} className="p-8 text-center hover:bg-slate-800/50 transition-colors">
                    <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500 mb-2">{item.pts}</div>
                    <div className="text-sm font-bold text-white uppercase tracking-wider mb-2">{item.name}</div>
                    <div className="text-xs text-slate-400">{item.desc}</div>
                  </div>
                ))}
              </div>
              <div className="bg-rose-500/10 border-t border-rose-500/20 p-6 flex items-start gap-4">
                <ShieldCheck className="w-6 h-6 text-rose-400 shrink-0" />
                <p className="text-sm text-rose-200/80">
                  <strong className="text-rose-300">Requisito Habilitante:</strong> La seguridad, cumplimiento normativo y autorización de datos son obligatorios. El incumplimiento descalifica el proyecto antes de la evaluación.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section id="etapas" className="py-24 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl font-black text-white mb-16">Cronograma del Reto</h2>
            
            <div className="relative">
              <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-800 -translate-y-1/2 hidden md:block" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                <div className="relative bg-slate-900 border border-slate-700 p-8 rounded-3xl z-10 hover:-translate-y-2 transition-transform">
                  <div className="w-4 h-4 bg-rose-500 rounded-full absolute -top-2 left-1/2 -translate-x-1/2 shadow-[0_0_10px_rgba(225,29,72,0.8)] hidden md:block" />
                  <h3 className="text-xl font-bold text-white mb-2">1. Lanzamiento</h3>
                  <p className="text-rose-400 font-medium mb-4 text-sm uppercase tracking-wider">Fechas por definir</p>
                  <p className="text-slate-400 text-sm">Publicación oficial de bases, inicio de conformación de equipos e inscripción de proyectos operando.</p>
                </div>
                
                <div className="relative bg-slate-900 border border-slate-700 p-8 rounded-3xl z-10 hover:-translate-y-2 transition-transform">
                  <div className="w-4 h-4 bg-slate-500 rounded-full absolute -top-2 left-1/2 -translate-x-1/2 hidden md:block" />
                  <h3 className="text-xl font-bold text-white mb-2">2. Validación</h3>
                  <p className="text-slate-500 font-medium mb-4 text-sm uppercase tracking-wider">Próximamente</p>
                  <p className="text-slate-400 text-sm">Revisión de admisibilidad, mentoría para fortalecer casos y auditoría de la evidencia financiera e impacto.</p>
                </div>
                
                <div className="relative bg-slate-900 border border-slate-700 p-8 rounded-3xl z-10 hover:-translate-y-2 transition-transform">
                  <div className="w-4 h-4 bg-slate-500 rounded-full absolute -top-2 left-1/2 -translate-x-1/2 hidden md:block" />
                  <h3 className="text-xl font-bold text-white mb-2">3. Cierre</h3>
                  <p className="text-slate-500 font-medium mb-4 text-sm uppercase tracking-wider">Próximamente</p>
                  <p className="text-slate-400 text-sm">Presentación final (Pitch + Demo) ante el jurado y ceremonia de premiación de los ganadores.</p>
                </div>

              </div>
            </div>
            
            <div className="mt-16 inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-slate-800/50 text-slate-300 border border-slate-700">
              <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
              Las fechas oficiales y formatos de inscripción se anunciarán pronto. ¡Prepara tu evidencia!
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-800/50 bg-slate-950 py-12 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Zap className="text-rose-500 w-6 h-6" />
              <span className="text-lg font-bold text-white">Grupo PROSUR</span>
            </div>
            <p className="text-slate-500 text-sm text-center md:text-left">
              © 2026 Reto de Inteligencia Artificial. Dirigido a colaboradores de Grupo PROSUR.
            </p>
            <div className="flex gap-6 text-sm text-slate-400">
              <a href="#" className="hover:text-white transition-colors">Contacto Área Responsable</a>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
