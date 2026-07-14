import React, { useState, useEffect } from 'react';
import { Clock, Calendar, User, RefreshCw, BookOpen, ArrowLeft, CheckCircle, BrainCircuit } from 'lucide-react';

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

export default function Blog() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [activeCategory, setActiveCategory] = useState('Todos');

  const fetchTrends = async (force = false) => {
    if (force) setRefreshing(true);
    else setLoading(true);
    
    setError(null);
    try {
      const url = force ? '/api/trends/refresh' : '/api/trends';
      const method = force ? 'POST' : 'GET';
      const response = await fetch(url, { method });
      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status}`);
      }
      const data = await response.json();
      setArticles(data);
    } catch (err: any) {
      console.error("Error fetching AI trends:", err);
      setError("No pudimos cargar las tendencias de hoy. Por favor, intenta de nuevo.");
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

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex-grow w-full">
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2 text-prosur-red font-semibold uppercase tracking-wider text-sm">
            <BrainCircuit className="w-5 h-5 animate-pulse" />
            <span>Tendencias de IA</span>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Descubrimientos Diarios de IA
          </h1>
          <p className="text-gray-500 mt-2 max-w-2xl">
            Monitoreo en tiempo real de los avances más importantes de inteligencia artificial corporativa, sintetizados diariamente.
          </p>
        </div>

        <button
          onClick={() => fetchTrends(true)}
          disabled={loading || refreshing}
          className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-medium px-4 py-2.5 rounded-xl border border-gray-200 shadow-sm transition hover:shadow duration-150 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 text-prosur-red ${refreshing ? 'animate-spin' : ''}`} />
          {refreshing ? 'Actualizando tendencias...' : 'Refrescar tendencias'}
        </button>
      </div>

      {/* Auto-update status banner */}
      <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 border border-green-100 rounded-xl px-4 py-3 mb-8 w-fit shadow-sm">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        <span>Alimentado por Gemini. Última actualización: Hoy. Se actualiza automáticamente cada 24 horas.</span>
      </div>

      {/* Categories Filter */}
      {!loading && !error && articles.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="Categorías de blog">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              role="tab"
              aria-selected={activeCategory === category}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition duration-150 focus:outline-none focus:ring-2 focus:ring-prosur-red ${
                activeCategory === category
                  ? 'bg-prosur-red text-white shadow-md shadow-prosur-red/20'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20">
          <RefreshCw className="w-12 h-12 text-prosur-red animate-spin mb-4" />
          <p className="text-gray-500 font-medium animate-pulse">Analizando las redes y curando tendencias con IA...</p>
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center max-w-xl mx-auto my-12">
          <p className="text-red-700 font-semibold text-lg mb-2">¡Ups! Algo salió mal</p>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => fetchTrends(false)}
            className="inline-flex items-center gap-2 bg-prosur-red text-white px-5 py-2 rounded-xl font-medium shadow-md shadow-prosur-red/20 hover:bg-red-700 transition"
          >
            Reintentar
          </button>
        </div>
      )}

      {/* Grid of articles */}
      {!loading && !error && (
        filteredArticles.length === 0 ? (
          <div className="text-center py-20 bg-white border border-gray-100 rounded-3xl shadow-sm">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No se encontraron artículos en esta categoría.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map(article => (
              <article
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className="group flex flex-col justify-between bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 cursor-pointer"
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="inline-block bg-prosur-red/5 text-prosur-red text-xs font-semibold px-3 py-1.5 rounded-full border border-prosur-red/10">
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock className="w-3.5 h-3.5" />
                      {article.readTime}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-prosur-red transition-colors mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-50 flex justify-between items-center text-xs text-gray-400">
                  <span className="flex items-center gap-1 font-medium text-gray-500">
                    <User className="w-3.5 h-3.5" />
                    {article.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {article.date}
                  </span>
                </div>
              </article>
            ))}
          </div>
        )
      )}

      {/* Article details modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in" role="dialog" aria-modal="true">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col relative animate-slide-up">
            {/* Modal Header */}
            <div className="p-6 sm:p-8 border-b border-gray-100 flex justify-between items-start">
              <div>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-prosur-red font-medium mb-4 transition"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Volver al blog
                </button>
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <span className="inline-block bg-prosur-red/5 text-prosur-red text-xs font-semibold px-3 py-1.5 rounded-full border border-prosur-red/10">
                    {selectedArticle.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="w-3.5 h-3.5" />
                    {selectedArticle.readTime}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Calendar className="w-3.5 h-3.5" />
                    {selectedArticle.date}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
                  {selectedArticle.title}
                </h2>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-grow">
              {/* Detailed Content */}
              <div className="prose max-w-none text-gray-600 leading-relaxed space-y-4">
                {selectedArticle.content.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {/* Key points */}
              {selectedArticle.keyPoints && selectedArticle.keyPoints.length > 0 && (
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-prosur-red" />
                    Puntos clave a considerar
                  </h4>
                  <ul className="grid gap-3 sm:grid-cols-3">
                    {selectedArticle.keyPoints.map((point, index) => (
                      <li key={index} className="flex gap-2 text-sm text-gray-600 leading-normal">
                        <span className="text-prosur-red font-semibold text-sm select-none">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Impact projection */}
              {selectedArticle.impact && (
                <div className="bg-prosur-red/[0.02] border border-prosur-red/10 rounded-2xl p-6">
                  <h4 className="font-bold text-prosur-red mb-2 uppercase tracking-wide text-xs">
                    Impacto Estimado (12 Meses)
                  </h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {selectedArticle.impact}
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-between items-center text-xs text-gray-500 rounded-b-3xl">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5" />
                Escrito por: <strong className="text-gray-700 font-semibold">{selectedArticle.author}</strong>
              </span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-5 py-2 rounded-xl transition"
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
