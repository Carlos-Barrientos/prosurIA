import React from 'react';
import { Target, Users, ShieldCheck, FileDown, BrainCircuit } from 'lucide-react';

export default function Rules() {
  const rules = [
    {
      icon: <Users className="w-6 h-6 text-prosur-red" aria-hidden="true" />,
      title: "Participación de todo el Grupo",
      description: "Abierto al talento de todas las empresas, marcas y áreas. Se promueven equipos multidisciplinarios con colaboración entre operación, negocio y TI."
    },
    {
      icon: <Target className="w-6 h-6 text-prosur-red" aria-hidden="true" />,
      title: "Impacto probado, no ideas",
      description: "Solo participan soluciones que YA funcionan en un proceso real y generan ahorro verificable. No califican conceptos ni prototipos aislados."
    },
    {
      icon: <BrainCircuit className="w-6 h-6 text-prosur-red" aria-hidden="true" />,
      title: "Uso de IA responsable",
      description: "Es obligatorio el uso de IA o automatización sustantiva. Queda estrictamente prohibido usar datos, cuentas, APIs o herramientas no autorizadas."
    }
  ];

  return (
    <section id="reglas" className="py-20 bg-white/60 backdrop-blur-lg border-y border-white/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Reglas Clave</h2>
          <p className="text-lg text-prosur-gray max-w-2xl mx-auto">
            La admisibilidad es un filtro: cumplir todo o quedar fuera. Conoce las bases para competir en las 5 categorías oficiales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {rules.map((rule, index) => (
            <div key={index} className="bg-white/80 rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-lg hover:border-red-100 transition-all">
              <div className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center mb-6 border border-red-100 shadow-inner">
                {rule.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{rule.title}</h3>
              <p className="text-gray-600 leading-relaxed font-medium">{rule.description}</p>
            </div>
          ))}
        </div>

        {/* Botón para descargar bases */}
        <div className="mt-16 text-center">
          <a 
            href="./Base_IA_Grupo_Prosur.pdf" 
            download="Base_IA_Grupo_Prosur.pdf"
            className="inline-flex justify-center items-center px-8 py-4 border border-transparent text-lg font-bold rounded-xl text-white bg-prosur-red hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-200 shadow-xl shadow-red-600/20 transition-all hover:-translate-y-1"
          >
            <FileDown className="mr-2 w-6 h-6" aria-hidden="true" />
            Descargar Convocatoria Oficial (PDF)
          </a>
          <p className="mt-4 text-sm text-prosur-gray font-medium">Revisa el Anexo A y B para conocer la Scorecard y entregables mínimos.</p>
        </div>
      </div>
    </section>
  );
}
