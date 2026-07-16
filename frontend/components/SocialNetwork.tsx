import React, { useState, useEffect } from 'react';
import { Share2, ThumbsUp, MessageSquare, Plus, Search, ExternalLink, Calendar, User, CornerDownRight, X, Sparkles, ChevronUp } from 'lucide-react';

interface Comment {
  id: string;
  author: string;
  text: string;
  createdAt: string;
}

interface Post {
  id: string;
  title: string;
  url: string;
  category: string;
  description: string;
  utility: string;
  author: string;
  likes: number;
  likedBy: string[];
  createdAt: string;
  comments: Comment[];
}

export default function SocialNetwork() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Search, filter and sorting states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [sortBy, setSortBy] = useState<'likes' | 'recent'>('likes');

  // Form states
  const [showShareForm, setShowShareForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    category: 'Productividad',
    description: '',
    utility: '',
    author: ''
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Comments states
  const [activeCommentsPostId, setActiveCommentsPostId] = useState<string | null>(null);
  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentSubmitting, setCommentSubmitting] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/posts');
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setPosts(data);
    } catch (err: any) {
      console.error("Error fetching social posts:", err);
      setError("No pudimos cargar la red social. Por favor, intenta más tarde.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLike = async (postId: string) => {
    try {
      const response = await fetch(`/api/posts/${postId}/like`, {
        method: 'POST'
      });
      if (!response.ok) throw new Error("No se pudo registrar el voto.");
      
      const updatedPost = await response.json();
      setPosts(posts.map(p => p.id === postId ? { ...p, likes: updatedPost.likes, likedBy: updatedPost.likedBy } : p));
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  const handleShareSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const { title, category, description, utility, author } = formData;
    if (!title || !category || !description || !utility || !author) {
      setFormError("Por favor completa todos los campos requeridos (*).");
      return;
    }

    setFormSubmitting(true);
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error("Error al publicar la herramienta.");
      const newPost = await response.json();
      
      // Update state
      setPosts([newPost, ...posts]);
      setShowShareForm(false);
      setFormData({
        title: '',
        url: '',
        category: 'Productividad',
        description: '',
        utility: '',
        author: ''
      });
    } catch (err: any) {
      console.error("Error posting tool:", err);
      setFormError(err.message || "Error al conectar con el servidor.");
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent, postId: string) => {
    e.preventDefault();
    if (!commentAuthor.trim() || !commentText.trim()) return;

    setCommentSubmitting(true);
    try {
      const response = await fetch(`/api/posts/${postId}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          author: commentAuthor,
          text: commentText
        })
      });

      if (!response.ok) throw new Error("No se pudo añadir el comentario.");
      const newComment = await response.json();

      setPosts(posts.map(p => {
        if (p.id === postId) {
          return {
            ...p,
            comments: [...p.comments, newComment]
          };
        }
        return p;
      }));

      setCommentText('');
    } catch (err) {
      console.error("Error commenting on post:", err);
    } finally {
      setCommentSubmitting(false);
    }
  };

  const categories = ['Todos', 'Productividad', 'Programación', 'Diseño y Creatividad', 'IA en Negocios', 'Agentes de Software', 'Otro'];

  // Filtering & Sorting Logic
  const filteredPosts = posts
    .filter(post => {
      const matchesSearch = 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.utility.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'Todos' || post.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'likes') {
        return b.likes - a.likes; // Most liked first
      } else {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); // Most recent first
      }
    });

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch (e) {
      return 'Reciente';
    }
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex-grow w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2 text-prosur-red font-semibold uppercase tracking-wider text-sm">
            <Share2 className="w-5 h-5" />
            <span>Comunidad Prosur</span>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Red de Herramientas de IA
          </h1>
          <p className="text-gray-500 mt-2 max-w-2xl">
            Comparte nuevas herramientas de Inteligencia Artificial que hayas descubierto y discute cómo podemos aprovecharlas en Grupo Prosur.
          </p>
        </div>

        <button
          onClick={() => setShowShareForm(true)}
          className="flex items-center gap-2 bg-prosur-red hover:bg-red-700 text-white font-semibold px-5 py-3 rounded-2xl shadow-md shadow-prosur-red/20 hover:shadow-lg transition duration-150"
        >
          <Plus className="w-5 h-5" />
          Compartir herramienta
        </button>
      </div>

      {/* Main search and filter bar */}
      <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm mb-8 space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search bar */}
          <div className="relative w-full md:max-w-md">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder="Buscar por nombre, autor o utilidad corporativa..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-prosur-red focus:border-transparent transition"
            />
          </div>

          {/* Sort selection */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            <span className="text-sm font-medium text-gray-500">Ordenar por:</span>
            <div className="inline-flex rounded-xl border border-gray-200 p-1 bg-gray-50">
              <button
                onClick={() => setSortBy('likes')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  sortBy === 'likes'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Más valoradas
              </button>
              <button
                onClick={() => setSortBy('recent')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  sortBy === 'recent'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Más recientes
              </button>
            </div>
          </div>
        </div>
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 border-t border-gray-100 pt-4">
          {categories.map(category => {
            const getCategoryColors = (cat: string) => {
              const c = cat.toLowerCase();
              if (c === 'todos') return selectedCategory === 'Todos' ? 'bg-gray-900 text-white border-gray-900 shadow-sm' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50';
              if (c.includes('modelo') || c.includes('lenguaje')) return selectedCategory === cat ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-blue-50/50 text-blue-600 border-blue-100 hover:bg-blue-50';
              if (c.includes('agente') || c.includes('software')) return selectedCategory === cat ? 'bg-purple-600 text-white border-purple-600 shadow-sm' : 'bg-purple-50/50 text-purple-600 border-purple-100 hover:bg-purple-50';
              if (c.includes('productividad') || c.includes('eficiencia')) return selectedCategory === cat ? 'bg-green-600 text-white border-green-600 shadow-sm' : 'bg-green-50/50 text-green-600 border-green-100 hover:bg-green-50';
              if (c.includes('diseño') || c.includes('creativ')) return selectedCategory === cat ? 'bg-pink-600 text-white border-pink-600 shadow-sm' : 'bg-pink-50/50 text-pink-600 border-pink-100 hover:bg-pink-50';
              if (c.includes('negocio') || c.includes('corporativo')) return selectedCategory === cat ? 'bg-amber-600 text-white border-amber-600 shadow-sm' : 'bg-amber-50/50 text-amber-600 border-amber-100 hover:bg-amber-50';
              return selectedCategory === cat ? 'bg-gray-700 text-white border-gray-700 shadow-sm' : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100';
            };

            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all duration-150 ${getCategoryColors(category)}`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-prosur-red border-t-transparent"></div>
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center max-w-xl mx-auto my-12">
          <p className="text-red-700 font-semibold mb-2">Error</p>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchPosts}
            className="bg-prosur-red text-white px-5 py-2 rounded-xl hover:bg-red-700 transition"
          >
            Reintentar
          </button>
        </div>
      )}

      {/* Shared Tools List */}
      {!loading && !error && (
        filteredPosts.length === 0 ? (
          <div className="text-center py-20 bg-white border border-gray-150/40 rounded-3xl shadow-sm">
            <Share2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">Aún no hay herramientas compartidas en esta selección.</p>
            <p className="text-gray-400 text-sm mt-1">¡Sé el primero en compartir una herramienta de IA con el equipo!</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredPosts.map(post => {
              const getCategoryColors = (category: string) => {
                const c = category.toLowerCase();
                if (c.includes('modelo') || c.includes('lenguaje')) return 'bg-blue-50 text-blue-600 border-blue-100';
                if (c.includes('agente') || c.includes('software')) return 'bg-purple-50 text-purple-600 border-purple-100';
                if (c.includes('productividad') || c.includes('eficiencia')) return 'bg-green-50 text-green-600 border-green-100';
                if (c.includes('diseño') || c.includes('creativ')) return 'bg-pink-50 text-pink-600 border-pink-100';
                if (c.includes('negocio') || c.includes('corporativo')) return 'bg-amber-50 text-amber-600 border-amber-100';
                return 'bg-gray-50 text-gray-600 border-gray-150';
              };

              return (
                <div
                  key={post.id}
                  className="bg-white border border-gray-150/45 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/2 rounded-bl-full transform translate-x-8 -translate-y-8 pointer-events-none"></div>
                  
                  <div>
                    <div className="flex gap-5 items-start">
                      {/* Voting box */}
                      <button
                        onClick={() => handleLike(post.id)}
                        className="flex flex-col items-center justify-center gap-1 bg-gray-50/90 hover:bg-prosur-red/5 border border-gray-200 hover:border-prosur-red/20 text-gray-500 hover:text-prosur-red rounded-2xl w-14 py-3 shrink-0 shadow-3xs transition-all duration-200 group/vote"
                      >
                        <ChevronUp className="w-5 h-5 text-gray-400 group-hover/vote:text-prosur-red group-hover/vote:-translate-y-0.5 transition-transform" />
                        <span className="text-sm font-extrabold text-gray-700 group-hover/vote:text-prosur-red">{post.likes}</span>
                      </button>

                      {/* Details */}
                      <div className="flex-grow">
                        <div className="flex items-center gap-2 flex-wrap mb-2">
                          <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-lg border ${getCategoryColors(post.category)}`}>
                            {post.category}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-1.5 flex items-center gap-2 group">
                          {post.title}
                          {post.url && (
                            <a
                              href={post.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-prosur-red transition-colors inline-block"
                              title="Visitar sitio de la herramienta"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </h3>

                        <p className="text-gray-500 text-sm mb-4 leading-relaxed line-clamp-3">
                          {post.description}
                        </p>
                      </div>
                    </div>

                    {/* Prosur Utility Box */}
                    <div className="bg-gradient-to-br from-red-500/[0.01] to-red-500/[0.03] border border-prosur-red/10 rounded-2xl p-4 my-4">
                      <h4 className="text-xs font-bold text-prosur-red uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        Utilidad para Grupo Prosur
                      </h4>
                      <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                        {post.utility}
                      </p>
                    </div>
                  </div>

                  {/* Footer and comments handler */}
                  <div>
                    <div className="pt-3 border-t border-gray-100 flex justify-between items-center text-xs text-gray-400">
                      <span className="flex items-center gap-1.5 font-bold text-gray-600">
                        <User className="w-3.5 h-3.5 text-gray-400" />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        {formatDate(post.createdAt)}
                      </span>
                    </div>

                    {/* Comment trigger */}
                    <button
                      onClick={() => setActiveCommentsPostId(activeCommentsPostId === post.id ? null : post.id)}
                      className={`w-full mt-4 flex items-center justify-center gap-2 border font-bold py-2.5 rounded-xl transition-all duration-200 text-xs ${
                        activeCommentsPostId === post.id
                          ? 'bg-gray-900 text-white border-gray-900 shadow-sm'
                          : 'bg-white hover:bg-gray-50 text-gray-600 border-gray-200 shadow-3xs'
                      }`}
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>{post.comments.length} Comentarios</span>
                    </button>

                    {/* Comments Thread Expanded */}
                    {activeCommentsPostId === post.id && (
                      <div className="mt-4 border-t border-gray-100 pt-4 space-y-4">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Comentarios de la Comunidad</h4>
                        
                        {/* Comments list */}
                        {post.comments.length === 0 ? (
                          <p className="text-gray-400 text-xs italic bg-gray-50/50 rounded-xl p-3 text-center border border-dashed border-gray-200">Aún no hay comentarios. ¡Sé el primero en opinar!</p>
                        ) : (
                          <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                            {post.comments.map(c => {
                              const initial = c.author.charAt(0).toUpperCase();
                              return (
                                <div key={c.id} className="flex gap-3 items-start bg-gray-50/80 border border-gray-150/40 rounded-2xl p-3">
                                  <div className="w-7 h-7 bg-red-100 border border-red-200 text-prosur-red rounded-full flex items-center justify-center text-xs font-black shrink-0">
                                    {initial}
                                  </div>
                                  <div className="text-xs flex-grow">
                                    <div className="flex justify-between items-center mb-1">
                                      <span className="font-bold text-gray-850">{c.author}</span>
                                    </div>
                                    <p className="text-gray-600 leading-relaxed">{c.text}</p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* Add comment form */}
                        <form onSubmit={(e) => handleCommentSubmit(e, post.id)} className="space-y-2 pt-2 border-t border-gray-50">
                          <div className="grid grid-cols-3 gap-2">
                            <input
                              type="text"
                              placeholder="Tu nombre"
                              value={commentAuthor}
                              onChange={(e) => setCommentAuthor(e.target.value)}
                              required
                              className="col-span-1 bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-prosur-red focus:border-transparent transition"
                            />
                            <input
                              type="text"
                              placeholder="Agrega un comentario..."
                              value={commentText}
                              onChange={(e) => setCommentText(e.target.value)}
                              required
                              className="col-span-2 bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-prosur-red focus:border-transparent transition"
                            />
                          </div>
                          <button
                            type="submit"
                            disabled={commentSubmitting}
                            className="w-full bg-gray-900 hover:bg-gray-850 text-white font-bold text-xs py-2 rounded-xl shadow-xs transition disabled:opacity-50"
                          >
                            {commentSubmitting ? 'Comentando...' : 'Publicar Comentario'}
                          </button>
                        </form>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )
      )}

      {/* Share Tool Modal Form */}
      {showShareForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4" role="dialog" aria-modal="true" onClick={() => setShowShareForm(false)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col relative animate-in fade-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
            
            {/* Modal header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Share2 className="w-5 h-5 text-prosur-red" />
                Compartir una Herramienta de IA
              </h2>
              <button
                onClick={() => setShowShareForm(false)}
                className="text-gray-400 hover:text-gray-600 transition p-1.5 rounded-full hover:bg-gray-100"
                aria-label="Cerrar modal"
              >
                <X className="w-5.5 h-5.5" />
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleShareSubmit} className="p-6 space-y-4">
              {formError && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
                  {formError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Tool Title */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Nombre de la Herramienta *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. ChatGPT, Midjourney, v0"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-prosur-red focus:border-transparent transition"
                  />
                </div>

                {/* Tool URL */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Enlace / Sitio Web</label>
                  <input
                    type="url"
                    placeholder="https://ejemplo.com"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-prosur-red focus:border-transparent transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Category */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Categoría *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-prosur-red focus:border-transparent transition"
                  >
                    {categories.slice(1).map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Author */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Tu Nombre / Colaborador *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Carlos Barrientos"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-prosur-red focus:border-transparent transition"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Descripción General *</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Describe brevemente qué hace esta herramienta y cuáles son sus características principales..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-prosur-red focus:border-transparent transition resize-none"
                />
              </div>

              {/* Business Utility */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Utilidad para Grupo Prosur *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="¿Cómo podemos aplicar esta herramienta en nuestros departamentos? (Ej. optimización de inventarios, generación de reportes financieros, redacción de correos al cliente...)"
                  value={formData.utility}
                  onChange={(e) => setFormData({ ...formData, utility: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-prosur-red focus:border-transparent transition resize-none"
                />
              </div>

              {/* Form Actions */}
              <div className="flex gap-3 justify-end pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowShareForm(false)}
                  className="bg-gray-100 hover:bg-gray-250 text-gray-700 font-bold px-5 py-2.5 rounded-xl transition text-sm"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="bg-prosur-red hover:bg-red-700 text-white font-bold px-6 py-2.5 rounded-xl shadow-md shadow-prosur-red/20 transition text-sm disabled:opacity-50"
                >
                  {formSubmitting ? 'Publicando...' : 'Publicar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
