import React, { useState, useEffect, useRef } from 'react';
import { 
  Share2, ThumbsUp, MessageSquare, Plus, Search, ExternalLink, Calendar, User, 
  CornerDownRight, X, Sparkles, ChevronUp, Send, Info, Award, MessageCircle, 
  TrendingUp, Smile, Paperclip, Hash, Sparkle, AlertCircle
} from 'lucide-react';

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

interface ChatMessage {
  id: string;
  author: string;
  text: string;
  createdAt: string;
}

export default function SocialNetwork() {
  // Navigation State inside Community Dashboard
  const [activeTab, setActiveTab] = useState<'chat' | 'tools' | 'projects'>('chat');

  // Common State
  const [posts, setPosts] = useState<Post[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [errorPosts, setErrorPosts] = useState<string | null>(null);

  // Search & Filter State for Tools
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [sortBy, setSortBy] = useState<'likes' | 'recent'>('likes');

  // Form states for Tools
  const [showShareForm, setShowShareForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    category: 'Productividad',
    description: '',
    utility: '',
    author: localStorage.getItem('prosur_chat_username') || ''
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Comment states
  const [activeCommentsPostId, setActiveCommentsPostId] = useState<string | null>(null);
  const [commentAuthor, setCommentAuthor] = useState(() => localStorage.getItem('prosur_chat_username') || '');
  const [commentText, setCommentText] = useState('');
  const [commentSubmitting, setCommentSubmitting] = useState(false);

  // --- Chat States & Logic (Integrated from LiveChat.tsx) ---
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [username, setUsername] = useState(() => localStorage.getItem('prosur_chat_username') || '');
  const [tempUsername, setTempUsername] = useState('');
  const [isEditingName, setIsEditingName] = useState(!localStorage.getItem('prosur_chat_username'));
  const [wsConnected, setWsConnected] = useState(false);
  const [usePolling, setUsePolling] = useState(false);
  const [wsRetryCount, setWsRetryCount] = useState(0);

  const wsRef = useRef<WebSocket | null>(null);
  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  // Suggestions for AI replies based on Image 2
  const aiSuggestions = [
    "¡Excelente herramienta de IA!",
    "¿Qué modelo de IA utiliza esta solución?",
    "Me gustaría colaborar en este proyecto.",
    "¡Gran aporte para la optimización de procesos!"
  ];

  // Fetch tools/posts
  const fetchPosts = async () => {
    setLoadingPosts(true);
    setErrorPosts(null);
    try {
      const response = await fetch('/api/posts');
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      setPosts(data);
    } catch (err: any) {
      console.error("Error fetching social posts:", err);
      setErrorPosts("No pudimos cargar las herramientas compartidas.");
    } finally {
      setLoadingPosts(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Connect to WebSocket chat
  useEffect(() => {
    if (usePolling) return;
    
    let reconnectTimeout: any;

    const connectWS = () => {
      try {
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const wsUrl = `${protocol}//${window.location.host}/ws-chat`;
        const socket = new WebSocket(wsUrl);
        wsRef.current = socket;

        socket.onopen = () => {
          setWsConnected(true);
          setWsRetryCount(0);
        };

        socket.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.type === 'history') {
              setMessages(data.messages);
            } else if (data.type === 'message') {
              setMessages((prev) => [...prev, data.message]);
            }
          } catch (err) {
            console.error('[Chat WS] Error parsing message:', err);
          }
        };

        socket.onclose = () => {
          setWsConnected(false);
          setWsRetryCount(prev => {
            const nextCount = prev + 1;
            if (nextCount >= 2) {
              setUsePolling(true); // Fallback to HTTP polling
            } else {
              reconnectTimeout = setTimeout(connectWS, 3000);
            }
            return nextCount;
          });
        };

        socket.onerror = () => {
          socket.close();
        };
      } catch (e) {
        setUsePolling(true);
      }
    };

    connectWS();

    return () => {
      if (wsRef.current) wsRef.current.close();
      clearTimeout(reconnectTimeout);
    };
  }, [usePolling]);

  // Polling fallback
  useEffect(() => {
    if (!usePolling) return;

    const fetchHistory = async () => {
      try {
        const response = await fetch('/api/chat');
        if (response.ok) {
          const history = await response.json();
          setMessages(history);
        }
      } catch (err) {
        console.error('[Chat Polling] Error:', err);
      }
    };

    fetchHistory();
    const interval = setInterval(fetchHistory, 5000);
    return () => clearInterval(interval);
  }, [usePolling]);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeTab]);

  // Handle Like/Upvote
  const handleLike = async (postId: string) => {
    try {
      const response = await fetch(`/api/posts/${postId}/like`, { method: 'POST' });
      if (!response.ok) throw new Error("No se pudo votar.");
      const updatedPost = await response.json();
      setPosts(posts.map(p => p.id === postId ? { ...p, likes: updatedPost.likes, likedBy: updatedPost.likedBy } : p));
    } catch (err) {
      console.error("Error upvoting post:", err);
    }
  };

  // Handle new tool submission
  const handleShareSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    const { title, category, description, utility, author } = formData;
    
    if (!title || !category || !description || !utility || !author) {
      setFormError("Por favor completa los campos requeridos (*).");
      return;
    }

    setFormSubmitting(true);
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error("Error al publicar la herramienta.");
      const newPost = await response.json();
      setPosts([newPost, ...posts]);
      setShowShareForm(false);
      setFormData({
        title: '',
        url: '',
        category: 'Productividad',
        description: '',
        utility: '',
        author: username
      });
    } catch (err: any) {
      setFormError(err.message || "Error de conexión.");
    } finally {
      setFormSubmitting(false);
    }
  };

  // Handle tool comment submission
  const handleCommentSubmit = async (e: React.FormEvent, postId: string) => {
    e.preventDefault();
    if (!commentAuthor.trim() || !commentText.trim()) return;

    setCommentSubmitting(true);
    try {
      const response = await fetch(`/api/posts/${postId}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author: commentAuthor, text: commentText })
      });

      if (!response.ok) throw new Error("No se pudo añadir el comentario.");
      const newComment = await response.json();

      setPosts(posts.map(p => {
        if (p.id === postId) {
          return { ...p, comments: [...p.comments, newComment] };
        }
        return p;
      }));
      setCommentText('');
    } catch (err) {
      console.error("Error commenting:", err);
    } finally {
      setCommentSubmitting(false);
    }
  };

  // Handle chat message send
  const handleSendChatMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim() || !username.trim()) return;

    const messageData = { author: username, text: chatInput };

    // Clear input immediately for responsiveness
    setChatInput('');

    if (wsConnected && wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'message', ...messageData }));
    } else {
      // Fallback post call
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(messageData)
        });
        if (response.ok) {
          const sentMsg = await response.json();
          if (usePolling) {
            setMessages(prev => [...prev, sentMsg]);
          }
        }
      } catch (err) {
        console.error('Error sending message via HTTP:', err);
      }
    }
  };

  // Save username
  const handleSaveUsername = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempUsername.trim()) return;
    const finalName = tempUsername.trim();
    setUsername(finalName);
    localStorage.setItem('prosur_chat_username', finalName);
    setCommentAuthor(finalName);
    setFormData(prev => ({ ...prev, author: finalName }));
    setIsEditingName(false);
  };

  // Tools filters
  const categories = ['Todos', 'Productividad', 'Programación', 'Diseño y Creatividad', 'IA en Negocios', 'Agentes de Software', 'Otro'];

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
      if (sortBy === 'likes') return b.likes - a.likes;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
    } catch (e) {
      return 'Reciente';
    }
  };

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
    <section className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col h-[calc(100vh-80px)] overflow-hidden">
      
      {/* 3-Column Dashboard Container (Image 2 style) */}
      <div className="flex flex-1 bg-white border border-gray-200/80 rounded-3xl overflow-hidden shadow-md h-full">
        
        {/* ========================================================
            COLUMN 1: Left Navigation Sidebar (Channels/Views)
            ======================================================== */}
        <div className="w-1/4 min-w-[200px] border-r border-gray-250/60 bg-gray-50/50 p-4 hidden md:flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest px-3 mb-3">Comunidad Prosur</h2>
              <div className="space-y-1">
                {/* Chat tab link */}
                <button 
                  onClick={() => setActiveTab('chat')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-extrabold transition-all ${
                    activeTab === 'chat' 
                      ? 'bg-[#7C3AED]/10 text-[#7C3AED]' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <MessageCircle className="w-4.5 h-4.5" />
                  <span>Canal General (Chat)</span>
                </button>

                {/* Shared tools tab link */}
                <button 
                  onClick={() => setActiveTab('tools')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-extrabold transition-all ${
                    activeTab === 'tools' 
                      ? 'bg-[#7C3AED]/10 text-[#7C3AED]' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Share2 className="w-4.5 h-4.5" />
                  <span>Compartir Herramientas</span>
                </button>

                {/* Projects view tab link */}
                <button 
                  onClick={() => setActiveTab('projects')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-extrabold transition-all ${
                    activeTab === 'projects' 
                      ? 'bg-[#7C3AED]/10 text-[#7C3AED]' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Award className="w-4.5 h-4.5" />
                  <span>Proyectos del Reto</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* User profile metadata info (bottom left sidebar) */}
          <div className="border-t border-gray-200/80 pt-4 px-3 flex items-center gap-2.5">
            <div className="w-8 h-8 bg-red-100 border border-red-200 text-prosur-red rounded-full flex items-center justify-center text-xs font-black shrink-0">
              {username ? username.charAt(0).toUpperCase() : '?'}
            </div>
            <div className="overflow-hidden">
              <span className="text-xs font-black text-gray-800 block truncate">{username || 'Invitado'}</span>
              <button 
                onClick={() => {
                  setTempUsername(username);
                  setIsEditingName(true);
                }} 
                className="text-[10px] text-[#7C3AED] hover:underline font-bold"
              >
                Editar Perfil
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================
            COLUMN 2: Center Main Panel (Active View Workspace)
            ======================================================== */}
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-white">
          
          {/* Mobile navigation header */}
          <div className="flex md:hidden bg-gray-50 border-b border-gray-250/60 p-2 justify-around">
            <button 
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-2 text-center text-xs font-black rounded-lg ${activeTab === 'chat' ? 'bg-[#7C3AED]/10 text-[#7C3AED]' : 'text-gray-500'}`}
            >
              Chat
            </button>
            <button 
              onClick={() => setActiveTab('tools')}
              className={`flex-1 py-2 text-center text-xs font-black rounded-lg ${activeTab === 'tools' ? 'bg-[#7C3AED]/10 text-[#7C3AED]' : 'text-gray-500'}`}
            >
              Herramientas
            </button>
            <button 
              onClick={() => setActiveTab('projects')}
              className={`flex-1 py-2 text-center text-xs font-black rounded-lg ${activeTab === 'projects' ? 'bg-[#7C3AED]/10 text-[#7C3AED]' : 'text-gray-500'}`}
            >
              Proyectos
            </button>
          </div>

          {/* 1. VIEW: Chat Area */}
          {activeTab === 'chat' && (
            <div className="flex-1 flex flex-col h-full overflow-hidden relative">
              
              {/* Chat Header details */}
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
                <div>
                  <h3 className="text-lg font-black text-gray-900 flex items-center gap-1.5">
                    <Hash className="w-5 h-5 text-gray-400" />
                    canal-general-ia
                  </h3>
                  <p className="text-xs text-gray-400 font-bold">Chat en vivo de la Comunidad Prosur</p>
                </div>
                
                {/* Connection status tag */}
                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black border uppercase tracking-wider ${
                  wsConnected 
                    ? 'bg-green-50 text-green-700 border-green-200' 
                    : usePolling 
                      ? 'bg-amber-50 text-amber-700 border-amber-200' 
                      : 'bg-red-50 text-red-700 border-red-200'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${wsConnected ? 'bg-green-500 animate-pulse' : usePolling ? 'bg-amber-500' : 'bg-red-500'}`} />
                  {wsConnected ? 'Websocket Conectado' : usePolling ? 'Sincronizado' : 'Sin Conexión'}
                </div>
              </div>

              {/* Username Setup Overlay (If editing name) */}
              {isEditingName && (
                <div className="absolute inset-0 bg-white/95 z-20 flex flex-col items-center justify-center p-6 text-center backdrop-blur-xs">
                  <div className="max-w-md w-full bg-white border border-gray-200 rounded-3xl p-8 shadow-xl">
                    <div className="w-12 h-12 bg-red-50 text-prosur-red rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-black text-gray-900 mb-2">Ingresa a la Comunidad</h4>
                    <p className="text-sm text-gray-500 mb-6">Elige el alias con el que te verán los demás colaboradores en el chat y la red de herramientas.</p>
                    
                    <form onSubmit={handleSaveUsername} className="space-y-4">
                      <input
                        type="text"
                        required
                        placeholder="Tu nombre o departamento (ej. Carlos - TI)"
                        value={tempUsername}
                        onChange={(e) => setTempUsername(e.target.value)}
                        className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent transition text-center font-bold"
                      />
                      <button
                        type="submit"
                        className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold py-3 rounded-2xl shadow-md shadow-[#7C3AED]/20 transition"
                      >
                        Comenzar a participar
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {/* Chat Message feed list */}
              <div className="flex-grow overflow-y-auto p-6 space-y-4">
                {messages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 py-10">
                    <MessageCircle className="w-12 h-12 text-gray-200 mb-2" />
                    <p className="font-bold text-sm">El chat está listo</p>
                    <p className="text-xs">Escribe un mensaje para iniciar la conversación.</p>
                  </div>
                ) : (
                  messages.map((msg) => {
                    const isOwnMessage = msg.author.toLowerCase() === username.toLowerCase();
                    const initial = msg.author.charAt(0).toUpperCase();

                    return (
                      <div key={msg.id} className={`flex gap-3 max-w-[80%] ${isOwnMessage ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}>
                        {/* Avatar */}
                        <div className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-black shrink-0 ${
                          isOwnMessage 
                            ? 'bg-[#7C3AED]/15 text-[#7C3AED] border-[#7C3AED]/20' 
                            : 'bg-gray-100 text-gray-600 border-gray-200'
                        }`}>
                          {initial}
                        </div>

                        {/* Dialogue bubble */}
                        <div>
                          {!isOwnMessage && (
                            <span className="text-[10px] font-black text-gray-400 mb-1 block pl-1">{msg.author}</span>
                          )}
                          <div className={`p-3 rounded-2xl text-sm leading-relaxed shadow-3xs ${
                            isOwnMessage 
                              ? 'bg-[#7C3AED] text-white rounded-tr-none' 
                              : 'bg-gray-100 text-gray-800 rounded-tl-none border border-gray-150/40'
                          }`}>
                            <p className="whitespace-pre-line">{msg.text}</p>
                          </div>
                          <span className={`text-[9px] text-gray-400 font-medium mt-1 block px-1 ${isOwnMessage ? 'text-right' : ''}`}>
                            {formatDate(msg.createdAt)}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={chatBottomRef} />
              </div>

              {/* Chat send bar and suggestions (Image 2 style) */}
              <div className="p-4 border-t border-gray-100 bg-white shrink-0">
                {/* AI reply suggestion chips above input */}
                <div className="flex flex-wrap items-center gap-2 mb-3 bg-gradient-to-r from-violet-50/60 to-transparent p-2 rounded-2xl border border-violet-100">
                  <div className="flex items-center gap-1 text-[10px] font-black text-[#7C3AED] shrink-0 uppercase tracking-wide mr-1">
                    <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                    <span>Sugerencias IA</span>
                  </div>
                  {aiSuggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => setChatInput(suggestion)}
                      className="text-[11px] font-semibold text-gray-700 bg-white border border-gray-250/50 hover:border-[#7C3AED] hover:text-[#7C3AED] px-3 py-1 rounded-xl transition shadow-3xs"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>

                {/* Input form */}
                <form onSubmit={handleSendChatMessage} className="bg-gray-50 border border-gray-200 rounded-2xl p-2.5">
                  <textarea
                    rows={2}
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendChatMessage();
                      }
                    }}
                    placeholder="Escribe un mensaje para la comunidad... (Presiona Enter)"
                    className="w-full bg-transparent border-none outline-none focus:ring-0 text-sm placeholder-gray-400 resize-none px-2.5 py-1"
                  />
                  
                  {/* Toolbar matching Image 2 */}
                  <div className="flex items-center justify-between border-t border-gray-200/80 pt-2 px-1">
                    <div className="flex items-center gap-1 text-gray-400">
                      <button type="button" className="p-1.5 hover:text-gray-600 transition hover:bg-gray-100 rounded-lg">
                        <Smile className="w-4 h-4" />
                      </button>
                      <button type="button" className="p-1.5 hover:text-gray-600 transition hover:bg-gray-100 rounded-lg">
                        <Paperclip className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      type="submit"
                      disabled={!chatInput.trim() || !username.trim()}
                      className="flex items-center justify-center p-2 rounded-xl bg-gray-900 hover:bg-gray-800 text-white transition-all shadow-md shadow-gray-900/10 disabled:opacity-30 disabled:scale-100 hover:scale-105 active:scale-95"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </div>

            </div>
          )}

          {/* 2. VIEW: Tools Feed (Product Hunt style list) */}
          {activeTab === 'tools' && (
            <div className="flex-1 flex flex-col h-full overflow-hidden">
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between shrink-0">
                <div>
                  <h3 className="text-lg font-black text-gray-900 flex items-center gap-1.5">
                    <Share2 className="w-5 h-5 text-gray-400" />
                    red-de-herramientas
                  </h3>
                  <p className="text-xs text-gray-400 font-bold">Herramientas compartidas por colaboradores de Prosur</p>
                </div>
                
                <button
                  onClick={() => setShowShareForm(true)}
                  className="flex items-center gap-1.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md shadow-[#7C3AED]/20 transition-all hover:scale-105 active:scale-95 shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Compartir</span>
                </button>
              </div>

              {/* Filters & Search */}
              <div className="px-6 py-3 border-b border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row gap-3 items-center justify-between shrink-0">
                {/* Search */}
                <div className="relative w-full sm:max-w-xs">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Buscar herramienta..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#7C3AED] focus:border-transparent transition"
                  />
                </div>

                {/* Sort */}
                <div className="flex items-center gap-1.5 self-end sm:self-auto">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Filtrar por:</span>
                  <div className="inline-flex rounded-xl border border-gray-250/60 p-0.5 bg-white shadow-3xs">
                    <button
                      onClick={() => setSortBy('likes')}
                      className={`px-3 py-1 rounded-lg text-[10px] font-extrabold transition ${
                        sortBy === 'likes' ? 'bg-[#7C3AED]/10 text-[#7C3AED]' : 'text-gray-500 hover:text-gray-900'
                      }`}
                    >
                      Upvotes
                    </button>
                    <button
                      onClick={() => setSortBy('recent')}
                      className={`px-3 py-1 rounded-lg text-[10px] font-extrabold transition ${
                        sortBy === 'recent' ? 'bg-[#7C3AED]/10 text-[#7C3AED]' : 'text-gray-500 hover:text-gray-900'
                      }`}
                    >
                      Fecha
                    </button>
                  </div>
                </div>
              </div>

              {/* Tool Category filters row */}
              <div className="px-6 py-2 border-b border-gray-100 overflow-x-auto flex gap-1.5 shrink-0 select-none no-scrollbar">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-black border uppercase tracking-wider shrink-0 transition-all ${
                      selectedCategory === cat
                        ? 'bg-gray-900 text-white border-gray-900 shadow-sm'
                        : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50 hover:text-gray-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Scrollable list of items */}
              <div className="flex-grow overflow-y-auto p-6 space-y-4">
                {loadingPosts ? (
                  <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#7C3AED] border-t-transparent"></div>
                  </div>
                ) : errorPosts ? (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-center rounded-3xl p-6 shadow-3xs">
                    <p className="font-bold mb-2">Error</p>
                    <p className="text-xs mb-4">{errorPosts}</p>
                    <button onClick={fetchPosts} className="bg-prosur-red text-white text-xs font-bold px-4 py-2 rounded-xl">Reintentar</button>
                  </div>
                ) : filteredPosts.length === 0 ? (
                  <div className="text-center py-16 bg-white border border-gray-150/40 rounded-3xl shadow-sm">
                    <Share2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 font-bold text-sm">No hay herramientas compartidas</p>
                    <p className="text-gray-400 text-xs mt-1">¡Comparte una herramienta de IA para tu departamento!</p>
                  </div>
                ) : (
                  filteredPosts.map(post => (
                    <div
                      key={post.id}
                      className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-3xs hover:shadow-md transition-all duration-300 relative overflow-hidden"
                    >
                      <div className="flex gap-4 items-start">
                        {/* Voting box */}
                        <button
                          onClick={() => handleLike(post.id)}
                          className="flex flex-col items-center justify-center gap-0.5 bg-gray-50 border border-gray-200 hover:bg-[#7C3AED]/5 hover:border-[#7C3AED]/20 text-gray-500 hover:text-[#7C3AED] rounded-xl w-12 py-2 shrink-0 transition"
                        >
                          <ChevronUp className="w-4 h-4 text-gray-400 hover:text-[#7C3AED] shrink-0" />
                          <span className="text-xs font-black">{post.likes}</span>
                        </button>

                        <div className="flex-grow">
                          <div className="flex justify-between items-start gap-2 mb-1.5 flex-wrap">
                            <h4 className="font-extrabold text-gray-900 text-base flex items-center gap-1.5">
                              {post.title}
                              {post.url && (
                                <a href={post.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#7C3AED] transition">
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              )}
                            </h4>
                            <span className={`inline-block text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border ${getCategoryColors(post.category)}`}>
                              {post.category}
                            </span>
                          </div>
                          <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-3">{post.description}</p>
                          
                          {/* Business utility box */}
                          <div className="bg-gradient-to-br from-[#7C3AED]/[0.01] to-[#7C3AED]/[0.03] border border-[#7C3AED]/10 rounded-xl p-3 my-3">
                            <h5 className="text-[10px] font-black text-[#7C3AED] uppercase tracking-wider mb-1 flex items-center gap-1">
                              <Sparkles className="w-3 h-3" />
                              Utilidad para Prosur
                            </h5>
                            <p className="text-gray-700 text-xs leading-normal">{post.utility}</p>
                          </div>

                          {/* Footer details */}
                          <div className="flex justify-between items-center text-[10px] text-gray-450 border-t border-gray-50 pt-3">
                            <span className="flex items-center gap-1 font-bold text-gray-500">
                              <User className="w-3 h-3 text-gray-400" />
                              {post.author}
                            </span>
                            <span className="flex items-center gap-1 font-semibold">
                              <Calendar className="w-3 h-3 text-gray-400" />
                              {formatDate(post.createdAt)}
                            </span>
                          </div>

                          {/* Expand comments thread */}
                          <button
                            onClick={() => setActiveCommentsPostId(activeCommentsPostId === post.id ? null : post.id)}
                            className={`w-full mt-3 flex items-center justify-center gap-1.5 border font-extrabold py-2 rounded-xl transition text-[11px] ${
                              activeCommentsPostId === post.id
                                ? 'bg-gray-900 text-white border-gray-900 shadow-sm'
                                : 'bg-gray-50 hover:bg-gray-100 text-gray-600 border-gray-200'
                            }`}
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>{post.comments.length} Comentarios</span>
                          </button>

                          {/* Active comments list nested */}
                          {activeCommentsPostId === post.id && (
                            <div className="mt-4 border-t border-gray-100 pt-4 space-y-3">
                              {post.comments.length === 0 ? (
                                <p className="text-gray-400 text-[10px] italic">Aún no hay comentarios.</p>
                              ) : (
                                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                                  {post.comments.map(c => (
                                    <div key={c.id} className="flex gap-2.5 items-start bg-gray-50/80 rounded-xl p-2.5 border border-gray-150/40">
                                      <CornerDownRight className="w-3 h-3 text-gray-400 mt-0.5 shrink-0" />
                                      <div className="text-[11px]">
                                        <span className="font-bold text-gray-700 block mb-0.5">{c.author}</span>
                                        <p className="text-gray-600 leading-normal">{c.text}</p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {/* Comment submission form */}
                              <form onSubmit={(e) => handleCommentSubmit(e, post.id)} className="space-y-1.5 pt-2 border-t border-gray-100">
                                <div className="flex gap-2">
                                  <input
                                    type="text"
                                    placeholder="Nombre"
                                    value={commentAuthor}
                                    onChange={(e) => setCommentAuthor(e.target.value)}
                                    required
                                    className="bg-white border border-gray-250/50 rounded-lg px-2 py-1.5 text-xs w-1/3 focus:outline-none focus:ring-1 focus:ring-[#7C3AED]"
                                  />
                                  <input
                                    type="text"
                                    placeholder="Escribe un comentario..."
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                    required
                                    className="bg-white border border-gray-250/50 rounded-lg px-2.5 py-1.5 text-xs flex-grow focus:outline-none focus:ring-1 focus:ring-[#7C3AED]"
                                  />
                                  <button
                                    type="submit"
                                    disabled={commentSubmitting}
                                    className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs px-3 rounded-lg transition disabled:opacity-50"
                                  >
                                    OK
                                  </button>
                                </div>
                              </form>
                            </div>
                          )}

                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* 3. VIEW: Registered Projects Overview */}
          {activeTab === 'projects' && (
            <div className="flex-grow flex flex-col h-full overflow-hidden p-6">
              <div className="border-b border-gray-100 pb-4 mb-6 shrink-0">
                <h3 className="text-lg font-black text-gray-900 flex items-center gap-1.5">
                  <Award className="w-5 h-5 text-gray-400" />
                  proyectos-registrados
                </h3>
                <p className="text-xs text-gray-400 font-bold">Resumen de proyectos de innovación inscritos en el Reto IA Prosur</p>
              </div>

              {/* Informative text about teams */}
              <div className="flex-grow overflow-y-auto space-y-6 pr-1">
                <div className="bg-violet-50/50 border border-violet-100 rounded-2xl p-5 flex gap-4 items-start">
                  <Info className="w-6 h-6 text-[#7C3AED] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-extrabold text-sm text-[#7C3AED] mb-1">Inspiración Colectiva</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      El Reto IA cuenta con la participación de diversas marcas y empresas del Grupo Prosur (como CaFi, Grupo Chesa, Calzamoda). Ve a la pestaña **Registro** en la página de inicio para ver la lista completa con los alcances técnicos protegidos de cada propuesta.
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-3xs flex flex-col justify-between">
                    <div>
                      <div className="w-10 h-10 bg-red-100 text-prosur-red rounded-full flex items-center justify-center font-black mb-3">1</div>
                      <h4 className="font-extrabold text-sm text-gray-900 mb-1">¿Tienes una idea?</h4>
                      <p className="text-xs text-gray-500 leading-relaxed mb-4">Pregunta a tus compañeros en el Chat si ya han resuelto problemas parecidos o si desean unirse para armar equipo.</p>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-3xs flex flex-col justify-between">
                    <div>
                      <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-black mb-3">2</div>
                      <h4 className="font-extrabold text-sm text-gray-900 mb-1">¡Comparte Herramientas!</h4>
                      <p className="text-xs text-gray-500 leading-relaxed mb-4">Alimentar la red de herramientas con utilidades prácticas nos ayuda a todos a encontrar soluciones a problemas cotidianos.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* ========================================================
            COLUMN 3: Right Sidebar Panel (Details / Stats)
            ======================================================== */}
        <div className="w-1/4 min-w-[200px] border-l border-gray-250/60 bg-gray-50/30 p-5 hidden lg:flex flex-col justify-between overflow-y-auto">
          
          {/* Details based on activeTab */}
          <div className="space-y-6">
            
            {activeTab === 'chat' && (
              <>
                <div>
                  <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Detalles del Canal</h4>
                  <div className="space-y-3.5 text-xs">
                    <div>
                      <span className="font-bold text-gray-700 block mb-1">Tema del Canal</span>
                      <p className="text-gray-500 leading-relaxed">Discusión general en tiempo real, consultas técnicas sobre Vertex AI Studio y conformación de equipos del Reto IA Prosur.</p>
                    </div>
                    <div>
                      <span className="font-bold text-gray-700 block mb-1">Último Mensaje</span>
                      <p className="text-gray-500">{messages.length > 0 ? messages[messages.length - 1].author + ' - Recientemente' : 'Sin actividad aún'}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200/85 pt-4">
                  <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Participantes Activos</h4>
                  <ul className="space-y-2 text-xs">
                    <li className="flex items-center gap-2 text-gray-700">
                      <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
                      <span className="font-semibold">Gerente de Innovación (Tú)</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-500">
                      <span className="w-2 h-2 rounded-full bg-gray-450 shrink-0" />
                      <span>Carlos Barrientos</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-500">
                      <span className="w-2 h-2 rounded-full bg-gray-450 shrink-0" />
                      <span>María Pérez</span>
                    </li>
                  </ul>
                </div>
              </>
            )}

            {activeTab === 'tools' && (
              <>
                <div>
                  <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Red de Innovación</h4>
                  <div className="space-y-3 text-xs leading-relaxed text-gray-500">
                    <p>Encuentra recursos ya evaluados para automatizar flujos de resurtido de inventarios, generación de leads, reportes y transcripciones.</p>
                    <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-3xs mt-2 text-center text-gray-900 font-extrabold flex flex-col items-center">
                      <span className="text-xs text-gray-400 uppercase font-black tracking-wide mb-1">Total Compartidas</span>
                      <span className="text-3xl font-black text-[#7C3AED]">{posts.length}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200/85 pt-4">
                  <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Top Upvotes</h4>
                  <ul className="space-y-2.5 text-xs">
                    {posts.slice(0, 3).map((p, idx) => (
                      <li key={p.id} className="flex justify-between items-center gap-2 border-b border-gray-100 pb-1.5">
                        <span className="font-semibold text-gray-700 truncate">{idx + 1}. {p.title}</span>
                        <span className="text-[10px] font-black bg-[#7C3AED]/5 text-[#7C3AED] border border-[#7C3AED]/20 px-2 py-0.5 rounded-md flex items-center gap-0.5">
                          <ChevronUp className="w-3 h-3" />
                          {p.likes}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {activeTab === 'projects' && (
              <>
                <div>
                  <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Cronograma del Reto</h4>
                  <div className="space-y-3.5 text-xs">
                    <div>
                      <span className="font-bold text-gray-700 block">Fase 2: Registro de Alcance</span>
                      <p className="text-gray-500 leading-normal mt-0.5">Límite para entregar alcances técnicos y metas de éxito de proyectos: **23 de Julio**.</p>
                    </div>
                    <div>
                      <span className="font-bold text-gray-700 block">Fase 3: Demo Day</span>
                      <p className="text-gray-500 leading-normal mt-0.5">Demostraciones en vivo de los prototipos ante el comité evaluador: a partir del **30 de Julio**.</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200/85 pt-4">
                  <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Agendar Demo</h4>
                  <p className="text-[11px] text-gray-500 mb-3 leading-relaxed">Reserva la sesión de demo de 30 minutos de tu equipo en la plataforma Calendly.</p>
                  <a 
                    href="https://calendly.com/gerencia-mejoracontinua-prosur/30min" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-full text-center inline-block bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold py-2 rounded-xl transition shadow-sm shadow-[#7C3AED]/10"
                  >
                    Agendar en Calendly
                  </a>
                </div>
              </>
            )}

          </div>

          {/* General project disclaimer (Bottom right sidebar) */}
          <div className="border-t border-gray-200/80 pt-4 flex items-center gap-2 text-[10px] text-gray-400 leading-snug font-medium">
            <AlertCircle className="w-4 h-4 shrink-0 text-gray-400" />
            <span>Reto de Inteligencia Artificial 2026 - Grupo Prosur</span>
          </div>

        </div>

      </div>

      {/* Share Tool Modal Form */}
      {showShareForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4" role="dialog" aria-modal="true" onClick={() => setShowShareForm(false)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col relative animate-in fade-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
            
            {/* Modal header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/30 bg-white">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Share2 className="w-5 h-5 text-[#7C3AED]" />
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
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent transition"
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
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent transition"
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
                    className="w-full border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent transition"
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
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent transition"
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
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent transition resize-none"
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
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent transition resize-none"
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
                  className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold px-6 py-2.5 rounded-xl shadow-md shadow-[#7C3AED]/20 transition text-sm disabled:opacity-50"
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
