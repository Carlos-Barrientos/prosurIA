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

// Unsplash images matching the abstract tech/neural style from Image 1
const articleImages = [
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80', // Digital globe / sphere network
  'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80', // Colorful brain outline tech
  'https://images.unsplash.com/photo-1618005198143-e5283b519a7f?auto=format&fit=crop&w=600&q=80', // Abstract digital organic textures
  'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=600&q=80', // Neural grid / abstract network
  'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80', // Coder analytics tech
];

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
      {/* Header section - Redesigned to match Image 1 (Text Left, Image Right) */}
      <div className="flex flex-col md:flex-row justify-between items-stretch mb-12 gap-8 bg-white/40 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-gray-150/50 shadow-xs relative overflow-hidden">
        <div className="flex-1 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-3 text-[#7C3AED] font-extrabold uppercase tracking-wider text-sm">
            <BrainCircuit className="w-5 h-5 animate-pulse" />
            <span>Tendencias de IA</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-[#7C3AED] tracking-tight leading-tight">
            IA aplicada a negocios
          </h1>
          <p className="text-gray-600 mt-4 text-sm sm:text-base leading-relaxed max-w-2xl">
            Descubre cómo la IA está transformando el trabajo, las empresas y las profesiones. Aquí encontrarás guías prácticas, ejemplos reales, tendencias y recursos para aprender a utilizar la Inteligencia Artificial en tu día a día.
          </p>
          
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              onClick={() => fetchTrends(true)}
              disabled={loading || refreshing}
              className="flex items-center gap-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold px-5 py-2.5 rounded-xl shadow-md shadow-[#7C3AED]/20 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 text-white ${refreshing ? 'animate-spin' : ''}`} />
              {refreshing ? 'Actualizando tendencias...' : 'Refrescar tendencias'}
            </button>
            
            {/* Auto-update status banner */}
            <div className="flex items-center gap-2 text-xs text-green-700 bg-green-50 border border-green-100 rounded-xl px-3 py-2 w-fit">
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
          <div className="w-full h-48 sm:h-56 rounded-bl-[60px] rounded-tr-[60px] overflow-hidden shadow-md border border-gray-200">
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
        <div className="flex flex-wrap gap-2 mb-8 animate-fade-in" role="tablist" aria-label="Categorías de blog">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              role="tab"
              aria-selected={activeCategory === category}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition duration-150 focus:outline-none focus:ring-2 focus:ring-[#7C3AED] ${
                activeCategory === category
                  ? 'bg-[#7C3AED] text-white border-[#7C3AED] shadow-md shadow-[#7C3AED]/20'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
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
          <p className="text-gray-500 font-bold animate-pulse">Analizando la red y sintetizando tendencias con Gemini...</p>
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div className="bg-red-50 border border-red-200 rounded-3xl p-6 text-center max-w-xl mx-auto my-12 shadow-sm">
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

      {/* Grid of articles matching Image 1 */}
      {!loading && !error && (
        filteredArticles.length === 0 ? (
          <div className="text-center py-20 bg-white border border-gray-150/40 rounded-3xl shadow-sm">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No se encontraron artículos en esta categoría.</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 animate-fade-in">
            {filteredArticles.map((article, idx) => {
              // Assign a colorful abstract image based on the index
              const cardImage = articleImages[idx % articleImages.length];
              
              return (
                <article
                  key={article.id}
                  onClick={() => setSelectedArticle(article)}
                  className="group flex flex-col bg-white border border-gray-200/60 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 cursor-pointer overflow-hidden relative"
                >
                  {/* Top card image matching Image 1 */}
                  <div className="h-48 sm:h-52 w-full overflow-hidden relative border-b border-gray-100 bg-gray-50">
                    <img 
                      src={cardImage} 
                      alt={article.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>

                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      {/* Three dot indicators and date matching Image 1 */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1.5" title={`Categoría: ${article.category}`}>
                          {/* Dot 1: Active purple */}
                          <span className="h-3 w-3 rounded-full bg-[#7C3AED]" />
                          {/* Dot 2: Lavender */}
                          <span className="h-3 w-3 rounded-full bg-[#DDD6FE]" />
                          {/* Dot 3: Light gray */}
                          <span className="h-3 w-3 rounded-full bg-[#F3F4F6]" />
                          
                          <span className="text-xs font-bold text-gray-400 ml-1.5 uppercase tracking-wide">
                            {article.category}
                          </span>
                        </div>
                        
                        <span className="text-xs font-medium text-gray-500">
                          {article.date}
                        </span>
                      </div>
                      
                      {/* Violet Title */}
                      <h3 className="text-xl font-extrabold text-[#7C3AED] group-hover:text-[#6D28D9] transition-colors mb-3 line-clamp-2 leading-snug">
                        {article.title}
                      </h3>
                      
                      <p className="text-gray-500 text-sm mb-6 line-clamp-3 leading-relaxed">
                        {article.summary}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-400">
                      <span className="flex items-center gap-1.5 font-bold text-gray-600">
                        <User className="w-3.5 h-3.5 text-gray-400" />
                        {article.author}
                      </span>
                      <span className="flex items-center gap-1 font-medium">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        {article.readTime}
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )
      )}

      {/* Article details modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true" onClick={() => setSelectedArticle(null)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col relative animate-in fade-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="p-6 sm:p-8 border-b border-gray-100 flex justify-between items-start">
              <div className="w-full">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#7C3AED] font-semibold mb-4 transition"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Volver al blog
                </button>
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <span className="inline-block bg-[#7C3AED]/5 text-[#7C3AED] text-xs font-bold px-3 py-1 rounded-full border border-[#7C3AED]/10 shadow-3xs">
                    {selectedArticle.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-400 font-medium">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    {selectedArticle.readTime}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-400 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
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
              <div className="prose max-w-none text-gray-600 leading-relaxed text-sm sm:text-base space-y-6">
                {selectedArticle.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="whitespace-pre-line">{paragraph}</p>
                ))}
              </div>

              {/* Key points */}
              {selectedArticle.keyPoints && selectedArticle.keyPoints.length > 0 && (
                <div className="bg-gray-50/80 rounded-2xl p-6 border border-gray-100">
                  <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#7C3AED]" />
                    Puntos clave a considerar
                  </h4>
                  <ul className="grid gap-4 sm:grid-cols-3">
                    {selectedArticle.keyPoints.map((point, index) => (
                      <li key={index} className="flex gap-2 text-sm text-gray-600 leading-relaxed">
                        <span className="text-[#7C3AED] font-extrabold text-base select-none mt-[-2px]">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Impact projection */}
              {selectedArticle.impact && (
                <div className="bg-gradient-to-br from-[#7C3AED]/[0.01] to-[#7C3AED]/[0.04] border border-[#7C3AED]/15 rounded-2xl p-6">
                  <h4 className="font-bold text-[#7C3AED] mb-2 uppercase tracking-wider text-xs">
                    Impacto Estimado (12 Meses)
                  </h4>
                  <p className="text-gray-800 text-sm sm:text-base leading-relaxed">
                    {selectedArticle.impact}
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex justify-between items-center text-xs text-gray-500 rounded-b-3xl">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-gray-400" />
                Escrito por: <strong className="text-gray-700 font-bold">{selectedArticle.author}</strong>
              </span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold px-5 py-2.5 rounded-xl shadow-xs transition"
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
