import React from 'react';
import { Rocket, CheckCircle2, Trophy } from 'lucide-react';

export default function Timeline() {
  const events = [
    {
      date: "Por definir",
      title: "Fase 1: Lanzamiento",
      subtitle: "Convocatoria e Inscripción",
      icon: <Rocket className="w-6 h-6 text-white" aria-hidden="true" />,
      color: "bg-gray-800"
    },
    {
      date: "Por definir",
      title: "Fase 2: Validación",
      subtitle: "Admisibilidad, Mentoría y Auditoría de evidencia",
      icon: <CheckCircle2 className="w-6 h-6 text-white" aria-hidden="true" />,
      color: "bg-prosur-red"
    },
    {
      date: "Por definir",
      title: "Fase 3: Cierre",
      subtitle: "Presentación final (Pitch + Demo) y Premiación",
      icon: <Trophy className="w-6 h-6 text-white" aria-hidden="true" />,
      color: "bg-gray-800"
    }
  ];

  return (
    <section id="cronograma" className="py-20 bg-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Etapas del Proceso</h2>
          <p className="text-xl text-gray-600">Pronto se anunciarán las fechas oficiales. ¡Prepárate!</p>
        </div>

        <div className="relative">
          {/* Desktop horizontal line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2" aria-hidden="true"></div>
          
          {/* Mobile vertical line */}
          <div className="md:hidden absolute top-0 left-8 w-1 h-full bg-gray-200" aria-hidden="true"></div>

          <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-4 relative z-10">
            {events.map((event, index) => (
              <div key={index} className="flex md:flex-col items-center md:text-center relative group flex-1">
                <div className={`flex-shrink-0 w-16 h-16 rounded-full ${event.color} flex items-center justify-center shadow-lg border-4 border-white/80 z-10 transition-transform group-hover:scale-110`}>
                  {event.icon}
                </div>
                <div className="ml-6 md:ml-0 md:mt-8 bg-white/60 backdrop-blur-sm md:bg-transparent p-5 md:p-0 rounded-2xl shadow-sm md:shadow-none border border-gray-100 md:border-none w-full">
                  <div className="inline-block px-3 py-1 mb-3 text-sm font-bold text-prosur-red bg-red-50 rounded-full border border-red-100">
                    {event.date}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                  <p className="text-gray-600 font-medium">{event.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}