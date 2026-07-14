import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, User, ChevronDown, Activity } from 'lucide-react';

interface ChatMessage {
  id: string;
  author: string;
  text: string;
  createdAt: string;
}

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [username, setUsername] = useState(() => localStorage.getItem('prosur_chat_username') || '');
  const [tempName, setTempName] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);
  const [connected, setConnected] = useState(false);

  const wsRef = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Initialize and maintain WebSocket connection
  useEffect(() => {
    let reconnectTimeout: any;

    const connect = () => {
      try {
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const wsUrl = `${protocol}//${window.location.host}/ws-chat`;
        console.log(`[Chat Client] Connecting to WebSocket: ${wsUrl}`);
        
        const socket = new WebSocket(wsUrl);
        wsRef.current = socket;

        socket.onopen = () => {
          console.log('[Chat Client] Connected to WebSocket');
          setConnected(true);
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
            console.error('[Chat Client] Error parsing incoming message:', err);
          }
        };

        socket.onclose = () => {
          console.log('[Chat Client] Disconnected from WebSocket, reconnecting...');
          setConnected(false);
          reconnectTimeout = setTimeout(connect, 3000); // Reconnect in 3s
        };

        socket.onerror = (err) => {
          console.error('[Chat Client] WebSocket error:', err);
          socket.close();
        };
      } catch (e) {
        console.error('[Chat Client] WebSocket connection error:', e);
      }
    };

    connect();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      clearTimeout(reconnectTimeout);
    };
  }, []);

  // Auto-scroll to bottom when new messages arrive or chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  }, [messages, isOpen]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !username) return;

    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(
        JSON.stringify({
          type: 'message',
          author: username,
          text: inputText
        })
      );
      setInputText('');
    } else {
      alert("Conexión perdida. Intentando reconectar al chat...");
    }
  };

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempName.trim()) return;
    const finalName = tempName.trim();
    setUsername(finalName);
    localStorage.setItem('prosur_chat_username', finalName);
    setIsEditingName(false);
  };

  const handleLogoutName = () => {
    setTempName(username);
    setIsEditingName(true);
  };

  const formatTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return '';
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center bg-prosur-red hover:bg-red-700 text-white rounded-full p-4 shadow-2xl transition hover:scale-105 cursor-pointer relative"
        aria-label="Abrir chat en vivo"
      >
        {isOpen ? <X className="w-6 h-6 animate-pulse" /> : <MessageSquare className="w-6 h-6" />}
        {connected && !isOpen && (
          <span className="absolute top-1 right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-green-500 border border-white"></span>
          </span>
        )}
      </button>

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[350px] h-[480px] bg-white border border-gray-150 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-4 flex justify-between items-center shrink-0">
            <div>
              <h3 className="font-bold text-sm flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-prosur-red" />
                Chat de la Comunidad
              </h3>
              <span className="text-[10px] text-gray-300 flex items-center gap-1 mt-0.5">
                <span className={`inline-block w-1.5 h-1.5 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500 animate-pulse'}`}></span>
                {connected ? 'En línea • Real-time' : 'Reconectando...'}
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition p-1"
            >
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          {!username || isEditingName ? (
            /* Setup user name screen */
            <form onSubmit={handleSaveName} className="flex-grow p-6 flex flex-col justify-center items-center text-center space-y-4">
              <div className="bg-prosur-red/5 rounded-full p-4 border border-prosur-red/10">
                <User className="w-8 h-8 text-prosur-red" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Ingresa tu Nombre</h4>
                <p className="text-gray-500 text-xs mt-1 px-4 leading-relaxed">
                  Para participar en el chat en vivo, escribe tu nombre o alias. Se guardará localmente.
                </p>
              </div>
              <input
                type="text"
                required
                maxLength={25}
                placeholder="Ej. Carlos Barrientos"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-prosur-red focus:border-transparent text-center"
              />
              <div className="flex gap-2 w-full pt-2">
                {isEditingName && (
                  <button
                    type="button"
                    onClick={() => setIsEditingName(false)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 rounded-xl text-xs transition"
                  >
                    Cancelar
                  </button>
                )}
                <button
                  type="submit"
                  className="flex-1 bg-prosur-red hover:bg-red-700 text-white font-semibold py-2 rounded-xl text-xs shadow transition"
                >
                  Confirmar
                </button>
              </div>
            </form>
          ) : (
            /* Active chat message panel */
            <>
              {/* Message scroll list */}
              <div className="flex-grow p-4 space-y-3 overflow-y-auto bg-gray-50/50 flex flex-col">
                {messages.length === 0 ? (
                  <div className="my-auto text-center p-4">
                    <p className="text-gray-400 text-xs italic">No hay mensajes recientes en esta sala.</p>
                  </div>
                ) : (
                  messages.map((msg) => {
                    const isMe = msg.author === username;
                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col max-w-[80%] ${isMe ? 'self-end items-end' : 'self-start items-start'}`}
                      >
                        {/* Remitente label */}
                        {!isMe && (
                          <span className="text-[10px] font-bold text-gray-500 ml-1.5 mb-0.5">
                            {msg.author}
                          </span>
                        )}
                        {/* Bubble */}
                        <div
                          className={`rounded-2xl px-3.5 py-2 text-xs leading-relaxed ${
                            isMe
                              ? 'bg-gray-900 text-white rounded-br-none shadow-sm'
                              : 'bg-white border border-gray-150 text-gray-800 rounded-bl-none shadow-sm'
                          }`}
                        >
                          <p className="break-words">{msg.text}</p>
                        </div>
                        {/* Timestamp */}
                        <span className="text-[9px] text-gray-400 mt-1 mr-1 ml-1 select-none">
                          {formatTime(msg.createdAt)}
                        </span>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input section */}
              <div className="p-3 border-t border-gray-100 bg-white shrink-0">
                <form onSubmit={handleSendMessage} className="flex gap-2 items-center">
                  <input
                    type="text"
                    required
                    placeholder="Escribe un mensaje..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="flex-grow bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-prosur-red focus:border-transparent transition"
                  />
                  <button
                    type="submit"
                    className="bg-prosur-red hover:bg-red-700 text-white rounded-xl p-2 shadow-sm transition hover:scale-105 shrink-0 flex items-center justify-center cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>

                {/* Footer action link to change name */}
                <div className="flex justify-between items-center mt-2 px-1 text-[10px] text-gray-400 select-none">
                  <span>
                    Identificado como: <strong className="text-gray-600 font-semibold">{username}</strong>
                  </span>
                  <button
                    onClick={handleLogoutName}
                    className="text-prosur-red hover:underline focus:outline-none"
                  >
                    Cambiar nombre
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
