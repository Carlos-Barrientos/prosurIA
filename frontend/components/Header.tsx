import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  currentView: 'landing' | 'blog' | 'social';
  onViewChange: (view: 'landing' | 'blog' | 'social') => void;
}

export default function Header({ currentView, onViewChange }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { id: 'landing', label: 'Inicio', isView: true },
    { id: 'premios', href: '#premios', label: 'Premios' },
    { id: 'reglas', href: '#reglas', label: 'Reglas' },
    { id: 'registro', href: '#registro', label: 'Registro' },
    { id: 'cronograma', href: '#cronograma', label: 'Cronograma' },
    { id: 'blog', label: 'Tendencias de IA', isView: true },
    { id: 'social', label: 'Red de Herramientas', isView: true },
  ];

  const handleLinkClick = (e: React.MouseEvent, link: any) => {
    e.preventDefault();
    if (link.isView) {
      onViewChange(link.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (currentView !== 'landing') {
        onViewChange('landing');
        setTimeout(() => {
          const element = document.querySelector(link.href);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 150);
      } else {
        const element = document.querySelector(link.href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
    setIsMenuOpen(false);
  };

  const isLinkActive = (link: any) => {
    if (link.isView) {
      return currentView === link.id;
    }
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo / Brand */}
          <div className="flex-shrink-0 flex items-center">
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                onViewChange('landing');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center focus:outline-none focus:ring-2 focus:ring-prosur-red rounded"
            >
              <img 
                src="./logoprosur.png" 
                alt="Logo Grupo Prosur" 
                width={225}
                height={225}
                className="h-24 w-auto object-contain" 
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6" aria-label="Navegación principal">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href || '#'}
                onClick={(e) => handleLinkClick(e, link)}
                className={`font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-prosur-red rounded px-2.5 py-1.5 text-sm ${
                  isLinkActive(link)
                    ? 'text-prosur-red bg-prosur-red/5'
                    : 'text-prosur-gray hover:text-prosur-red'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-prosur-gray hover:text-prosur-red focus:outline-none focus:ring-2 focus:ring-prosur-red rounded p-2"
              aria-expanded={isMenuOpen}
              aria-label="Abrir menú principal"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100">
          <nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3" aria-label="Navegación móvil">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href || '#'}
                onClick={(e) => handleLinkClick(e, link)}
                className={`block px-3 py-2 rounded-md text-base font-semibold ${
                  isLinkActive(link)
                    ? 'text-prosur-red bg-prosur-red/5'
                    : 'text-prosur-gray hover:text-prosur-red hover:bg-gray-50'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
