import React from 'react';
import { Calendar, Flag, Presentation } from 'lucide-react';

export default function Timeline() {
  const events = [
    {
      date: "Hoy",
      title: "Apertura de registros",
      icon: <Calendar className="w-6 h-6 text-white" aria-hidden="true" />,
      color: "bg-gray-800"
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
    <section id="cronograma" className="py-20 bg-transparent">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Cronograma</h2>
          <p className="text-lg text-prosur-gray">Fechas importantes que no debes dejar pasar.</p>
        </div>

        <div className="relative">
          {/* Desktop horizontal line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gray-300/50 -translate-y-1/2" aria-hidden="true"></div>
          
          {/* Mobile vertical line */}
          <div className="md:hidden absolute top-0 left-8 w-1 h-full bg-gray-300/50" aria-hidden="true"></div>

          <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-4 relative z-10">
            {events.map((event, index) => (
              <div key={index} className="flex md:flex-col items-center md:text-center relative group">
                <div className={`flex-shrink-0 w-16 h-16 rounded-full ${event.color} flex items-center justify-center shadow-lg border-4 border-white/80 z-10 transition-transform group-hover:scale-110`}>
                  {event.icon}
                </div>
                <div className="ml-6 md:ml-0 md:mt-6 bg-white/90 backdrop-blur-sm md:bg-transparent p-4 md:p-0 rounded-lg shadow-sm md:shadow-none border border-gray-100 md:border-none flex-1">
                  <h3 className="text-xl font-bold text-prosur-red mb-1">{event.date}</h3>
                  <p className="text-gray-800 font-medium">{event.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Agenda tu sesión banner */}
        <div className="mt-16 bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-gray-200/60 shadow-lg max-w-3xl mx-auto text-center hover:shadow-xl transition-all">
          <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-2">
            <span className="text-prosur-red">📅</span> Agenda tu sesión de Demo
          </h3>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto text-sm md:text-base">
            Las sesiones de demostración (Demo Day) comenzarán a partir del <strong>30 de Julio</strong>. Organízate con tu equipo y agenda tu espacio de 30 minutos para presentar tus avances y la eficiencia operativa lograda.
          </p>
          <a
            href="https://calendly.com/gerencia-mejoracontinua-prosur/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-3.5 border border-transparent text-base font-semibold rounded-lg text-white bg-prosur-red hover:bg-red-700 shadow-md hover:shadow-lg transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-prosur-red"
          >
            Agendar demo en Calendly
          </a>
        </div>
      </div>
    </section>
  );
}