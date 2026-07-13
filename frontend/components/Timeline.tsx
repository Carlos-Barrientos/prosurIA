import React from 'react';
import { Calendar, Flag, Presentation, BookOpen } from 'lucide-react';

export default function Timeline() {
  const events = [
    {
      date: "Registro Cerrado",
      title: "La inscripción de nuevos equipos ha finalizado",
      icon: <Calendar className="w-6 h-6 text-white" aria-hidden="true" />,
      color: "bg-gray-400"
    },
    {
      date: "17 de Julio",
      title: "Curso / Taller de IA (Capacitación general)",
      icon: <BookOpen className="w-6 h-6 text-white" aria-hidden="true" />,
      color: "bg-blue-600"
    },
    {
      date: "23 de Julio",
      title: "Límite para entregar el Alcance del Proyecto",
      icon: <Flag className="w-6 h-6 text-white" aria-hidden="true" />,
      color: "bg-prosur-gray"
    },
    {
      date: "30 de Julio",
      title: "Gran Cierre y Demo Day",
      icon: <Presentation className="w-6 h-6 text-white" aria-hidden="true" />,
      color: "bg-prosur-red"
    }
  ];

  return (
    <section id="cronograma" className="py-24 bg-transparent relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 mb-4 tracking-tight">Cronograma</h2>
          <p className="text-base sm:text-lg text-prosur-gray font-medium">Fechas clave de capacitación, alcance y la gran sesión final.</p>
        </div>

        <div className="relative">
          {/* Desktop horizontal connection line - precisely aligned with center of circles */}
          <div className="hidden md:block absolute top-[32px] left-0 w-full h-[3px] bg-gradient-to-r from-gray-200 via-prosur-red/30 to-prosur-red/80 z-0" aria-hidden="true"></div>
          
          {/* Mobile vertical connection line */}
          <div className="md:hidden absolute top-0 left-8 w-[3px] h-full bg-gradient-to-b from-gray-200 via-prosur-red/30 to-prosur-red/80 z-0" aria-hidden="true"></div>

          <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-4 relative z-10">
            {events.map((event, index) => (
              <div key={index} className="flex md:flex-col items-center md:text-center relative group flex-1">
                <div className={`flex-shrink-0 w-16 h-16 rounded-full ${event.color} flex items-center justify-center shadow-lg border-4 border-white z-10 transition-all duration-300 group-hover:scale-110 group-hover:shadow-red-500/20`}>
                  {event.icon}
                </div>
                <div className="ml-6 md:ml-0 md:mt-6 bg-white/70 backdrop-blur-md md:bg-transparent p-5 md:p-3 rounded-2xl shadow-sm md:shadow-none border border-gray-200/50 md:border-none flex-1 transition-all duration-350 hover:bg-white/90 md:hover:bg-transparent">
                  <h3 className="text-base sm:text-lg font-black text-prosur-red mb-1.5 uppercase tracking-wider">{event.date}</h3>
                  <p className="text-gray-950 font-bold leading-snug text-sm sm:text-base">{event.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}