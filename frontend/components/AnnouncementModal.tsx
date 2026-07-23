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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={handleClose}
    >
      <div 
        className="relative bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-300 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Banner with Logo & Background Gradient */}
        <div className="relative bg-gradient-to-b from-red-50/90 via-red-50/40 to-white pt-8 pb-4 px-6 text-center border-b border-gray-100">
          {/* Background Decorative Orbs */}
          <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-prosur-red/10 rounded-full blur-xl pointer-events-none"></div>
          <div className="absolute top-0 left-0 -mt-6 -ml-6 w-32 h-32 bg-amber-500/10 rounded-full blur-xl pointer-events-none"></div>

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-2 rounded-full hover:bg-white/80 transition-colors focus:outline-none focus:ring-2 focus:ring-prosur-red z-20 shadow-2xs"
            aria-label="Cerrar aviso"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Official Prosur Logo */}
          <div className="flex justify-center mb-3">
            <img 
              src="./logoprosur.png" 
              alt="Logo Grupo Prosur" 
              className="h-20 sm:h-22 w-auto object-contain drop-shadow-xs"
            />
          </div>

          {/* Event Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-prosur-red/10 text-prosur-red border border-prosur-red/20 uppercase tracking-widest shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-prosur-red" />
            Reto de Inteligencia Artificial · Demo Day
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 pt-4 text-center">
          {/* Main Title */}
          <h3 id="modal-title" className="text-2xl font-black text-gray-900 leading-tight mb-4 flex items-center justify-center gap-2">
            <Calendar className="w-6 h-6 text-prosur-red flex-shrink-0" />
            ¡Agenden su sesión de Demo!
          </h3>

          {/* Highlighted Deadline Box */}
          <div className="bg-gradient-to-r from-amber-50 via-red-50/60 to-amber-50 border border-amber-200/80 rounded-2xl p-4.5 mb-5 shadow-xs">
            <p className="text-lg font-extrabold text-gray-900 leading-snug">
              Tienen hasta el <span className="text-prosur-red font-black underline decoration-red-400 decoration-2 underline-offset-4">10 de Agosto</span> para agendar su Demo.
            </p>
            <div className="flex items-center justify-center gap-1.5 mt-2.5 text-xs font-bold text-amber-800">
              <Clock className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>Reserva tu espacio de 30 minutos a tiempo</span>
            </div>
          </div>

          {/* Description Text */}
          <p className="text-sm text-gray-600 leading-relaxed mb-6 font-medium">
            Recuerda que para presentar los avances de tu proyecto ante los evaluadores en la etapa final, es indispensable agendar tu horario de demostración.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <a
              href="https://calendly.com/gerencia-mejoracontinua-prosur/30min"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClose}
              className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-5 border border-transparent rounded-xl text-sm font-bold text-white bg-gradient-to-r from-prosur-red to-red-600 hover:from-red-600 hover:to-red-700 shadow-md hover:shadow-lg transition-all hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-prosur-red"
            >
              <span>Agendar Demo en Calendly</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            
            <button
              onClick={handleClose}
              className="w-full sm:w-auto py-3.5 px-6 border border-gray-300 rounded-xl text-sm font-bold text-gray-700 bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Entendido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
