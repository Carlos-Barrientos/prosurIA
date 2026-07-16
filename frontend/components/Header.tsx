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
          <nav className="hidden lg:flex items-center space-x-4" aria-label="Navegación principal">
            {navLinks.map((link) => {
              const isActive = isLinkActive(link);
              let className = `font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-prosur-red rounded px-3 py-2 text-sm flex items-center `;
              
              if (link.id === 'blog') {
                className += isActive
                  ? 'text-white bg-prosur-red shadow-sm transform scale-105'
                  : 'text-prosur-red border border-prosur-red/20 hover:bg-prosur-red hover:text-white shadow-xs';
              } else if (link.id === 'social') {
                className += isActive
                  ? 'text-white bg-blue-600 shadow-sm transform scale-105'
                  : 'text-blue-600 border border-blue-500/20 hover:bg-blue-600 hover:text-white shadow-xs';
              } else {
                className += isActive
                  ? 'text-prosur-red bg-prosur-red/5'
                  : 'text-prosur-gray hover:text-prosur-red';
              }

              return (
                <a
                  key={link.id}
                  href={link.href || '#'}
                  onClick={(e) => handleLinkClick(e, link)}
                  className={className}
                >
                  {link.label}
                </a>
              );
            })}
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
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-inner">
          <nav className="px-3 pt-2 pb-4 space-y-1.5 sm:px-4" aria-label="Navegación móvil">
            {navLinks.map((link) => {
              const isActive = isLinkActive(link);
              let className = `block px-3 py-2.5 rounded-lg text-base font-semibold transition-colors `;
              
              if (link.id === 'blog') {
                className += isActive
                  ? 'text-white bg-prosur-red'
                  : 'text-prosur-red bg-red-50/50 hover:bg-red-50 border border-red-100';
              } else if (link.id === 'social') {
                className += isActive
                  ? 'text-white bg-blue-600'
                  : 'text-blue-600 bg-blue-50/50 hover:bg-blue-50 border border-blue-100';
              } else {
                className += isActive
                  ? 'text-prosur-red bg-prosur-red/5'
                  : 'text-prosur-gray hover:text-prosur-red hover:bg-gray-50';
              }

              return (
                <a
                  key={link.id}
                  href={link.href || '#'}
                  onClick={(e) => handleLinkClick(e, link)}
                  className={className}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
