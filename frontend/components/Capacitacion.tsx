import React, { useEffect, useRef } from 'react';
import Reveal, { RevealApi } from 'reveal.js';
import 'reveal.js/reveal.css';
import 'reveal.js/theme/white.css';

export default function Capacitacion() {
  const deckDivRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<RevealApi | null>(null);

  useEffect(() => {
    if (deckRef.current || !deckDivRef.current) return;

    const deck = new Reveal(deckDivRef.current, {
      embedded: false,
      hash: true,
      controls: true,
      progress: true,
      center: true,
      transition: 'slide',
    });
    deck.initialize();
    deckRef.current = deck;

    return () => {
      try {
        deckRef.current?.destroy();
      } catch (e) {
        // reveal.js puede lanzar si el nodo ya no está montado
      }
      deckRef.current = null;
    };
  }, []);

  return (
    <div className="reveal" ref={deckDivRef} style={{ height: '100vh' }}>
      <style>{`
        .reveal { --r-heading-color: #CC2027; --r-link-color: #CC2027; }
        .reveal .slides section { text-align: left; }
        .reveal h1, .reveal h2 { color: #CC2027; }
        .reveal .volver { color: #8A8D8F; font-size: 0.4em; }
      `}</style>
      <div className="slides">
        <section>
          <a href="/" className="volver">&larr; Volver al sitio del Reto</a>
          <h1>Capacitación</h1>
          <h3 style={{ color: '#8A8D8F' }}>Reto de Inteligencia Artificial &mdash; Grupo Prosur</h3>
        </section>

        <section>
          <h2>Agenda</h2>
          <ul>
            <li>Tema 1 &mdash; pendiente</li>
            <li>Tema 2 &mdash; pendiente</li>
            <li>Tema 3 &mdash; pendiente</li>
            <li>Preguntas y cierre</li>
          </ul>
        </section>

        <section>
          <h2>Tema 1</h2>
          <p>Contenido pendiente.</p>
        </section>

        <section>
          <h2>Tema 2</h2>
          <p>Contenido pendiente.</p>
        </section>

        <section>
          <h2>Tema 3</h2>
          <p>Contenido pendiente.</p>
        </section>

        <section>
          <h2>¡Gracias!</h2>
          <p>Preguntas y cierre.</p>
        </section>
      </div>
    </div>
  );
}
