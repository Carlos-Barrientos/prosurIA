import React from 'react';

export default function Tips() {
  const tips = [
    {
      number: "1",
      title: "Identifica el problema real",
      description: "Antes de pensar en la Inteligencia Artificial, entiende bien cómo hacen la tarea hoy."
    },
    {
      number: "2",
      title: "Imagina la solución ideal",
      description: "Piensa en cómo hacer la tarea más fácil y con menos pasos."
    },
    {
      number: "3",
      title: "Crea una primera versión",
      description: "Concéntrate en resolver solo la parte más difícil o tardada del problema."
    },
    {
      number: "4",
      title: "Haz pruebas y mejora",
      description: "Haz que tus compañeros lo prueben antes del 23 de Julio."
    }
  ];

  return (
    <section className="py-24 bg-white/60 backdrop-blur-lg border-y border-white/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 mb-4 tracking-tight">Tips para el Éxito</h2>
          <p className="text-base sm:text-lg text-prosur-gray max-w-2xl mx-auto font-medium">
            Sigue estas recomendaciones para estructurar tu proyecto y maximizar tus posibilidades de ganar.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tips.map((tip, index) => (
            <div key={index} className="relative bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-gray-200/60 pt-12 mt-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className="absolute -top-6 left-6 w-12 h-12 bg-gradient-to-br from-prosur-red to-red-700 text-white rounded-full flex items-center justify-center text-xl font-black shadow-md border-4 border-white">
                {tip.number}
              </div>
              <h3 className="text-lg font-bold text-gray-950 mb-2 leading-snug">{tip.title}</h3>
              <p className="text-sm text-prosur-gray font-medium leading-relaxed">{tip.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}