import React, { useState, useEffect } from 'react';
import { Clock, Calendar, User, RefreshCw, BookOpen, ArrowLeft, CheckCircle, BrainCircuit, Sparkles, ArrowRight } from 'lucide-react';

interface Article {
  id: number;
  title: string;
  category: string;
  summary: string;
  content: string;
  keyPoints: string[];
  impact: string;
  author: string;
  readTime: string;
  date: string;
}

// Unsplash images matching the abstract tech/neural style
const articleImages = [
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80', // Digital globe / sphere network
  'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80', // Colorful brain outline tech
  'https://images.unsplash.com/photo-1618005198143-e5283b519a7f?auto=format&fit=crop&w=600&q=80', // Abstract digital organic textures
  'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=600&q=80', // Neural grid / abstract network
  'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80', // Coder analytics tech
];

const INITIAL_ARTICLES: Article[] = [
  {
    id: 1,
    title: "Gemini 3.6 y la Nueva Era de Notebooks Interactivos de IA",
    category: "Modelos de Lenguaje & Analytics",
    summary: "Google presenta Gemini 3.6 integrado nativamente en Jupyter y Colab Notebooks, ofreciendo ejecución de código asistida, magics SQL/Python de BigQuery y generación de gráficos en tiempo real.",
    content: "Gemini 3.6 transforma la experiencia de análisis de datos y desarrollo de notebooks corporativos. Con la integración de comandos magics de nivel superior (como %bqsql y %ai), los analistas de datos y desarrolladores pueden consultar millones de registros de BigQuery mediante lenguaje natural y recibir gráficos interactivos listos para producción sin redactar código repetitivo.\n\nLa versión 3.6 introduce autorreparación automática de errores de sintaxis en celdas de Jupyter, análisis predictivo contextualizado al esquema de las tablas y redacción automática de resúmenes ejecutivos en Markdown. Esta evolución convierte a los cuadernos digitales en asistentes analíticos completos.",
    keyPoints: [
      "Integración nativa de Gemini 3.6 en Jupyter y Google Colab con soporte para comandos magics %bqsql.",
      "Autorreparación de código y sugerencias analíticas adaptadas al esquema de datos en tiempo real.",
      "Generación instantánea de dashboards y reportes ejecutivos directamente dentro del notebook."
    ],
    impact: "Aumento de más del 70% en la velocidad de exploración de datos y toma de decisiones analíticas para equipos de inteligencia de negocios.",
    author: "Comité de Innovación Prosur",
    readTime: "4 min de lectura",
    date: "23 de julio, 2026"
  },
  {
    id: 2,
    title: "GPT Sol, Terra y Luna: La Nueva Tríada Especializada de OpenAI",
    category: "Modelos de Lenguaje",
    summary: "OpenAI diversifica su ecosistema presentando GPT Sol (razonamiento lógico profundo), GPT Terra (visión de entorno y análisis de documentos) y GPT Luna (eficiencia extrema y respuesta ultrarrápida).",
    content: "OpenAI revoluciona su arquitectura de modelos presentando tres variantes especializadas diseñadas para cubrir distintos requerimientos empresariales. **GPT Sol** está optimizado para razonamiento matemático complejo, programación avanzada y arquitectura de sistemas de gran escala.\n\nPor su parte, **GPT Terra** se enfoca en visión por computadora, interpretación de diagramas técnicos, mapas y documentos escaneados. Finalmente, **GPT Luna** es un modelo ultra liviano diseñado para agentes de voz en tiempo real con latencia inferior a 100 ms, facilitando la atención al cliente automatizada e interactiva.",
    keyPoints: [
      "GPT Sol: potencia de cómputo y razonamiento avanzado para lógica compleja y desarrollo de código.",
      "GPT Terra: especialización multimodal para lectura de planos, visión geoespacial y documentos.",
      "GPT Luna: modelo ultrarrápido y liviano para experiencias conversacionales de voz en tiempo real."
    ],
    impact: "Permite seleccionar el modelo de IA idóneo según la prioridad de costo, latencia o complejidad técnica del proceso corporativo.",
    author: "División de TI Prosur",
    readTime: "5 min de lectura",
    date: "23 de julio, 2026"
  },
  {
    id: 3,
    title: "Fable 5: Motor de Simulación Narrativa y Agentes Autónomos",
    category: "Diseño y Creatividad",
    summary: "Se lanza Fable 5, la plataforma de IA capaz de simular universos narrativos, personajes virtuales interactivos con memoria a largo plazo y generación multimedia en tiempo real.",
    content: "Fable 5 establece un nuevo estándar en la simulación narrativa e interacción humana con IA. A diferencia de los generadores de contenido tradicionales, Fable 5 crea agentes virtuales con personalidades consistentes, memoria afectiva a largo plazo y capacidad de responder adaptativamente.\n\nEmpresas de capacitación y comunicación interna están utilizando Fable 5 para simulaciones inmersivas de atención al cliente, entrenando colaboradores frente a avatares virtuales que reaccionan con diferentes niveles de exigencia y empatía según el desenvolvimiento de la sesión.",
    keyPoints: [
      "Simulación de personajes interactivos con memoria persistente y coherencia de comportamiento.",
      "Generación simultánea de diálogos, expresiones de voz y secuencias de video responsivas.",
      "Aplicación directa en entornos de capacitación inmersiva de personal y desarrollo creativo."
    ],
    impact: "Transformación de los entrenamientos de servicio y ventas mediante simulaciones virtuales interactivas de alta fidelidad.",
    author: "Área de Capacitación y Talento Prosur",
    readTime: "4 min de lectura",
    date: "23 de julio, 2026"
  },
  {
    id: 4,
    title: "Agentes Autónomos en Procesos de Manufactura y Logística",
    category: "Agentes de Software",
    summary: "Los agentes basados en LLMs están automatizando flujos de trabajo complejos de compras y control de calidad corporativos, integrándose con ERPs locales.",
    content: "La adopción de agentes autónomos inteligentes está marcando el inicio de una nueva era industrial. A diferencia de las automatizaciones rígidas del pasado, estos agentes interpretan correos de clientes, verifican stock en tiempo real y toman decisiones adaptativas sobre compras de repuestos.\n\nEn operaciones logísticas complejas, los agentes coordinan dinámicamente con transportistas ante demoras climáticas, negociando alternativas basadas en costo e historial de entregas. Su capacidad de interactuar mediante APIs con ERPs existentes reduce procesos administrativos que tomaban días a solo minutos, eliminando el error humano de transcripción.",
    keyPoints: [
      "Interoperabilidad fluida con ERPs y bases de datos heredadas mediante APIs.",
      "Toma de decisiones lógicas basadas en variables dinámicas de precio y stock.",
      "Reducción demostrada de un 35% en tiempos de gestión operativa inicial."
    ],
    impact: "Se prevé que el 65% de las grandes manufactureras desplieguen agentes autónomos integrados en compras y planeamiento de insumos para el cierre de 2027.",
    author: "Comité de Innovación Prosur",
    readTime: "5 min de lectura",
    date: "23 de julio, 2026"
  },
  {
    id: 5,
    title: "Modelos Locales Eficientes (Edge AI) para Privacidad Absoluta",
    category: "IA en Negocios",
    summary: "Los nuevos Small Language Models (SLMs) ejecutables localmente abren la puerta a la adopción de IA corporativa sin exponer propiedad intelectual.",
    content: "La seguridad de los datos es el reto principal al incorporar IA en procesos clave. Los modelos de lenguaje pequeños (SLMs) ofrecen una solución a esta problemática, pues pueden ejecutarse en servidores locales corporativos o incluso computadoras de escritorio modernas con NPUs integradas.\n\nEste esquema evita el envío de información confidencial de clientes o finanzas a servidores en la nube de terceros. Su precisión en tareas enfocadas, como auditoría de contratos, análisis de nóminas y resúmenes de minutas internas, ya rivaliza con modelos comerciales gigantescos a una fracción del costo operativo.",
    keyPoints: [
      "Cumplimiento garantizado al procesar información confidencial in-house.",
      "Costos de infraestructura fijos y predecibles, eliminando tarifas por token.",
      "Optimización específica del modelo para terminología técnica de la empresa."
    ],
    impact: "Aumento drástico en la demanda de hardware de cómputo local con aceleración de IA dedicada y despliegues aislados en redes internas seguras.",
    author: "Área de Ciberseguridad Prosur",
    readTime: "4 min de lectura",
    date: "23 de julio, 2026"
  },
  {
    id: 6,
    title: "Generadores de Código e Interfaces de Usuario Express",
    category: "Productividad",
    summary: "Plataformas de programación generativa permiten a equipos de negocio crear herramientas internas personalizadas en horas en lugar de meses.",
    content: "El desarrollo de herramientas departamentales está viviendo un cambio fundamental. Gracias a generadores de UI impulsados por IA, analistas de negocio y coordinadores pueden estructurar dashboards, formularios de registro y gestores de solicitudes escribiendo simplemente lo que necesitan en español.\n\nEstas aplicaciones se configuran visualmente siguiendo paletas de colores corporativas y esquemas estándar. Esto reduce drásticamente el tiempo de desarrollo (backlog) de los equipos de tecnología, permitiendo un prototipado veloz y adaptativo a los requerimientos de la operación diaria.",
    keyPoints: [
      "Desarrollo ágil de soluciones departamentales a partir de lenguaje natural.",
      "Reducción del 50% en solicitudes menores de soporte y desarrollo a TI.",
      "Creación de interfaces web responsive y funcionales listas para uso interno."
    ],
    impact: "El empoderamiento de usuarios no técnicos (citizen developers) liderará la optimización de procesos pequeños pero críticos en las unidades de negocio.",
    author: "División de TI Prosur",
    readTime: "3 min de lectura",
    date: "23 de julio, 2026"
  }
];

export default function Blog() {
  const [articles, setArticles] = useState<Article[]>(INITIAL_ARTICLES);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [activeCategory, setActiveCategory] = useState('Todos');

  const fetchTrends = async (force = false) => {
    if (force) setRefreshing(true);
    
    setError(null);
    try {
      const url = force ? '/api/trends/refresh' : '/api/trends';
      const method = force ? 'POST' : 'GET';
      const response = await fetch(url, { method });
      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status}`);
      }
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        setArticles(data);
      }
    } catch (err: any) {
      console.error("Error fetching AI trends:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTrends();
  }, []);

  const categories = ['Todos', ...Array.from(new Set(articles.map(a => a.category)))];

  const filteredArticles = activeCategory === 'Todos'
    ? articles
    : articles.filter(a => a.category === activeCategory);

  const featuredArticle = activeCategory === 'Todos' && filteredArticles.length > 0 ? filteredArticles[0] : null;
  const displayArticles = featuredArticle ? filteredArticles.slice(1) : filteredArticles;

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex-grow w-full relative">
      {/* Header section (Glassmorphism layout) */}
      <div className="flex flex-col md:flex-row justify-between items-stretch mb-12 gap-8 bg-white/30 backdrop-blur-xl rounded-[32px] p-6 sm:p-8 border border-white/40 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#7C3AED]/5 to-transparent rounded-bl-full pointer-events-none"></div>
        <div className="flex-1 flex flex-col justify-center relative z-10">
          <div className="flex items-center gap-2 mb-4 text-[#7C3AED] font-black uppercase tracking-wider text-xs bg-[#7C3AED]/10 px-3 py-1 rounded-full w-fit">
            <BrainCircuit className="w-4 h-4 animate-pulse" />
            <span>Tendencias de IA</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight leading-tight">
            IA aplicada a negocios
          </h1>
          <p className="text-gray-600 mt-4 text-sm sm:text-base leading-relaxed max-w-2xl">
            Descubre cómo la IA está transformando el trabajo, las empresas y las profesiones. Aquí encontrarás guías prácticas, ejemplos reales, tendencias y recursos para aprender a utilizar la Inteligencia Artificial en tu día a día.
          </p>
          
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={() => fetchTrends(true)}
              disabled={loading || refreshing}
              className="flex items-center gap-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-black px-6 py-3 rounded-2xl shadow-lg shadow-[#7C3AED]/20 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              <RefreshCw className={`w-4.5 h-4.5 text-white ${refreshing ? 'animate-spin' : ''}`} />
              {refreshing ? 'Actualizando tendencias...' : 'Refrescar tendencias'}
            </button>
            
            {/* Auto-update status banner */}
            <div className="flex items-center gap-2 text-xs font-semibold text-green-700 bg-green-50/80 border border-green-200/50 rounded-2xl px-4 py-2.5 shadow-3xs w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span>Alimentado por Gemini. Actualizado cada 24h</span>
            </div>
          </div>
        </div>

        {/* Right illustrative image matching Image 1 */}
        <div className="hidden md:flex md:w-[35%] shrink-0 items-center justify-center relative">
          <div className="w-full h-52 sm:h-60 rounded-3xl overflow-hidden shadow-lg border border-white/50">
            <img 
              src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=600&q=80" 
              alt="IA aplicada a negocios" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>

      {/* Categories Filter */}
      {!loading && !error && articles.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10 animate-fade-in" role="tablist" aria-label="Categorías de blog">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              role="tab"
              aria-selected={activeCategory === category}
              className={`px-5 py-2.5 rounded-2xl text-xs font-black border transition duration-150 focus:outline-none focus:ring-2 focus:ring-[#7C3AED] ${
                activeCategory === category
                  ? 'bg-[#7C3AED] text-white border-[#7C3AED] shadow-md shadow-[#7C3AED]/20'
                  : 'bg-white/60 text-gray-600 border-gray-250/50 hover:bg-white backdrop-blur-md'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-24">
          <RefreshCw className="w-12 h-12 text-[#7C3AED] animate-spin mb-4" />
          <p className="text-gray-505 font-bold animate-pulse">Analizando la red y sintetizando tendencias con Gemini...</p>
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div className="bg-red-50 border border-red-205 rounded-3xl p-6 text-center max-w-xl mx-auto my-12 shadow-sm">
          <p className="text-red-700 font-extrabold text-lg mb-2">¡Ups! Algo salió mal</p>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => fetchTrends(false)}
            className="inline-flex items-center gap-2 bg-[#7C3AED] text-white px-5 py-2.5 rounded-xl font-bold shadow-md shadow-[#7C3AED]/20 hover:bg-[#6D28D9] transition"
          >
            Reintentar
          </button>
        </div>
      )}

      {/* Articles Section */}
      {!loading && !error && (
        filteredArticles.length === 0 ? (
          <div className="text-center py-20 bg-white/40 border border-white/50 backdrop-blur-md rounded-3xl shadow-sm">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No se encontraron artículos en esta categoría.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {/* 1. Featured Article (Full-width Layout) */}
            {featuredArticle && (
              <div 
                onClick={() => setSelectedArticle(featuredArticle)}
                className="group cursor-pointer bg-white/40 hover:bg-white/70 backdrop-blur-md rounded-[32px] p-6 sm:p-8 border border-white/50 hover:border-[#7C3AED]/25 shadow-lg hover:shadow-2xl hover:shadow-[#7C3AED]/5 transition-all duration-500 transform hover:-translate-y-1.5 flex flex-col lg:flex-row gap-8 overflow-hidden relative"
              >
                <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-1 px-3 py-1.5 bg-[#7C3AED] text-white text-[10px] font-black rounded-lg uppercase tracking-wider shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  Destacado del Día
                </div>
                
                {/* Image side */}
                <div className="w-full lg:w-5/12 h-64 lg:h-80 rounded-2xl overflow-hidden border border-gray-100/50 bg-gray-50 relative shrink-0">
                  <img 
                    src={articleImages[0]} 
                    alt={featuredArticle.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                
                {/* Content side */}
                <div className="flex-grow flex flex-col justify-between py-2">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="inline-block bg-[#7C3AED]/10 text-[#7C3AED] text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider">
                        {featuredArticle.category}
                      </span>
                      <span className="text-xs text-gray-400 font-bold">•</span>
                      <span className="text-xs text-gray-500 font-bold">{featuredArticle.date}</span>
                    </div>
                    
                    <h2 className="text-2xl sm:text-3.5xl font-black text-gray-900 group-hover:text-[#7C3AED] transition-colors mb-4 leading-tight">
                      {featuredArticle.title}
                    </h2>
                    
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                      {featuredArticle.summary}
                    </p>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-150/40 flex justify-between items-center text-xs text-gray-500">
                    <span className="flex items-center gap-2 font-bold text-gray-700">
                      <span className="w-6.5 h-6.5 rounded-full bg-violet-100 border border-violet-200 text-[#7C3AED] flex items-center justify-center font-black text-[10px] uppercase">
                        {featuredArticle.author.charAt(0)}
                      </span>
                      {featuredArticle.author}
                    </span>
                    <span className="flex items-center gap-5">
                      <span className="flex items-center gap-1 font-semibold text-gray-450">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        {featuredArticle.readTime}
                      </span>
                      <span className="text-[#7C3AED] font-black group-hover:translate-x-1.5 transition-transform duration-300 flex items-center gap-1">
                        Leer análisis completo <ArrowRight className="w-4 h-4" />
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* 2. Grid for the Rest of the Articles */}
            {displayArticles.length > 0 && (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 animate-fade-in">
                {displayArticles.map((article, idx) => {
                  // Adjust image index to maintain visual offset
                  const imageIdx = (idx + (featuredArticle ? 1 : 0)) % articleImages.length;
                  const cardImage = articleImages[imageIdx];
                  
                  return (
                    <article
                      key={article.id}
                      onClick={() => setSelectedArticle(article)}
                      className="group flex flex-col bg-white/50 border border-white/50 hover:bg-white backdrop-blur-md rounded-3xl shadow-md hover:shadow-2xl hover:shadow-violet-500/5 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer overflow-hidden relative"
                    >
                      {/* Top card image */}
                      <div className="h-48 sm:h-52 w-full overflow-hidden relative border-b border-gray-100/50 bg-gray-50">
                        <img 
                          src={cardImage} 
                          alt={article.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>

                      <div className="p-6 flex-grow flex flex-col justify-between">
                        <div>
                          {/* Three dot indicators and date */}
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-1.5" title={`Categoría: ${article.category}`}>
                              {/* Dot 1: Active purple */}
                              <span className="h-2.5 w-2.5 rounded-full bg-[#7C3AED]" />
                              {/* Dot 2: Lavender */}
                              <span className="h-2.5 w-2.5 rounded-full bg-[#DDD6FE]" />
                              {/* Dot 3: Light gray */}
                              <span className="h-2.5 w-2.5 rounded-full bg-[#F3F4F6]" />
                              
                              <span className="text-[10px] font-black text-gray-400 ml-1.5 uppercase tracking-wide">
                                {article.category}
                              </span>
                            </div>
                            
                            <span className="text-xs font-semibold text-gray-500">
                              {article.date}
                            </span>
                          </div>
                          
                          {/* Title */}
                          <h3 className="text-lg font-black text-gray-900 group-hover:text-[#7C3AED] transition-colors mb-3 line-clamp-2 leading-snug">
                            {article.title}
                          </h3>
                          
                          <p className="text-gray-500 text-xs sm:text-sm mb-6 line-clamp-3 leading-relaxed">
                            {article.summary}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-gray-100/50 flex justify-between items-center text-xs text-gray-400">
                          <span className="flex items-center gap-1.5 font-bold text-gray-600">
                            <User className="w-3.5 h-3.5 text-gray-400" />
                            {article.author}
                          </span>
                          <span className="flex items-center gap-1 font-semibold">
                            <Clock className="w-3.5 h-3.5 text-gray-400" />
                            {article.readTime}
                          </span>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        )
      )}

      {/* Article details modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true" onClick={() => setSelectedArticle(null)}>
          <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-4xl max-h-[85vh] overflow-hidden flex flex-col relative animate-in fade-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="p-6 sm:p-8 border-b border-gray-100 bg-gradient-to-r from-violet-50/30 via-white to-transparent flex justify-between items-start">
              <div className="w-full">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="flex items-center gap-1.5 text-xs text-gray-405 hover:text-[#7C3AED] font-bold mb-4 transition"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Volver a tendencias
                </button>
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <span className="inline-block bg-[#7C3AED]/10 text-[#7C3AED] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                    {selectedArticle.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-400 font-semibold">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    {selectedArticle.readTime}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-400 font-semibold">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    {selectedArticle.date}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3.5xl font-black text-gray-900 leading-tight">
                  {selectedArticle.title}
                </h2>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-grow">
              {/* Detailed Content */}
              <div className="prose max-w-none text-gray-650 leading-relaxed text-sm sm:text-base space-y-6">
                {selectedArticle.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="whitespace-pre-line">{paragraph}</p>
                ))}
              </div>

              {/* Key points (Modernized) */}
              {selectedArticle.keyPoints && selectedArticle.keyPoints.length > 0 && (
                <div className="bg-gradient-to-br from-violet-50/50 to-white/30 backdrop-blur-md rounded-2xl p-6 border border-violet-100/60 shadow-xs">
                  <h4 className="font-black text-gray-900 text-sm sm:text-base mb-4 flex items-center gap-2 uppercase tracking-wider text-[#7C3AED]">
                    <CheckCircle className="w-5 h-5 text-[#7C3AED]" />
                    Puntos clave a considerar
                  </h4>
                  <ul className="grid gap-4 sm:grid-cols-3">
                    {selectedArticle.keyPoints.map((point, index) => (
                      <li key={index} className="flex gap-2.5 text-xs sm:text-sm text-gray-600 leading-relaxed">
                        <span className="text-[#7C3AED] font-black text-base mt-[-3px] select-none">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Impact projection (Dashboard widget style) */}
              {selectedArticle.impact && (
                <div className="bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] text-white rounded-2xl p-6 shadow-md border-none flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <Sparkles className="w-6 h-6 text-white animate-pulse" />
                  </div>
                  <div>
                    <h4 className="font-black text-[10px] uppercase tracking-wider text-violet-200 mb-1">
                      Impacto Estimado (12 Meses)
                    </h4>
                    <p className="text-white text-sm leading-relaxed font-medium">
                      {selectedArticle.impact}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex justify-between items-center text-xs text-gray-500 rounded-b-[32px]">
              <span className="flex items-center gap-2 font-bold text-gray-600">
                <span className="w-6 h-6 rounded-full bg-violet-100 border border-violet-200 text-[#7C3AED] flex items-center justify-center font-black text-[10px] uppercase">
                  {selectedArticle.author.charAt(0)}
                </span>
                Escrito por: <strong className="text-gray-800 font-black">{selectedArticle.author}</strong>
              </span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold px-6 py-2.5 rounded-xl shadow-xs transition"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
