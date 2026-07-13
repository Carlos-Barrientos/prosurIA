import React from 'react';
import { Trophy, Medal, Sparkles } from 'lucide-react';

export default function Prizes() {
  return (
    <section id="premios" className="py-24 bg-transparent relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full bg-red-500/5 blur-[120px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 mb-4 tracking-tight">
            Premios de Innovación
          </h2>
          <p className="text-base sm:text-lg text-prosur-gray max-w-2xl mx-auto font-medium">
            Reconocemos el esfuerzo y el impacto. Estos son los premios para los equipos que logren transformar la eficiencia en sus áreas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-5xl mx-auto">
          {/* 2nd Place */}
          <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-md hover:shadow-lg border border-gray-200/60 p-8 text-center transform transition-all duration-350 hover:-translate-y-2 hover:bg-white/90 order-2 md:order-1">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 border border-slate-200/50 mb-6 shadow-xs">
              <Medal className="w-8 h-8 text-slate-400" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">2do Lugar</h3>
            <p className="text-3xl font-extrabold text-slate-600 bg-clip-text bg-gradient-to-r from-slate-600 to-slate-800">$10,000 <span className="text-base font-semibold">MXN</span></p>
            <span className="inline-block mt-3 text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-100 px-2.5 py-0.5 rounded-full">Plata</span>
          </div>

          {/* 1st Place - Golden Glow */}
          <div className="bg-gradient-to-b from-white/95 to-red-50/20 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl border-2 border-amber-500/50 p-10 text-center transform transition-all duration-350 hover:-translate-y-3 relative order-1 md:order-2 z-10 overflow-hidden group">
            {/* Top border shine */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-400 via-red-500 to-amber-400"></div>
            
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-amber-500 to-red-600 text-white px-5 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-md">
              Gran Ganador
            </div>
            
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6 shadow-md relative">
              <Trophy className="w-10 h-10 text-amber-500" aria-hidden="true" />
              <Sparkles className="w-5 h-5 text-amber-400 absolute top-1 right-1 animate-pulse" />
            </div>
            
            <h3 className="text-2xl font-extrabold text-gray-950 mb-2">1er Lugar</h3>
            <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-red-500 to-amber-600">$15,000 <span className="text-xl font-bold text-amber-600">MXN</span></p>
            <span className="inline-block mt-3.5 text-xs font-bold text-amber-700 uppercase tracking-wider bg-amber-100 px-3 py-1 rounded-full border border-amber-200/50 shadow-2xs">Oro & Reconocimiento</span>
          </div>

          {/* 3rd Place */}
          <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-md hover:shadow-lg border border-gray-200/60 p-8 text-center transform transition-all duration-350 hover:-translate-y-2 hover:bg-white/90 order-3">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100/40 border border-amber-200/30 mb-6 shadow-xs">
              <Medal className="w-8 h-8 text-amber-600/80" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">3er Lugar</h3>
            <p className="text-3xl font-extrabold text-amber-700 bg-clip-text bg-gradient-to-r from-amber-700 to-amber-900">$5,000 <span className="text-base font-semibold">MXN</span></p>
            <span className="inline-block mt-3 text-xs font-semibold text-amber-700 uppercase tracking-wider bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-100">Bronce</span>
          </div>
        </div>
      </div>
    </section>
  );
}