import React from 'react';
import { Sparkles, ArrowRight, Bot } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative bg-transparent overflow-hidden pt-24 pb-32 lg:pt-32 lg:pb-40 flex items-center justify-center min-h-[90vh]">
      
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="absolute w-[800px] h-[800px] bg-gradient-to-br from-prosur-red/20 to-purple-500/10 rounded-full blur-[120px] mix-blend-multiply opacity-70 animate-pulse-slow"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="text-center max-w-5xl mx-auto flex flex-col items-center">
          
          <div className="inline-flex items-center justify-center px-5 py-2 mb-8 text-sm font-bold text-gray-900 bg-white/40 backdrop-blur-xl border border-white/60 rounded-full shadow-lg shadow-black/5 hover:scale-105 transition-transform cursor-pointer">
            <span className="flex h-3 w-3 relative mr-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-prosur-red opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-prosur-red"></span>
            </span>
            Reto de IA Oficial 2026
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 tracking-tighter mb-8 leading-[1.1]">
            Del concepto al <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-prosur-red via-red-500 to-orange-500">
              impacto real.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            No buscamos solo ideas. Buscamos soluciones automatizadas que <strong className="text-gray-900 font-semibold">ya funcionen</strong> y generen valor medible para Grupo Prosur.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full">
            <a 
              href="#registro" 
              className="group w-full sm:w-auto inline-flex justify-center items-center px-10 py-4 text-lg font-bold rounded-2xl text-white bg-gray-900 hover:bg-black focus:outline-none focus:ring-4 focus:ring-gray-900/30 shadow-2xl shadow-gray-900/20 transition-all hover:-translate-y-1"
            >
              <Sparkles className="mr-3 w-5 h-5 text-prosur-red group-hover:animate-pulse" aria-hidden="true" />
              Inscribir mi Proyecto
            </a>
            <a 
              href="#reglas" 
              className="group w-full sm:w-auto inline-flex justify-center items-center px-10 py-4 border-2 border-gray-200 text-lg font-bold rounded-2xl text-gray-700 bg-white/30 hover:bg-white backdrop-blur-md hover:border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-200 transition-all hover:-translate-y-1 shadow-lg shadow-black/5"
            >
              Conocer las bases
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </a>
          </div>

          <div className="mt-20 flex flex-wrap justify-center gap-8 text-gray-400 font-medium text-sm tracking-widest uppercase">
            <span>5 Categorías</span>
            <span className="hidden sm:inline">•</span>
            <span>5 Pilares</span>
            <span className="hidden sm:inline">•</span>
            <span>100 Puntos</span>
          </div>

        </div>
      </div>
    </section>
  );
}