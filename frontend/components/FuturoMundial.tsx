import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  BarChart3, 
  Users, 
  ArrowLeft, 
  RotateCcw, 
  Send, 
  Globe, 
  TrendingUp, 
  TrendingDown, 
  Cpu, 
  Award, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Share2, 
  Briefcase, 
  Zap,
  BookOpen 
} from 'lucide-react';
import Chart from 'chart.js/auto';

interface FuturoMundialProps {
  setView: (view: string) => void;
}

interface WefItem {
  cat: 'empleos-crecimiento' | 'empleos-declive' | 'habilidades' | 'macrotendencias';
  rol: string;
  metric: string;
  tag: string;
  isPositive: boolean;
  fuente: string;
  desc: string;
}

// Base de datos auditada y verificada del World Economic Forum (WEF 2025)
const WEF_DATABASE: WefItem[] = [
  { 
    cat: 'empleos-crecimiento', 
    rol: 'Operadores de Maquinaria y Trabajadores Agrícolas', 
    metric: '+34.5 M', 
    tag: 'Volumen Bruto #1', 
    isPositive: true, 
    fuente: 'WEF 2025 · Tabla 2.1 (Puestos Esenciales)',
    desc: 'Mayor incremento absoluto de plazas a escala global derivado de la mecanización y soberanía alimentaria.' 
  },
  { 
    cat: 'empleos-crecimiento', 
    rol: 'Conductores de Carga y Reparto de Última Milla', 
    metric: '+10.0 M', 
    tag: 'Redes de Suministro', 
    isPositive: true, 
    fuente: 'WEF 2025 · Sector Logística',
    desc: 'Expansión continua de cadenas logísticas regionales, comercio electrónico y distribución capilar.' 
  },
  { 
    cat: 'empleos-crecimiento', 
    rol: 'Desarrolladores de Software y Aplicaciones', 
    metric: '+7.0 M', 
    tag: 'Infraestructura TI', 
    isPositive: true, 
    fuente: 'WEF 2025 · Tecnología y Telecomunicaciones',
    desc: 'Demanda de ingeniería de datos, ciberseguridad, integración de APIs y modernización de arquitecturas legacy.' 
  },
  { 
    cat: 'empleos-crecimiento', 
    rol: 'Especialistas en IA y Machine Learning', 
    metric: '+40% Rel.', 
    tag: 'Mayor Aceleración %', 
    isPositive: true, 
    fuente: 'WEF 2025 · Roles Emergentes Tecnológicos',
    desc: 'El perfil técnico con mayor tasa de crecimiento porcentual relativo entre 2025 y 2030.' 
  },
  { 
    cat: 'empleos-crecimiento', 
    rol: 'Especialistas en Sostenibilidad y Medio Ambiente', 
    metric: '+5.5 M', 
    tag: 'Transición Verde', 
    isPositive: true, 
    fuente: 'WEF 2025 · Energía y Recursos',
    desc: 'Impulsado por marcos regulatorios ESG globales, descarbonización industrial e inversiones en energías renovables.' 
  },
  { 
    cat: 'empleos-declive', 
    rol: 'Cajeros y Empleados de Boletería', 
    metric: '-13.5 M', 
    tag: 'Mayor Reducción Neta', 
    isPositive: false, 
    fuente: 'WEF 2025 · Comercio y Servicios',
    desc: 'Reducción estructural acelerada por terminales de autoservicio, banca móvil y pagos biométricos.' 
  },
  { 
    cat: 'empleos-declive', 
    rol: 'Secretarios y Asistentes Administrativos', 
    metric: '-6.0 M', 
    tag: 'Automatización Cognitiva', 
    isPositive: false, 
    fuente: 'WEF 2025 · Servicios Administrativos',
    desc: 'Desplazamiento por modelos de lenguaje en redacción documental, gestión de calendarios y síntesis de reuniones.' 
  },
  { 
    cat: 'empleos-declive', 
    rol: 'Personal de Registro y Entrada de Datos', 
    metric: '-3.0 M', 
    tag: 'Automatización RPA/OCR', 
    isPositive: false, 
    fuente: 'WEF 2025 · Procesamiento de Información',
    desc: 'Sustitución directa por tuberías ETL inteligentes, visión artificial y extracción autónoma de comprobantes.' 
  },
  { 
    cat: 'empleos-declive', 
    rol: 'Operadores de Telemarketing y Ventas Telefónicas', 
    metric: '-2.5 M', 
    tag: 'Agentes de Voz', 
    isPositive: false, 
    fuente: 'WEF 2025 · Canales de Contacto',
    desc: 'Transición masiva hacia interfaces de autoservicio conversacional y agentes sintéticos de atención 24/7.' 
  },
  { 
    cat: 'habilidades', 
    rol: 'Pensamiento Analítico y Resolución de Problemas', 
    metric: 'Top 1 Global', 
    tag: 'Competencia Primaria', 
    isPositive: true, 
    fuente: 'WEF 2025 · 73% de Empleadores',
    desc: 'Identificada por las empresas como la cualidad más crítica frente a escenarios no deterministas y datos complejos.' 
  },
  { 
    cat: 'habilidades', 
    rol: 'Alfabetización en IA y Manejo de Datos', 
    metric: '+88% Demanda', 
    tag: 'Adopción Técnica', 
    isPositive: true, 
    fuente: 'WEF 2025 · Encuesta de Transformación Digital',
    desc: 'Capacidad operativa para instruir modelos, estructurar prompts y validar resultados.' 
  },
  { 
    cat: 'habilidades', 
    rol: 'Resiliencia, Flexibilidad y Agilidad Cognitiva', 
    metric: 'Top 3 Global', 
    tag: 'Gestión del Cambio', 
    isPositive: true, 
    fuente: 'WEF 2025 · Competencias Humanas',
    desc: 'Capacidad de adaptación rápida ante reconfiguraciones de flujos de trabajo e incertidumbre operativa.' 
  },
  { 
    cat: 'macrotendencias', 
    rol: 'Transición Ecológica y Descarbonización', 
    metric: '+30 M Puestos', 
    tag: 'Macro-Motor #1', 
    isPositive: true, 
    fuente: 'WEF 2025 · Drivers de Crecimiento',
    desc: 'Principal motor no tecnológico de generación de empleo en manufactura limpia, construcción y movilidad.' 
  },
  { 
    cat: 'macrotendencias', 
    rol: 'Relocalización de Operaciones (Nearshoring)', 
    metric: '55% Empresas', 
    tag: 'Geopolítica y Comercio', 
    isPositive: true, 
    fuente: 'WEF 2025 · Cadenas de Suministro',
    desc: 'Priorización de la resiliencia y proximidad geográfica sobre la optimización extrema de costes laborales lejanos.' 
  },
  { 
    cat: 'macrotendencias', 
    rol: 'Integración Formal de Inteligencia Artificial', 
    metric: '88% Organizaciones', 
    tag: 'Transformación Tecnológica', 
    isPositive: true, 
    fuente: 'WEF 2025 · Adopción de Tecnologías Frontera',
    desc: 'El 88% de los empleadores globales reporta iniciativas en marcha para incorporar IA en sus procesos de negocio.' 
  }
];

export default function FuturoMundial({ setView }: FuturoMundialProps) {
  const chartCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);
  const chatStreamRef = useRef<HTMLDivElement | null>(null);

  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [chatMessages, setChatMessages] = useState<Array<{ sender: string; text: string; isAssistant?: boolean }>>([
    {
      sender: 'Observatorio Prosur',
      text: 'Bienvenido a la terminal de consulta económica. Todos los datos están referenciados y validados con el informe The Future of Jobs Report 2025 del Foro Económico Mundial (WEF Davos). Puedes formular consultas puntuales o seleccionar temas frecuentes.',
      isAssistant: true
    }
  ]);
  const [inputMessage, setInputMessage] = useState<string>('');

  // 1. Inicializar Gráfico Chart.js
  useEffect(() => {
    if (!chartCanvasRef.current) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = chartCanvasRef.current.getContext('2d');
    if (!ctx) return;

    chartInstanceRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [
          'Operadores Agrícolas',
          'Conductores y Reparto',
          'Desarrolladores Software',
          'Construcción y Edificación',
          'Ventas en Tienda',
          'Conserjes y Limpieza (-)',
          'Asistentes Administrativos (-)',
          'Cajeros y Boleteros (-)'
        ],
        datasets: [{
          label: 'Variación Neta en Millones (2025–2030)',
          data: [34.5, 10.0, 7.0, 6.5, 4.0, -3.0, -6.0, -13.5],
          backgroundColor: [
            '#1f2937', '#1f2937', '#1f2937', '#1f2937', '#1f2937',
            '#CC2027', '#CC2027', '#CC2027'
          ],
          borderRadius: 4,
          borderSkipped: false
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#111827',
            titleColor: '#ffffff',
            bodyColor: '#f3f4f6',
            borderColor: '#374151',
            borderWidth: 1,
            padding: 12,
            displayColors: false,
            callbacks: {
              title: (items) => items[0].label,
              label: (item) => {
                const val = item.raw as number;
                return `${val > 0 ? '+' : ''}${val} Millones de puestos proyectados`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(0, 0, 0, 0.04)' },
            ticks: { 
              color: '#4b5563', 
              font: { size: 11, weight: 'bold' },
              callback: (val) => `${(val as number) > 0 ? '+' : ''}${val}M`
            }
          },
          y: {
            grid: { display: false },
            ticks: { color: '#111827', font: { size: 11, weight: 600 } }
          }
        }
      }
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (chatStreamRef.current) {
      chatStreamRef.current.scrollTop = chatStreamRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const filteredItems = WEF_DATABASE.filter(item => {
    const matchCategory = activeFilter === 'all' || item.cat === activeFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchSearch = !q || item.rol.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q) || item.metric.toLowerCase().includes(q) || item.tag.toLowerCase().includes(q);
    return matchCategory && matchSearch;
  });

  const getBotResponse = (q: string): string => {
    const text = q.toLowerCase();
    if (text.includes("estrategia") || text.includes("empresa") || text.includes("reestructur") || text.includes("capacitar")) {
      return "Estrategias Empresariales ante la IA (Fig. 3.1 & 4.8):\n• 77% capacitará a su personal existente para colaborar con la IA.\n• 69% contratará ingenieros para desarrollar herramientas de IA a medida.\n• 62% contratará talento general con habilidades de IA.\n• 50% reorientará su modelo de negocio hacia oportunidades de IA.\n• 40% reducirá personal en áreas operativas automatizables.";
    }
    if (text.includes("habilidad") || text.includes("crecimiento") || text.includes("declin") || text.includes("skills")) {
      return "Evolución de Habilidades Clave (WEF 2025):\n• Crecimiento Neto Líder: IA y Big Data (+87%), Ciberseguridad (+70%), Alfabetización Tecnológica (+68%), Pensamiento Creativo (+66%), Resiliencia (+66%).\n• Declive Histórico: Destreza manual y precisión física caen por primera vez (-24% neto), Lectura y matemáticas básicas caen (-4% neto).\n• Disrupción: El 39% de las habilidades nucleares cambiarán al 2030.";
    }
    if (text.includes("volumen") || text.includes("crecen") || text.includes("agrícola") || text.includes("puestos")) {
      return "Mayores creadores en volumen absoluto (2025–2030):\n• Operadores y Técnicos Agrícolas (+34.5M)\n• Conductores de Transporte y Reparto (+10.0M)\n• Desarrolladores de Software y Apps (+7.0M)\n• Trabajadores de Construcción (+6.5M).";
    }
    if (text.includes("ia") || text.includes("digital") || text.includes("neto")) {
      return "Balance Neto Tecnológico Auditado WEF 2025:\n• 170 millones creados vs 92 millones desplazados (+78 millones neto positivo, +7%).\n• El acceso digital crea 19M vs 9M desplazados (+10M neto).\n• La IA crea 11M vs 9M desplazados (+2M neto).\n• 88% de empresas globales adoptan programas formales de IA.";
    }
    return "Metodología WEF The Future of Jobs Report 2025: Estudio representativo con 1,000+ empleadores globales, 14 millones de trabajadores y 55 economías. Proyecta una rotación laboral del 22% y una tasa de disrupción del 39% en competencias hacia 2030.";
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend !== undefined ? textToSend : inputMessage).trim();
    if (!query) return;

    const newMessages = [...chatMessages, { sender: 'Tú', text: query, isAssistant: false }];
    setChatMessages(newMessages);
    setInputMessage('');

    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        { sender: 'Observatorio Prosur', text: getBotResponse(query), isAssistant: true }
      ]);
    }, 250);
  };

  const handleClearChat = () => {
    setChatMessages([
      {
        sender: 'Observatorio Prosur',
        text: 'Sesión reiniciada. Puedes consultar cualquier cifra, rol o proyección oficial del informe WEF 2025–2030.',
        isAssistant: true
      }
    ]);
  };

  const workers = [
    ...Array(41).fill({ color: 'bg-emerald-600', label: '41 Estables: Sin necesidad urgente de reconversión' }),
    ...Array(29).fill({ color: 'bg-blue-600', label: '29 Upskilling: Capacitación requerida dentro de su rol' }),
    ...Array(19).fill({ color: 'bg-amber-500', label: '19 Reskilling: Reubicación / Transición a nuevo rol' }),
    ...Array(11).fill({ color: 'bg-[#CC2027]', label: '11 Alto Riesgo: Funciones en contracción estructural' })
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#111827] font-sans antialiased selection:bg-[#CC2027] selection:text-white">
      
      {/* Barra de Navegación Superior Corporativa */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-2xs">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-5">
            <button 
              onClick={() => setView('landing')} 
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700 hover:text-[#CC2027] border border-gray-200 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> 
              <span>Volver</span>
            </button>
            <div className="h-6 w-[1px] bg-gray-200 hidden sm:block"></div>
            <img src="/logoprosur.png" alt="Grupo PROSUR" className="h-9 sm:h-12 w-auto object-contain" />
            <span className="text-[12px] tracking-widest font-bold text-gray-400 uppercase hidden md:inline border-l border-gray-200 pl-4">
              INTELIGENCIA ESTRATÉGICA REGIONAL
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Acceso a Academia Prosur */}
            <button 
              onClick={() => setView('course')}
              className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-white bg-[#E30613] hover:bg-[#b80510] shadow-sm active:scale-95 transition-all cursor-pointer"
              title="Academia Prosur"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Academia Prosur</span>
              <span className="sm:hidden">Academia</span>
            </button>
            <div className="hidden sm:flex items-center gap-2 text-[11px] font-semibold text-gray-600 bg-gray-50 px-3.5 py-1.5 rounded-lg border border-gray-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Fuente Oficial: WEF Davos 2025</span>
            </div>
          </div>
        </div>
      </header>

      {/* Contenedor Principal */}
      <main className="max-w-[1600px] mx-auto p-6 lg:p-10 space-y-12">

        {/* Encabezado Institucional */}
        <div className="pb-8 border-b border-gray-200">
          <div className="flex flex-wrap items-center gap-2.5 text-[11px] tracking-wider uppercase font-semibold text-gray-500 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#CC2027]"></span>
              <span className="text-gray-900 font-bold tracking-widest">WORLD ECONOMIC FORUM</span>
            </div>
            <span className="text-gray-300">/</span>
            <span className="text-gray-600">THE FUTURE OF JOBS REPORT 2025–2030</span>
            <span className="text-gray-300">/</span>
            <span className="text-gray-500">DAVOS-KLOSTERS</span>
            <span className="ml-auto text-[10px] text-gray-500 font-mono tracking-normal bg-gray-100 px-2.5 py-0.5 rounded border border-gray-200">
              MUESTRA: 1,000+ EMPLEADORES · 14M TRABAJADORES · 55 ECONOMÍAS
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-4xl">
              <h1 className="text-3xl sm:text-5xl font-black text-[#111827] tracking-tight uppercase">
                Reconfiguración del Empleo Global <span className="text-[#CC2027]">2025–2030</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-3 font-normal leading-relaxed">
                Estudio cuantitativo sobre las transiciones de la fuerza laboral impulsadas por la adopción de inteligencia artificial, la transición energética y la relocalización de cadenas de suministro.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-400 font-semibold tracking-widest uppercase">
              <Globe className="w-4 h-4 text-gray-400" />
              <span>Horizonte Quinquenal</span>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* SECCIÓN 1: ESTRATEGIAS EMPRESARIALES FRENTE A LA IA (LO PRIMERO) */}
        {/* ============================================================ */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-gray-100 text-gray-700 text-xs font-bold uppercase tracking-wider mb-2">
                <Briefcase className="w-3.5 h-3.5 text-[#CC2027]" />
                <span>Adopción y Reestructuración Corporativa</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
                Estrategias Empresariales frente a la IA
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Cómo planean las empresas globales transformar sus plantillas en respuesta a la IA
              </p>
            </div>
            <span className="text-xs font-mono text-gray-400 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-2xs">
              Fuente: WEF 2025 · Fig. 3.1 & 4.8
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Columna Izquierda: Planes de Acción (Barras de Progreso) */}
            <div className="lg:col-span-8 p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-2xs space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h3 className="text-sm font-bold text-[#111827] uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#CC2027]" />
                  <span>Planes de Acción Empresarial ante la IA</span>
                </h3>
                <span className="text-[11px] text-gray-400 font-semibold">% de Empleadores</span>
              </div>

              <div className="space-y-5">
                {/* Item 1 */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs sm:text-sm">
                    <span className="font-semibold text-gray-900">Capacitar al personal existente para colaborar con la IA</span>
                    <span className="font-bold text-gray-900 font-mono">77% de empleadores</span>
                  </div>
                  <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-600 rounded-full transition-all duration-700" style={{ width: '77%' }}></div>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs sm:text-sm">
                    <span className="font-semibold text-gray-900">Contratar ingenieros para diseñar herramientas de IA específicas</span>
                    <span className="font-bold text-gray-900 font-mono">69% de empleadores</span>
                  </div>
                  <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-500 rounded-full transition-all duration-700" style={{ width: '69%' }}></div>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs sm:text-sm">
                    <span className="font-semibold text-gray-900">Contratar talento general con habilidades para trabajar con IA</span>
                    <span className="font-bold text-gray-900 font-mono">62% de empleadores</span>
                  </div>
                  <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full transition-all duration-700" style={{ width: '62%' }}></div>
                  </div>
                </div>

                {/* Item 4 */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs sm:text-sm">
                    <span className="font-semibold text-gray-900">Reorientar el modelo de negocio hacia oportunidades creadas por la IA</span>
                    <span className="font-bold text-gray-900 font-mono">50% de empleadores</span>
                  </div>
                  <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 rounded-full transition-all duration-700" style={{ width: '50%' }}></div>
                  </div>
                </div>

                {/* Item 5 (Reducción en rojo Prosur) */}
                <div className="space-y-2 pt-1 border-t border-gray-100">
                  <div className="flex justify-between items-center text-xs sm:text-sm">
                    <span className="font-semibold text-[#CC2027]">Reducir personal en áreas operativas automatizables por IA</span>
                    <span className="font-bold text-[#CC2027] font-mono">40% de empleadores</span>
                  </div>
                  <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#CC2027] rounded-full transition-all duration-700" style={{ width: '40%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Columna Derecha: Iniciativas Institucionales */}
            <div className="lg:col-span-4 flex flex-col gap-5 justify-between">
              
              {/* Tarjeta Reskilling Revolution */}
              <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-2xs flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center gap-2.5 text-[#111827] font-bold text-sm mb-3">
                    <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
                      <Award className="w-4 h-4" />
                    </div>
                    <span>Reskilling Revolution (WEF)</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Iniciativa global con la meta de brindar mejor educación, habilidades y oportunidades a <strong>1,000 millones de personas</strong> para 2030.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <span className="inline-block text-[11px] font-bold px-3 py-1.5 rounded-lg bg-gray-100 text-gray-800">
                    Meta: 1 Mil Millones de Personas
                  </span>
                </div>
              </div>

              {/* Tarjeta Jobs Initiative */}
              <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-2xs flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center gap-2.5 text-[#111827] font-bold text-sm mb-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
                      <Share2 className="w-4 h-4" />
                    </div>
                    <span>Jobs Initiative</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Red multisectorial de gobiernos, empresas y academia para co-diseñar los empleos del mañana y garantizar transiciones de empleo seguras para trabajadores desplazados.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <span className="inline-block text-[11px] font-bold px-3 py-1.5 rounded-lg bg-gray-100 text-gray-800">
                    Alianza Público-Privada Global
                  </span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECCIÓN 2: EVOLUCIÓN DE HABILIDADES CLAVE (SEGUNDO)          */}
        {/* ============================================================ */}
        <section className="space-y-6 pt-4 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-gray-100 text-gray-700 text-xs font-bold uppercase tracking-wider mb-2">
                <Zap className="w-3.5 h-3.5 text-[#CC2027]" />
                <span>Transformación del Talento</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
                Evolución de Habilidades Clave
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Crecimiento neto de demanda por empleadores vs primer declive histórico de habilidades físicas
              </p>
            </div>

            <div className="px-3.5 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
              Disrupción global: <span className="font-bold text-amber-900">39% de habilidades</span> cambiarán para 2030
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Columna Izquierda: Top Habilidades en Crecimiento (1 a 6 + Grid 7 a 10) */}
            <div className="lg:col-span-8 p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-2xs space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h3 className="text-sm font-bold text-[#111827] uppercase tracking-wider flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span>Top Habilidades con Mayor Crecimiento Neto (+%)</span>
                </h3>
                <span className="text-[11px] text-gray-400 font-semibold">Balance Neto Demanda</span>
              </div>

              {/* Lista 1 a 6 con barras */}
              <div className="space-y-4">
                {[
                  { pos: '1', name: 'Inteligencia Artificial y Big Data', pct: '+87% neto', width: '87%', color: 'bg-teal-500' },
                  { pos: '2', name: 'Redes y Ciberseguridad', pct: '+70% neto', width: '70%', color: 'bg-teal-600' },
                  { pos: '3', name: 'Alfabetización Tecnológica', pct: '+68% neto', width: '68%', color: 'bg-teal-600' },
                  { pos: '4', name: 'Pensamiento Creativo', pct: '+66% neto', width: '66%', color: 'bg-blue-600' },
                  { pos: '5', name: 'Resiliencia, Flexibilidad y Agilidad', pct: '+66% neto', width: '66%', color: 'bg-blue-600' },
                  { pos: '6', name: 'Curiosidad y Aprendizaje Continuo', pct: '+61% neto', width: '61%', color: 'bg-blue-500' },
                ].map((item, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs sm:text-sm">
                      <span className="font-semibold text-gray-900">{item.pos}. {item.name}</span>
                      <span className="font-bold text-teal-700 font-mono text-xs">{item.pct}</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color} rounded-full transition-all duration-700`} style={{ width: item.width }}></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Grid 7 a 10 */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100">
                <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200">
                  <div className="text-xs text-gray-500">7. Liderazgo e Influencia</div>
                  <div className="text-base font-bold text-gray-900 font-mono mt-0.5">+58% neto</div>
                </div>
                <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200">
                  <div className="text-xs text-gray-500">8. Gestión del Talento</div>
                  <div className="text-base font-bold text-gray-900 font-mono mt-0.5">+58% neto</div>
                </div>
                <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200">
                  <div className="text-xs text-gray-500">9. Pensamiento Analítico</div>
                  <div className="text-base font-bold text-gray-900 font-mono mt-0.5">+55% neto</div>
                </div>
                <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200">
                  <div className="text-xs text-gray-500">10. Gestión Ambiental</div>
                  <div className="text-base font-bold text-gray-900 font-mono mt-0.5">+53% neto</div>
                </div>
              </div>
            </div>

            {/* Columna Derecha: Habilidades en Declive & Combinación Humano-Técnica */}
            <div className="lg:col-span-4 flex flex-col gap-5 justify-between">
              
              {/* Tarjeta Hito Histórico: Declive Neto */}
              <div className="p-6 rounded-2xl bg-white border border-red-200/80 shadow-2xs flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center gap-2.5 text-[#CC2027] font-bold text-sm mb-2">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Hito Histórico: Habilidades en Declive</span>
                  </div>
                  <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                    Por <strong>primera vez en la historia</strong> del reporte del WEF, las capacidades de tipo netamente físico registran un declive global neto:
                  </p>

                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-red-50/60 border border-red-100">
                      <div className="flex justify-between items-center text-xs font-bold text-[#CC2027]">
                        <span>Destreza Manual, Resistencia y Precisión</span>
                        <span className="font-mono">-24% neto</span>
                      </div>
                      <p className="text-[11px] text-gray-500 mt-1">Reemplazada por robótica industrial, sensores y maquinaria automatizada.</p>
                    </div>

                    <div className="p-3 rounded-xl bg-red-50/60 border border-red-100">
                      <div className="flex justify-between items-center text-xs font-bold text-[#CC2027]">
                        <span>Lectura, Escritura y Matemáticas Básicas</span>
                        <span className="font-mono">-4% neto</span>
                      </div>
                      <p className="text-[11px] text-gray-500 mt-1">Desplazamiento de tareas mecánicas por modelos de lenguaje e interfaces.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tarjeta Combinación Humano-Técnica */}
              <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-2xs flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider mb-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Combinación Humano-Técnica</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    El informe subraya que el éxito laboral hacia 2030 no radica solo en conocimientos técnicos de código, sino en la sinergia entre <strong>habilidades cognitivas humanas</strong> (pensamiento creativo, resiliencia, empatía con +46%) y <strong>alfabetización en IA</strong>.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 text-[11px] text-gray-400 font-semibold">
                  Eje Pedagógico del Grupo Prosur
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECCIÓN 3: PANEL DE 8 KPIS MACROECONÓMICOS                   */}
        {/* ============================================================ */}
        <section className="space-y-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Métricas Macroeconómicas Clave (WEF 2025)</span>
            <span className="text-[11px] text-gray-400">Proyección agregada a 2030</span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-xl bg-white border border-gray-200 shadow-2xs hover:border-gray-300 transition-all">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Creación Bruta</span>
                <TrendingUp className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-3xl sm:text-4xl font-black text-[#111827] my-1 tracking-tight">170 M</div>
              <div className="text-xs font-semibold text-emerald-700">+14% del empleo encuestado</div>
              <div className="text-[10px] text-gray-400 mt-2 pt-2 border-t border-gray-100">Roles tecnológicos y de primera línea</div>
            </div>

            <div className="p-5 rounded-xl bg-white border border-gray-200 shadow-2xs hover:border-gray-300 transition-all">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Desplazamiento</span>
                <TrendingDown className="w-4 h-4 text-[#CC2027]" />
              </div>
              <div className="text-3xl sm:text-4xl font-black text-[#111827] my-1 tracking-tight">92 M</div>
              <div className="text-xs font-semibold text-[#CC2027]">8% de puestos obsoletos</div>
              <div className="text-[10px] text-gray-400 mt-2 pt-2 border-t border-gray-100">Clericales, cajas y captura de datos</div>
            </div>

            <div className="p-5 rounded-xl bg-white border border-gray-200 shadow-2xs hover:border-gray-300 transition-all">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Balance Neto Global</span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Neto</span>
              </div>
              <div className="text-3xl sm:text-4xl font-black text-[#111827] my-1 tracking-tight">+78 M</div>
              <div className="text-xs font-semibold text-emerald-700">+7% de expansión neta</div>
              <div className="text-[10px] text-gray-400 mt-2 pt-2 border-t border-gray-100">Mayor creación que destrucción</div>
            </div>

            <div className="p-5 rounded-xl bg-white border border-gray-200 shadow-2xs hover:border-gray-300 transition-all">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Rotación Laboral (Churn)</span>
                <span className="text-[10px] font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded">Estructural</span>
              </div>
              <div className="text-3xl sm:text-4xl font-black text-[#111827] my-1 tracking-tight">22%</div>
              <div className="text-xs font-semibold text-gray-600">Reasignación de puestos</div>
              <div className="text-[10px] text-gray-400 mt-2 pt-2 border-t border-gray-100">1 de cada 5 roles cambiará de perfil</div>
            </div>

            <div className="p-5 rounded-xl bg-white border border-gray-200 shadow-2xs hover:border-gray-300 transition-all">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Disrupción de Habilidades</span>
                <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">Skills</span>
              </div>
              <div className="text-3xl sm:text-4xl font-black text-[#111827] my-1 tracking-tight">39%</div>
              <div className="text-xs font-semibold text-amber-700">Habilidades transformadas</div>
              <div className="text-[10px] text-gray-400 mt-2 pt-2 border-t border-gray-100">Exige reskilling continuo al 2030</div>
            </div>

            <div className="p-5 rounded-xl bg-white border border-gray-200 shadow-2xs hover:border-gray-300 transition-all">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Asignación Salarial</span>
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">Presupuesto</span>
              </div>
              <div className="text-3xl sm:text-4xl font-black text-[#111827] my-1 tracking-tight">52%</div>
              <div className="text-xs font-semibold text-blue-700">Aumentará presupuestos</div>
              <div className="text-[10px] text-gray-400 mt-2 pt-2 border-t border-gray-100">Para retención de perfiles especializados</div>
            </div>

            <div className="p-5 rounded-xl bg-white border border-gray-200 shadow-2xs hover:border-gray-300 transition-all">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Adopción Tecnológica</span>
                <Cpu className="w-4 h-4 text-[#CC2027]" />
              </div>
              <div className="text-3xl sm:text-4xl font-black text-[#111827] my-1 tracking-tight">88%</div>
              <div className="text-xs font-semibold text-[#CC2027]">Programas de IA activos</div>
              <div className="text-[10px] text-gray-400 mt-2 pt-2 border-t border-gray-100">Integración en flujos y copilotos</div>
            </div>

            <div className="p-5 rounded-xl bg-white border border-gray-200 shadow-2xs hover:border-gray-300 transition-all">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Gobernanza y Diversidad</span>
                <Award className="w-4 h-4 text-purple-600" />
              </div>
              <div className="text-3xl sm:text-4xl font-black text-[#111827] my-1 tracking-tight">83%</div>
              <div className="text-xs font-semibold text-purple-700">Prioridad DEI sostenida</div>
              <div className="text-[10px] text-gray-400 mt-2 pt-2 border-t border-gray-100">Inclusión como eje de captación</div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECCIÓN 4: BASE DE DATOS Y FILTRO DE ROLES                   */}
        {/* ============================================================ */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
            <div>
              <h3 className="text-sm font-bold text-[#111827] uppercase tracking-wider flex items-center gap-2">
                <Search className="w-4 h-4 text-[#CC2027]" />
                <span>Explorador de Hallazgos en Tiempo Real</span>
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">Búsqueda directa sobre la base de datos indexada del informe.</p>
            </div>
            <span className="text-xs font-mono font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded">
              {filteredItems.length} registros encontrados
            </span>
          </div>

          {/* Input de Búsqueda */}
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por rol o competencia (ej: 'IA', 'Agrícolas', 'Cajeros', 'Software', 'Reskilling')..."
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 text-xs sm:text-sm font-medium focus:outline-none focus:bg-white focus:border-[#CC2027] focus:ring-2 focus:ring-red-600/10 transition-all"
            />
          </div>

          {/* Filtros Funcionales */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'Todos los Registros' },
              { id: 'empleos-crecimiento', label: 'Roles en Expansión' },
              { id: 'empleos-declive', label: 'Roles en Contracción' },
              { id: 'habilidades', label: 'Habilidades Críticas' },
              { id: 'macrotendencias', label: 'Macrotendencias Globales' },
            ].map(tab => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer ${
                    isActive 
                      ? 'bg-[#111827] text-white shadow-2xs' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200/80 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Grid de Registros */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[380px] overflow-y-auto p-1">
            {filteredItems.length === 0 ? (
              <div className="col-span-full py-12 text-center text-gray-400 text-xs font-semibold uppercase tracking-wider">
                No se encontraron registros para los criterios seleccionados.
              </div>
            ) : (
              filteredItems.map((item, idx) => (
                <div 
                  key={idx} 
                  className="p-4 rounded-xl bg-gray-50/70 hover:bg-white border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-xs font-bold text-gray-900 leading-snug">
                        {item.rol}
                      </span>
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded whitespace-nowrap ${
                        item.isPositive 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                          : 'bg-red-50 text-[#CC2027] border border-red-200'
                      }`}>
                        {item.metric}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed font-normal">{item.desc}</p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-gray-200/70 flex items-center justify-between text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
                    <span>{item.tag}</span>
                    <span className="text-gray-400">{item.fuente}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ============================================================ */}
        {/* SECCIÓN 5: VISUALIZACIÓN GRÁFICA & 100 TRABAJADORES          */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Gráfico Horizontal Chart.js */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-[#111827] uppercase tracking-wider flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-[#CC2027]" />
                  <span>Balance de Roles Clave (Millones de Puestos)</span>
                </h3>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Fuente: WEF Davos
                </span>
              </div>
              <p className="text-xs text-gray-500 mb-6 leading-relaxed">
                Contraste entre los roles de mayor generación absoluta en la economía real versus las ocupaciones administrativas con mayor desplazamiento por automatización.
              </p>
            </div>
            
            <div className="h-72 w-full">
              <canvas ref={chartCanvasRef}></canvas>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500 font-medium">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-[#1f2937] rounded-xs"></span> Creación Neta Absoluta</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-[#CC2027] rounded-xs"></span> Contracción / Desplazamiento</span>
            </div>
          </div>

          {/* Simulador 100 Trabajadores */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-[#111827] uppercase tracking-wider flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#CC2027]" />
                  <span>Modelo de los 100 Trabajadores</span>
                </h3>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest bg-gray-100 px-2 py-0.5 rounded">
                  Tasa de Reskilling 2030
                </span>
              </div>
              <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                De cada 100 trabajadores en la muestra global, 59 requerirán intervención de capacitación (29 upskilling en su puesto, 19 reubicación y 11 en riesgo severo).
              </p>
              
              <div className="grid grid-cols-10 gap-1.5 p-3.5 bg-gray-50 rounded-xl border border-gray-200">
                {workers.map((w, index) => (
                  <div
                    key={index}
                    title={w.label}
                    className={`w-full aspect-square rounded-xs ${w.color} opacity-95 hover:opacity-100 hover:scale-125 transition-all cursor-pointer`}
                  />
                ))}
              </div>
            </div>

            <div className="text-xs text-gray-700 mt-6 pt-4 border-t border-gray-100 flex flex-wrap gap-3 justify-between font-semibold">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-xs bg-emerald-600"></span> 41 Estables</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-xs bg-blue-600"></span> 29 Upskilling</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-xs bg-amber-500"></span> 19 Reskilling</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-xs bg-[#CC2027]"></span> 11 Riesgo</span>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* SECCIÓN 6: TERMINAL DE CONSULTA REFERENCIADA                 */}
        {/* ============================================================ */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-2xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-700">
                <FileText className="w-4 h-4 text-[#CC2027]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#111827] uppercase tracking-wider">
                  Terminal de Consulta de Inteligencia Económica
                </h3>
                <p className="text-xs text-gray-500 font-normal">
                  Indexación directa del reporte oficial del Foro Económico Mundial
                </p>
              </div>
            </div>

            <button 
              onClick={handleClearChat}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 text-xs font-semibold transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" /> 
              <span>Limpiar Consulta</span>
            </button>
          </div>

          {/* Consultas Sugeridas */}
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => handleSendMessage('¿Cuáles son las estrategias empresariales frente a la IA?')}
              className="text-xs px-3 py-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 transition-colors font-medium cursor-pointer"
            >
              Estrategias empresariales ante IA
            </button>
            <button 
              onClick={() => handleSendMessage('¿Cuáles son las habilidades con mayor crecimiento neto?')}
              className="text-xs px-3 py-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 transition-colors font-medium cursor-pointer"
            >
              Evolución de habilidades clave
            </button>
            <button 
              onClick={() => handleSendMessage('¿Cuáles empleos crecen más en volumen?')}
              className="text-xs px-3 py-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 transition-colors font-medium cursor-pointer"
            >
              Crecimiento por volumen de puestos
            </button>
            <button 
              onClick={() => handleSendMessage('¿Qué habilidades declinan por primera vez?')}
              className="text-xs px-3 py-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 transition-colors font-medium cursor-pointer"
            >
              Habilidades en declive físico
            </button>
          </div>

          {/* Historial de Respuestas */}
          <div ref={chatStreamRef} className="space-y-3.5 max-h-60 overflow-y-auto p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs">
            {chatMessages.map((msg, i) => (
              <div key={i} className="flex gap-3">
                <span className={`font-bold uppercase tracking-wider shrink-0 ${msg.isAssistant ? 'text-[#CC2027]' : 'text-gray-900'}`}>
                  {msg.sender}:
                </span>
                <span className="text-gray-800 leading-relaxed whitespace-pre-line font-normal">{msg.text}</span>
              </div>
            ))}
          </div>

          {/* Formulario de Consulta */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} 
            className="flex gap-2.5"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Escribe tu consulta sobre los datos del informe WEF..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs sm:text-sm text-gray-900 placeholder-gray-400 font-medium focus:outline-none focus:bg-white focus:border-[#CC2027] focus:ring-2 focus:ring-red-600/10 transition-all"
            />
            <button 
              type="submit" 
              className="px-5 py-2.5 rounded-xl bg-[#CC2027] hover:bg-[#b01b21] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-2xs flex items-center gap-2 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Consultar</span>
            </button>
          </form>
        </div>

      </main>
    </div>
  );
}
