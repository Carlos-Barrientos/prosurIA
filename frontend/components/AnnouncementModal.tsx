import React, { useState } from 'react';
import { Calendar, X, ExternalLink, Sparkles, Clock } from 'lucide-react';

interface AnnouncementModalProps {
  onClose?: () => void;
}

export default function AnnouncementModal({ onClose }: AnnouncementModalProps) {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={handleClose}
    >
      <div 
        className="relative bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-red-100 p-6 sm:p-8 animate-in zoom-in-95 duration-300 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background Decorative Accent */}
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-36 h-36 bg-gradient-to-bl from-prosur-red/10 to-transparent rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-36 h-36 bg-gradient-to-tr from-amber-500/10 to-transparent rounded-full blur-2xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-prosur-red z-10"
          aria-label="Cerrar aviso"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center pt-2">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-red-50 text-prosur-red mb-4 border border-red-100 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-prosur-red" />
            Aviso Importante - Demo Day
          </div>

          {/* Animated Icon */}
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-prosur-red to-red-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-red-500/20 mb-5 transform hover:scale-105 transition-transform">
            <Calendar className="w-8 h-8" />
          </div>

          {/* Title */}
          <h3 id="modal-title" className="text-2xl font-black text-gray-900 leading-tight mb-3">
            ¡Agenden su sesión de Demo!
          </h3>

          {/* Key Deadline Box */}
          <div className="bg-gradient-to-r from-amber-50 via-red-50 to-amber-50 border border-amber-200/80 rounded-2xl p-4 mb-5 shadow-xs">
            <p className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
              Tienen hasta el <span className="text-prosur-red font-black underline decoration-red-300 underline-offset-4">10 de Agosto</span> para agendar su Demo.
            </p>
            <div className="flex items-center justify-center gap-1.5 mt-2 text-xs font-semibold text-amber-800">
              <Clock className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>Reserva tu espacio de 30 minutos a tiempo</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 leading-relaxed mb-6 font-medium">
            Recuerda que para participar en el cierre del Reto de IA y presentar tus avances ante los evaluadores, es indispensable agendar tu sesión.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <a
              href="https://calendly.com/gerencia-mejoracontinua-prosur/30min"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClose}
              className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 border border-transparent rounded-xl text-sm font-bold text-white bg-prosur-red hover:bg-red-700 shadow-md hover:shadow-lg transition-all hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-prosur-red"
            >
              <span>Agendar Demo en Calendly</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            
            <button
              onClick={handleClose}
              className="w-full sm:w-auto py-3 px-5 border border-gray-300 rounded-xl text-sm font-bold text-gray-700 bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Entendido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
