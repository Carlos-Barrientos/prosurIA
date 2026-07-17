import React, { useState } from 'react';
import { Network, Cpu, BrainCircuit, Sparkles, Bot, Newspaper, Share2, ArrowRight } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import Prizes from './components/Prizes';
import Rules from './components/Rules';
import RegistrationTabs from './components/RegistrationTabs';
import Tips from './components/Tips';
import Timeline from './components/Timeline';
import Footer from './components/Footer';
import Blog from './components/Blog';
import SocialNetwork from './components/SocialNetwork';
import LiveChat from './components/LiveChat';

export default function App() {
  const [view, setView] = useState<'landing' | 'blog' | 'social'>('landing');

  return (
    <div className="min-h-screen flex flex-col relative bg-prosur-bg">
      
      {/* Modern AI Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Glowing Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-prosur-red/5 blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-prosur-gray/10 blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

        {/* Floating Tech Elements */}
        <Network className="absolute top-[15%] left-[10%] w-24 h-24 text-prosur-gray/10 animate-float-slow" />
        <BrainCircuit className="absolute top-[65%] right-[10%] w-32 h-32 text-prosur-red/5 animate-float" />
        <Cpu className="absolute bottom-[15%] left-[20%] w-20 h-20 text-prosur-gray/10 animate-float-fast" />
        <Sparkles className="absolute top-[25%] right-[20%] w-16 h-16 text-prosur-red/5 animate-float-slow" style={{ animationDelay: '3s' }} />
        <Bot className="absolute top-[45%] left-[5%] w-16 h-16 text-prosur-gray/10 animate-float-fast" style={{ animationDelay: '1s' }} />

        {/* Floating Logo */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
          <img 
            src="./logoprosur.png" 
            alt="Logo Prosur Fondo" 
            width={350}
            height={350}
            className="w-[60vw] max-w-xl animate-float object-contain" 
            aria-hidden="true" 
          />
        </div>
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMTM4LCAxNDEsIDE0MywgMC4xKSIvPjwvc3ZnPg==')] opacity-50"></div>
      </div>

      {/* Main Content Wrapper */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header currentView={view} onViewChange={setView} />
        <main className="flex-grow flex flex-col">
          {view === 'landing' ? (
            <>
              <Hero />
              <Prizes />
              <Rules />
              <Tips />
              <Timeline />
              
              {/* Sección de Comunidad e Innovación IA */}
              <section className="py-16 bg-gradient-to-b from-transparent to-white/40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                      Comunidad e Innovación IA
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-prosur-gray">
                      Explora los descubrimientos más recientes generados por IA y comparte herramientas clave con otros equipos.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Tarjeta de Tendencias de IA */}
                    <div 
                      onClick={() => {
                        setView('blog');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="group cursor-pointer relative bg-white/80 hover:bg-white backdrop-blur-md rounded-2xl p-8 border border-gray-200 hover:border-prosur-red/20 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-prosur-red/5 rounded-bl-full transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-300"></div>
                      <div>
                        <div className="inline-flex items-center justify-center p-3 bg-red-50 text-prosur-red rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                          <Newspaper className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-prosur-red transition-colors">
                          Tendencias de IA
                        </h3>
                        <p className="text-gray-500 leading-relaxed mb-6">
                          Monitoreo diario de los avances más importantes de la inteligencia artificial corporativa, sintetizados automáticamente por Gemini. Mantente a la vanguardia tecnológica.
                        </p>
                      </div>
                      <div className="flex items-center text-prosur-red font-semibold gap-2">
                        <span>Ver Tendencias Diarias</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>

                    {/* Tarjeta de Red de Herramientas */}
                    <div 
                      onClick={() => {
                        setView('social');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="group cursor-pointer relative bg-white/80 hover:bg-white backdrop-blur-md rounded-2xl p-8 border border-gray-200 hover:border-blue-500/20 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-bl-full transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-300"></div>
                      <div>
                        <div className="inline-flex items-center justify-center p-3 bg-blue-50 text-blue-500 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                          <Share2 className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-500 transition-colors">
                          Red de Herramientas
                        </h3>
                        <p className="text-gray-500 leading-relaxed mb-6">
                          Espacio colaborativo de la comunidad Prosur. Encuentra, comparte y vota por las herramientas de IA más eficientes para automatizar y mejorar tus tareas diarias.
                        </p>
                      </div>
                      <div className="flex items-center text-blue-500 font-semibold gap-2">
                        <span>Explorar Herramientas Compartidas</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <RegistrationTabs />
            </>
          ) : view === 'blog' ? (
            <Blog />
          ) : (
            <SocialNetwork />
          )}
        </main>
        <Footer />
        {view !== 'social' && <LiveChat />}
      </div>
    </div>
  );
}
