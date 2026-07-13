import React from 'react';
import { Rocket, ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative bg-transparent overflow-hidden pt-20 pb-24 lg:pt-28 lg:pb-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Custom Capsule Badge */}
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-8 text-xs sm:text-sm font-bold text-prosur-red bg-red-500/10 border border-prosur-red/20 rounded-full shadow-sm backdrop-blur-md animate-pulse">
            <Rocket className="w-4 h-4 mr-2 text-prosur-red" aria-hidden="true" />
            Concurso Interno 2026
          </div>
          
          {/* Animated Premium Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-950 tracking-tight mb-8 leading-[1.1] sm:leading-tight">
            Reto de Inteligencia Artificial para la <span className="bg-clip-text text-transparent bg-gradient-to-r from-prosur-red via-red-600 to-orange-500 drop-shadow-xs">Eficiencia Operativa</span>
          </h1>
          
          <p className="text-lg md:text-xl text-prosur-gray mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
            Transforma tu área de trabajo, haz tus tareas más fáciles y gana increíbles premios. 
            <strong className="text-gray-900 font-bold block mt-3 text-base sm:text-lg">
              🚀 ¡Participan todas las empresas de Grupo Prosur!
            </strong>
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <a 
              href="#registro" 
              className="w-full sm:w-auto inline-flex justify-center items-center px-8 py-4 border border-transparent text-base font-bold rounded-xl text-white bg-gradient-to-r from-prosur-red to-red-700 hover:from-red-600 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-prosur-red shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-[0.98] duration-200"
            >
              Registrar alcance
              <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
            </a>
            <a 
              href="#reglas" 
              className="w-full sm:w-auto inline-flex justify-center items-center px-8 py-4 border-2 border-gray-250 text-base font-bold rounded-xl text-gray-700 bg-white/70 backdrop-blur-md hover:text-gray-950 hover:border-gray-400 hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-prosur-gray transition-all shadow-sm hover:scale-105 active:scale-[0.98] duration-200"
            >
              Conocer el reto
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}