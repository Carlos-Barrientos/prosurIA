import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { 
  Building2, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Calendar, 
  Users, 
  Video, 
  Code2, 
  FileText, 
  Layers, 
  ArrowLeft, 
  LogOut, 
  Plus, 
  Trash2, 
  ExternalLink, 
  Clock, 
  Search, 
  Filter, 
  Eye, 
  Sparkles, 
  Lock, 
  Mail, 
  User, 
  Award,
  ChevronRight,
  Upload,
  Play,
  CheckSquare,
  Square
} from 'lucide-react';

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

export interface Company {
  id: string;
  name: string;
  logo: string;
  subtitle: string;
  badgeColor: string;
}

export const PARTICIPATING_COMPANIES: Company[] = [
  { id: 'prosur', name: 'Grupo Prosur', logo: '/companies/prosur.png', subtitle: 'Desarrollo para todas las empresas', badgeColor: 'border-red-200 bg-red-50 text-red-700' },
  { id: 'chesa', name: 'Chesa', logo: '/companies/chesa.png', subtitle: 'Grupo Automotríz', badgeColor: 'border-gray-200 bg-gray-50 text-gray-800' },
  { id: 'comercialtos', name: 'Comercialtos', logo: '/companies/comercialtos.jpg', subtitle: 'Comercialización y Abasto', badgeColor: 'border-amber-200 bg-amber-50 text-amber-800' },
  { id: 'cincopinos', name: 'Cinco Pinos', logo: '/companies/cincopinos.png', subtitle: 'Inmobiliaria y Proyectos', badgeColor: 'border-emerald-200 bg-emerald-50 text-emerald-800' },
  { id: 'cai', name: 'CAI', logo: '/companies/cai.png', subtitle: 'Futuro Activo A.C.', badgeColor: 'border-blue-200 bg-blue-50 text-blue-800' },
  { id: 'cafi', name: 'CAFI', logo: '/companies/cafi.png', subtitle: 'Tu Casa Financiera', badgeColor: 'border-orange-200 bg-orange-50 text-orange-800' },
  { id: 'riovinyl', name: 'Rio Vinyl', logo: '/companies/riovinyl.png', subtitle: 'Rio Vinyl de México', badgeColor: 'border-teal-200 bg-teal-50 text-teal-800' },
  { id: 'calzamoda', name: 'Calzamoda', logo: '/companies/calzamoda.png', subtitle: 'Calzado y Retail', badgeColor: 'border-lime-200 bg-lime-50 text-lime-800' },
  { id: 'insumos_sureste', name: 'Insumos del Sureste', logo: '/companies/insumos_sureste.png', subtitle: 'Insumos Industriales', badgeColor: 'border-rose-200 bg-rose-50 text-rose-800' },
  { id: 'otros', name: 'Otros', logo: '/companies/prosur.png', subtitle: 'Otra Empresa o Área', badgeColor: 'border-slate-200 bg-slate-50 text-slate-700' },
];

export const CATEGORIES = [
  { id: 'A', name: 'Finanzas, Contabilidad y Tesorería' },
  { id: 'B', name: 'Operaciones, Taller y Logística' },
  { id: 'C', name: 'Ventas y Marketing' },
  { id: 'D', name: 'Capital Humano y Compliance' },
  { id: 'E', name: 'Tecnología e Innovación' },
];

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
}

export interface Milestone {
  id: string;
  title: string;
  date: string;
  description: string;
  completed: boolean;
}

export interface ProjectData {
  id: string;
  userId: string;
  title: string;
  companyId: string;
  categoryId: string;
  scope: string;
  problem: string;
  solution: string;
  verifiableMetrics: string;
  githubUrl: string;
  youtubeUrl: string;
  imageUrls: string[];
  members: TeamMember[];
  milestones: Milestone[];
  demoStatus: 'pending' | 'scheduled' | 'approved' | 'adjustments';
  demoDate?: string;
  complianceChecks: { [key: string]: boolean };
  securityChecks: { [key: string]: boolean };
  updatedAt: string;
}

interface ProjectPortalProps {
  onBack: () => void;
  initialCategory?: string | null;
}

export default function ProjectPortal({ onBack, initialCategory }: ProjectPortalProps) {
  const [currentUser, setCurrentUser] = useState<{ email: string; name: string; role: 'participant' | 'admin'; companyId: string } | null>(() => {
    const saved = localStorage.getItem('prosur_portal_user');
    if (saved) {
      try {
        const u = JSON.parse(saved);
        if (u) {
          const email = (u.email || '').toLowerCase().trim();
          const isCarlos = (email.includes('carlos') || email.includes('gerencia.mejoracontinua')) && email.endsWith('@prosur.com.mx');
          const isDario = email.includes('dario') && email.endsWith('@prosur.com.mx');
          if (isCarlos) {
            u.name = 'Carlos Barrientos';
            u.role = 'admin';
          } else if (isDario) {
            u.name = 'Dario Gonzalez';
            u.role = 'admin';
          } else {
            u.role = 'participant';
            u.name = (u.name || '').replace(/\s*\(.*?\)/g, '').trim() || email.split('@')[0];
          }
          localStorage.setItem('prosur_portal_user', JSON.stringify(u));
          return u;
        }
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [authCompany, setAuthCompany] = useState('prosur');
  const [authCategory, setAuthCategory] = useState(initialCategory || 'A');

  const [activeTab, setActiveTab] = useState<'project' | 'team' | 'checklists' | 'milestones' | 'demo'>('project');
  const [project, setProject] = useState<ProjectData>(() => {
    const saved = localStorage.getItem('prosur_current_project');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.title && parsed.title !== 'Automatización Inteligente de Procesos Operativos') {
          return parsed;
        }
      } catch (e) {
        // ignore
      }
    }
    return {
      id: 'proj-' + Date.now(),
      userId: 'local-user',
      title: '',
      companyId: 'prosur',
      categoryId: initialCategory || 'A',
      scope: '',
      problem: '',
      solution: '',
      verifiableMetrics: '',
      githubUrl: '',
      youtubeUrl: '',
      imageUrls: [],
      members: [],
      milestones: [
        { id: 'm1', title: 'Registro y Definición del Alcance', date: '7 Septiembre 2026', description: 'Presentación formal del problema operativo, alcance y equipo de trabajo.', completed: false },
        { id: 'm2', title: 'Prototipo Funcional en Entorno de Pruebas', date: '15 Octubre 2026', description: 'Primer piloto con usuarios operativos de la empresa seleccionada.', completed: false },
        { id: 'm3', title: 'Auditoría de Seguridad y Demo de Validación', date: '20 Noviembre 2026', description: 'Revisión técnica de métricas antes vs después y verificación de seguridad.', completed: false },
        { id: 'm4', title: 'Pitch Final y Gran Concurso', date: '12 Enero 2027', description: 'Presentación ejecutiva final ante directores y jurado evaluador.', completed: false }
      ],
      demoStatus: 'pending',
      complianceChecks: {
        problem_defined: false,
        functional_solution: false,
        verifiable_metrics: false,
        company_endorsed: false,
        repo_available: false
      },
      securityChecks: {
        no_hardcoded_keys: false,
        no_pii_public_models: false,
        human_in_the_loop: false,
        ip_compliance: false
      },
      updatedAt: new Date().toISOString()
    };
  });

  const [adminCompanyFilter, setAdminCompanyFilter] = useState<string>('all');
  const [adminCategoryFilter, setAdminCategoryFilter] = useState<string>('all');
  const [adminSearch, setAdminSearch] = useState('');
  
  const [allProjects, setAllProjects] = useState<ProjectData[]>(() => {
    const saved = localStorage.getItem('prosur_all_projects_db');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const real = parsed.filter((p: any) => !['p1', 'p2', 'p3', 'p4'].includes(p.id));
        return real;
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    // Limpieza de datos dummy anteriores en localStorage
    const saved = localStorage.getItem('prosur_all_projects_db');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const real = parsed.filter((p: any) => !['p1', 'p2', 'p3', 'p4'].includes(p.id));
        if (real.length !== parsed.length) {
          localStorage.setItem('prosur_all_projects_db', JSON.stringify(real));
          setAllProjects(real);
        }
      } catch {
        localStorage.removeItem('prosur_all_projects_db');
      }
    }

    const currentSaved = localStorage.getItem('prosur_current_project');
    if (currentSaved) {
      try {
        const parsed = JSON.parse(currentSaved);
        if (parsed?.title === 'Automatización Inteligente de Procesos Operativos') {
          localStorage.removeItem('prosur_current_project');
        }
      } catch {
        localStorage.removeItem('prosur_current_project');
      }
    }

    async function loadFromSupabase() {
      try {
        const { data, error } = await supabase.from('projects').select('*, team_members(*), project_milestones(*)');
        if (!error && data) {
          const mapped: ProjectData[] = data.map((p: any) => ({
            id: p.id,
            userId: p.user_id,
            title: p.title || '',
            companyId: p.company_id || 'prosur',
            categoryId: p.category_id || 'A',
            scope: p.scope || '',
            problem: p.problem || '',
            solution: p.solution || '',
            verifiableMetrics: p.verifiable_metrics || '',
            githubUrl: p.github_url || '',
            youtubeUrl: p.youtube_url || '',
            imageUrls: [],
            members: (p.team_members || []).map((m: any) => ({
              id: m.id,
              name: m.name,
              role: m.role || '',
              email: m.email || '',
              phone: m.phone || ''
            })),
            milestones: (p.project_milestones || []).map((ms: any) => ({
              id: ms.id,
              title: ms.title,
              date: ms.date,
              description: ms.description || '',
              completed: ms.completed || false
            })),
            demoStatus: p.demo_status || 'pending',
            demoDate: p.demo_date,
            complianceChecks: p.compliance_checks || {},
            securityChecks: p.security_checks || {},
            updatedAt: p.updated_at
          }));
          setAllProjects(mapped);
          localStorage.setItem('prosur_all_projects_db', JSON.stringify(mapped));
        }
      } catch (err) {
        console.log('Supabase sync info:', err);
      }
    }
    loadFromSupabase();
  }, []);

  const handleSaveProject = async () => {
    localStorage.setItem('prosur_current_project', JSON.stringify(project));
    setAllProjects(prev => {
      const idx = prev.findIndex(p => p.id === project.id);
      const updated = idx >= 0 ? prev.map(p => p.id === project.id ? project : p) : [project, ...prev];
      localStorage.setItem('prosur_all_projects_db', JSON.stringify(updated));
      return updated;
    });

    try {
      await supabase.from('projects').upsert({
        title: project.title,
        company_id: project.companyId,
        category_id: project.categoryId,
        scope: project.scope,
        problem: project.problem,
        solution: project.solution,
        verifiable_metrics: project.verifiableMetrics,
        github_url: project.githubUrl,
        youtube_url: project.youtubeUrl,
        compliance_checks: project.complianceChecks,
        security_checks: project.securityChecks,
        updated_at: new Date().toISOString()
      });
    } catch (e) {
      console.log('Cloud sync saved', e);
    }

    alert('¡Proyecto guardado con éxito y sincronizado con Supabase!');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const email = authEmail.trim();
    if (!email) return;

    const normalizedEmail = email.toLowerCase();
    const isProsur = normalizedEmail.endsWith('@prosur.com.mx');
    const isCarlos = isProsur && (normalizedEmail.includes('carlos') || normalizedEmail.includes('gerencia.mejoracontinua'));
    const isDario = isProsur && normalizedEmail.includes('dario');

    // Administradores exclusivos: Carlos Barrientos y Dario Gonzalez
    if (isCarlos) {
      if (authPassword !== 'CarloZ369++--') {
        alert('Contraseña incorrecta para el acceso de Administrador.');
        return;
      }
      const adminUser = {
        email: email,
        name: 'Carlos Barrientos',
        role: 'admin' as const,
        companyId: 'prosur'
      };
      setCurrentUser(adminUser);
      localStorage.setItem('prosur_portal_user', JSON.stringify(adminUser));
      return;
    }

    if (isDario) {
      if (authPassword !== 'Dario369++--') {
        alert('Contraseña incorrecta para el acceso de Administrador.');
        return;
      }
      const adminUser = {
        email: email,
        name: 'Dario Gonzalez',
        role: 'admin' as const,
        companyId: 'prosur'
      };
      setCurrentUser(adminUser);
      localStorage.setItem('prosur_portal_user', JSON.stringify(adminUser));
      return;
    }

    // Todos los demás usuarios son estrictamente Participantes
    const cleanName = (authName.trim() || email.split('@')[0]).replace(/\s*\(.*?\)/g, '').trim();
    const participantUser = {
      email: email,
      name: cleanName,
      role: 'participant' as const,
      companyId: authCompany || 'prosur'
    };
    setCurrentUser(participantUser);
    localStorage.setItem('prosur_portal_user', JSON.stringify(participantUser));

    if (authMode === 'register') {
      setProject(prev => ({
        ...prev,
        companyId: authCompany,
        categoryId: authCategory,
        userId: email
      }));
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('prosur_portal_user');
  };

  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRole, setNewMemberRole] = useState('');
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newMemberPhone, setNewMemberPhone] = useState('');

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName) return;
    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: newMemberName,
      role: newMemberRole || 'Colaborador',
      email: newMemberEmail,
      phone: newMemberPhone
    };
    setProject(prev => ({
      ...prev,
      members: [...prev.members, newMember]
    }));
    setNewMemberName('');
    setNewMemberRole('');
    setNewMemberEmail('');
    setNewMemberPhone('');
  };

  const handleRemoveMember = (id: string) => {
    setProject(prev => ({
      ...prev,
      members: prev.members.filter(m => m.id !== id)
    }));
  };

  const [newMilestoneTitle, setNewMilestoneTitle] = useState('');
  const [newMilestoneDesc, setNewMilestoneDesc] = useState('');
  const handleAddMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMilestoneTitle) return;
    const newM: Milestone = {
      id: 'm-' + Date.now(),
      title: newMilestoneTitle,
      date: new Date().toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' }),
      description: newMilestoneDesc,
      completed: false
    };
    setProject(prev => ({
      ...prev,
      milestones: [...prev.milestones, newM]
    }));
    setNewMilestoneTitle('');
    setNewMilestoneDesc('');
  };

  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
  };

  const filteredProjects = allProjects.filter(p => {
    const matchCompany = adminCompanyFilter === 'all' || p.companyId === adminCompanyFilter;
    const matchCategory = adminCategoryFilter === 'all' || p.categoryId === adminCategoryFilter;
    const matchSearch = adminSearch === '' || 
      p.title.toLowerCase().includes(adminSearch.toLowerCase()) || 
      p.members.some(m => m.name.toLowerCase().includes(adminSearch.toLowerCase())) ||
      p.scope.toLowerCase().includes(adminSearch.toLowerCase());
    return matchCompany && matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#111827] font-sans antialiased selection:bg-[#CC2027] selection:text-white">
      
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-xs">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-5">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700 hover:text-[#CC2027] border border-gray-200 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> 
              <span>Volver a la Landing</span>
            </button>
            <div className="h-6 w-[1px] bg-gray-200 hidden sm:block"></div>
            <img src="/logoprosur.png" alt="Grupo PROSUR" className="h-10 sm:h-12 w-auto object-contain" />
            <div className="hidden md:block border-l border-gray-200 pl-4">
              <span className="text-[12px] tracking-widest font-black text-[#111827] uppercase block">
                PORTAL DE REGISTRO & SEGUIMIENTO
              </span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                Reto de Inteligencia Artificial 2026–2027
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <div className="text-xs font-black text-gray-900 leading-tight">
                    {currentUser.name.replace(/\s*\(.*?\)/g, '').trim()}
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    {currentUser.role === 'admin' ? 'Administrador' : 'Participante'}
                  </div>
                </div>
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-[#CC2027] border border-red-200 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  title="Cerrar sesión"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Salir</span>
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </header>

      <div className="bg-gradient-to-r from-gray-900 via-gray-850 to-[#1e1e1e] text-white border-b border-gray-800">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-gray-400 font-bold uppercase text-[10px] tracking-wider">Apertura de Registros:</span>
              <span className="font-bold text-emerald-300">Lunes 7 de Septiembre</span>
            </div>
            <div className="h-4 w-[1px] bg-gray-700 hidden sm:block"></div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#CC2027]" />
              <span className="text-gray-400 font-bold uppercase text-[10px] tracking-wider">Gran Concurso & Pitch:</span>
              <span className="font-black text-red-400">12 de Enero</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a 
              href="/Base_IA_Grupo_Prosur.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-red-400" />
              <span>Bases Oficiales</span>
            </a>
          </div>
        </div>
      </div>

      {!currentUser ? (
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12">
              
              <div className="md:col-span-5 bg-gradient-to-br from-gray-900 to-[#1a1a1a] p-8 text-white flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-tight leading-snug mb-4">
                    Registra tu Solución en el Reto IA
                  </h2>
                  <p className="text-xs text-gray-400 leading-relaxed mb-8">
                    Crea tu cuenta institucional, elige la empresa participante donde implementarás tu mejora y documenta tus avances con datos comprobables.
                  </p>

                  <div className="space-y-3 pt-6 border-t border-gray-800">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">
                      Empresas Convocadas ({PARTICIPATING_COMPANIES.filter(c => c.id !== 'otros').length})
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {PARTICIPATING_COMPANIES.filter(c => c.id !== 'otros').map(c => (
                        <div key={c.id} className="bg-white p-1.5 rounded-lg border border-white/20 shadow-xs flex items-center justify-center h-12 hover:scale-[1.03] transition-all" title={c.name}>
                          <img src={c.logo} alt={c.name} className="max-h-8 max-w-full object-contain" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-8 text-[11px] text-gray-500 font-medium">
                  Organizado por Gerencia de Mejora Continua · Grupo Prosur
                </div>
              </div>

              <div className="md:col-span-7 p-8 sm:p-10">
                <div className="flex border-b border-gray-200 mb-8">
                  <button 
                    onClick={() => setAuthMode('login')}
                    className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 cursor-pointer ${authMode === 'login' ? 'border-[#CC2027] text-[#CC2027]' : 'border-transparent text-gray-400 hover:text-gray-700'}`}
                  >
                    Iniciar Sesión
                  </button>
                  <button 
                    onClick={() => setAuthMode('register')}
                    className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 cursor-pointer ${authMode === 'register' ? 'border-[#CC2027] text-[#CC2027]' : 'border-transparent text-gray-400 hover:text-gray-700'}`}
                  >
                    Crear Nuevo Usuario / Equipo
                  </button>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                  {authMode === 'register' && (
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                        Nombre Completo o Nombre del Equipo *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input 
                          type="text" 
                          required
                          value={authName} 
                          onChange={(e) => setAuthName(e.target.value)} 
                          placeholder="Ej: Equipo Optimización Logística"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#CC2027] focus:ring-2 focus:ring-red-600/10"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                      Correo Electrónico Institucional *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input 
                        type="email" 
                        required
                        value={authEmail} 
                        onChange={(e) => setAuthEmail(e.target.value)} 
                        placeholder="tu.correo@empresa.com.mx"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#CC2027] focus:ring-2 focus:ring-red-600/10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                      Contraseña *
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input 
                        type="password" 
                        required
                        value={authPassword} 
                        onChange={(e) => setAuthPassword(e.target.value)} 
                        placeholder="••••••••"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#CC2027] focus:ring-2 focus:ring-red-600/10"
                      />
                    </div>
                  </div>

                  {authMode === 'register' && (
                    <>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                          ¿En qué empresa implementarás la mejora? *
                        </label>
                        <select 
                          value={authCompany} 
                          onChange={(e) => setAuthCompany(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium focus:outline-none focus:border-[#CC2027]"
                        >
                          {PARTICIPATING_COMPANIES.map(c => (
                            <option key={c.id} value={c.id}>{c.name} - {c.subtitle}</option>
                          ))}
                        </select>
                        {authCompany === 'prosur' && (
                          <div className="mt-2 p-2.5 rounded-lg bg-red-50 border border-red-200/60 text-xs text-[#CC2027] font-medium flex items-center gap-2">
                            <Sparkles className="w-4 h-4 shrink-0 text-[#CC2027]" />
                            <span>Al elegir <strong>Grupo Prosur</strong>, tu propuesta se desarrollará e implementará como una solución transversal para <strong>todas las empresas</strong> del Grupo.</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                          Categoría Oficial de Registro *
                        </label>
                        <select 
                          value={authCategory} 
                          onChange={(e) => setAuthCategory(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium focus:outline-none focus:border-[#CC2027]"
                        >
                          {CATEGORIES.map(cat => (
                            <option key={cat.id} value={cat.id}>Categoría {cat.id}: {cat.name}</option>
                          ))}
                        </select>
                      </div>
                    </>
                  )}

                  <button 
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#CC2027] hover:bg-[#b01b21] text-white font-bold text-xs uppercase tracking-widest shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    {authMode === 'login' ? 'Entrar al Portal' : 'Registrar Cuenta & Continuar'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : currentUser.role === 'admin' ? (
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-10 space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-200">
            <div>
              <h1 className="text-3xl font-black uppercase tracking-tight text-gray-900">
                Supervisión por Empresa Participante
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Filtra, revisa avances comprobables, verifica listas de seguridad y audita los demos agendados.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-white rounded-xl border border-gray-200 shadow-xs text-right">
                <div className="text-[10px] uppercase font-bold text-gray-400">Total Proyectos</div>
                <div className="text-xl font-black text-gray-900">{allProjects.length}</div>
              </div>
              <div className="px-4 py-2 bg-white rounded-xl border border-gray-200 shadow-xs text-right">
                <div className="text-[10px] uppercase font-bold text-gray-400">Demos Validadas</div>
                <div className="text-xl font-black text-emerald-600">
                  {allProjects.filter(p => p.demoStatus === 'approved').length}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#CC2027]" />
                Filtrar por Empresa Participante:
              </span>
              <span className="text-xs font-mono text-gray-400">
                Mostrando {filteredProjects.length} de {allProjects.length} proyectos
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-11 gap-2.5">
              <button 
                onClick={() => setAdminCompanyFilter('all')}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center h-24 ${adminCompanyFilter === 'all' ? 'border-[#CC2027] bg-red-50/40 ring-2 ring-red-600/20' : 'border-gray-200 bg-gray-50 hover:bg-white'}`}
              >
                <Building2 className={`w-6 h-6 mb-1 ${adminCompanyFilter === 'all' ? 'text-[#CC2027]' : 'text-gray-400'}`} />
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-800">Todas</span>
                <span className="text-[9px] text-gray-400 font-mono">({allProjects.length})</span>
              </button>

              {PARTICIPATING_COMPANIES.map(company => {
                const count = allProjects.filter(p => p.companyId === company.id).length;
                const isSelected = adminCompanyFilter === company.id;
                return (
                  <button 
                    key={company.id}
                    onClick={() => setAdminCompanyFilter(company.id)}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer flex flex-col items-center justify-between h-24 ${isSelected ? 'border-[#CC2027] bg-red-50/30 ring-2 ring-red-600/20 shadow-sm' : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-xs'}`}
                    title={company.name}
                  >
                    <div className="h-10 w-full flex items-center justify-center overflow-hidden">
                      <img src={company.logo} alt={company.name} className="max-h-9 max-w-full object-contain" />
                    </div>
                    <div className="text-center w-full mt-1">
                      <div className="text-[9px] font-bold uppercase tracking-wider text-gray-800 truncate">{company.name}</div>
                      <div className="text-[9px] text-gray-400 font-mono">({count})</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.length === 0 ? (
              <div className="col-span-full py-16 text-center bg-white rounded-2xl border border-gray-200 p-8">
                <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-gray-700 uppercase tracking-wider mb-1">Sin proyectos en esta empresa</h3>
                <p className="text-xs text-gray-400">Los participantes de esta empresa aún no han completado su ficha de registro.</p>
              </div>
            ) : (
              filteredProjects.map(p => {
                const companyObj = PARTICIPATING_COMPANIES.find(c => c.id === p.companyId) || PARTICIPATING_COMPANIES[0];
                return (
                  <div key={p.id} className="bg-white rounded-2xl border border-gray-200 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between">
                    
                    <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <div className="h-8 flex items-center bg-white px-2 py-1 rounded-md border border-gray-100">
                          <img src={companyObj.logo} alt={companyObj.name} className="max-h-6 max-w-[120px] object-contain" />
                        </div>
                        <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-red-50 text-[#CC2027] border border-red-200/60">
                          Cat. {p.categoryId}
                        </span>
                      </div>
                      <h3 className="text-base font-black text-gray-900 leading-snug line-clamp-2">
                        {p.title}
                      </h3>
                    </div>

                    <div className="p-6 space-y-4 flex-1">
                      <div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Alcance y Propuesta:</span>
                        <p className="text-xs text-gray-600 leading-relaxed line-clamp-3 font-normal">
                          {p.scope}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200/80">
                        <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 flex items-center gap-1.5 mb-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Datos Comprobables:
                        </span>
                        <p className="text-xs text-emerald-900 font-medium leading-relaxed">
                          {p.verifiableMetrics}
                        </p>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1.5">
                          Equipo ({p.members.length} integrantes):
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {p.members.map(m => (
                            <span key={m.id} className="text-[10px] font-semibold bg-gray-100 px-2 py-0.5 rounded text-gray-700">
                              {m.name} ({m.role})
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2 flex items-center justify-between text-xs">
                        <span className="text-gray-400 font-bold uppercase text-[10px]">Demo de Validación:</span>
                        <span className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                          p.demoStatus === 'approved' ? 'bg-green-100 text-green-800' :
                          p.demoStatus === 'scheduled' ? `Agendada: ${p.demoDate || 'Pendiente'}` :
                          'Por Agendar'
                        }`}>
                          {p.demoStatus === 'approved' ? '✓ Aprobado 12 Enero' :
                           p.demoStatus === 'scheduled' ? `Agendada: ${p.demoDate || 'Pendiente'}` :
                           'Por Agendar'}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        {p.githubUrl && (
                          <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-600 hover:text-gray-900 bg-white rounded-lg border border-gray-200 hover:shadow-xs transition-all" title="Ver GitHub">
                            <GithubIcon className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {p.youtubeUrl && (
                          <a href={p.youtubeUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-red-600 hover:text-red-700 bg-white rounded-lg border border-gray-200 hover:shadow-xs transition-all" title="Ver Video Demo en YouTube">
                            <Video className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>

                      <button 
                        onClick={() => {
                          setProject(p);
                          setCurrentUser({
                            email: 'participante@' + p.companyId + '.com',
                            name: p.members[0]?.name || 'Participante',
                            role: 'participant',
                            companyId: p.companyId
                          });
                        }}
                        className="px-3 py-1.5 rounded-lg bg-gray-900 hover:bg-black text-white text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Ver Ficha Completa
                      </button>
                    </div>

                  </div>
                );
              })
            )}
          </div>

        </div>
      ) : (
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-10 space-y-8">
          
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-2xl bg-gray-50 border border-gray-200 p-2 flex items-center justify-center shrink-0">
                <img 
                  src={PARTICIPATING_COMPANIES.find(c => c.id === project.companyId)?.logo || '/companies/prosur.png'} 
                  alt="Empresa" 
                  className="max-h-16 max-w-full object-contain"
                />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-red-50 text-[#CC2027] border border-red-200">
                    Categoría {project.categoryId} · {CATEGORIES.find(c => c.id === project.categoryId)?.name}
                  </span>
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">
                    Empresa: {PARTICIPATING_COMPANIES.find(c => c.id === project.companyId)?.name}
                    {project.companyId === 'prosur' && (
                      <span className="ml-2 text-[10px] font-black text-[#CC2027] bg-red-50 px-2 py-0.5 rounded border border-red-200">
                        Transversal · Todas las empresas
                      </span>
                    )}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                  {project.title}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={handleSaveProject}
                className="px-6 py-3 rounded-xl bg-[#CC2027] hover:bg-[#b01b21] text-white font-bold text-xs uppercase tracking-widest shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                Guardar Proyecto
              </button>
            </div>
          </div>

          <div className="flex border-b border-gray-200 overflow-x-auto space-x-2">
            {[
              { id: 'project', label: '1. Ficha y Alcance', icon: FileText },
              { id: 'team', label: `2. Integrantes (${project.members.length})`, icon: Users },
              { id: 'checklists', label: '3. Checklists de Calidad', icon: ShieldCheck },
              { id: 'milestones', label: '4. Avances & Bitácora', icon: Clock },
              { id: 'demo', label: '5. Demo de Validación', icon: Video }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id 
                    ? 'border-[#CC2027] text-[#CC2027] bg-white font-black' 
                    : 'border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {activeTab === 'project' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-xs space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                    Título del Proyecto *
                  </label>
                  <input 
                    type="text" 
                    value={project.title}
                    onChange={(e) => setProject({ ...project, title: e.target.value })}
                    className="w-full text-base font-bold p-3.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#CC2027]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                      Empresa donde se implementa *
                    </label>
                    <select 
                      value={project.companyId}
                      onChange={(e) => setProject({ ...project, companyId: e.target.value })}
                      className="w-full p-3 border border-gray-200 rounded-xl text-sm font-semibold"
                    >
                      {PARTICIPATING_COMPANIES.map(c => (
                        <option key={c.id} value={c.id}>{c.name} - {c.subtitle}</option>
                      ))}
                    </select>
                    {project.companyId === 'prosur' && (
                      <p className="mt-2 text-xs font-semibold text-[#CC2027] flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Desarrollo transversal para todas las empresas del Grupo.</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                      Categoría Asignada *
                    </label>
                    <select 
                      value={project.categoryId}
                      onChange={(e) => setProject({ ...project, categoryId: e.target.value })}
                      className="w-full p-3 border border-gray-200 rounded-xl text-sm font-semibold"
                    >
                      {CATEGORIES.map(c => (
                        <option key={c.id} value={c.id}>Categoría {c.id}: {c.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                    Alcance del Proyecto y Operación *
                  </label>
                  <textarea 
                    rows={3}
                    value={project.scope}
                    onChange={(e) => setProject({ ...project, scope: e.target.value })}
                    className="w-full p-3.5 border border-gray-200 rounded-xl text-sm leading-relaxed focus:outline-none focus:border-[#CC2027]"
                    placeholder="Describe qué departamentos, procesos y personas abarca esta solución..."
                  />
                </div>

                <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Métrica de Impacto y Datos Comprobables (Antes vs. Después) *</span>
                  </div>
                  <p className="text-xs text-emerald-800">
                    Aquí se premia el impacto probado, no la idea. Coloca cifras medibles: horas ahorradas, costos evitados o porcentaje de reducción de errores.
                  </p>
                  <textarea 
                    rows={3}
                    value={project.verifiableMetrics}
                    onChange={(e) => setProject({ ...project, verifiableMetrics: e.target.value })}
                    className="w-full p-3 border border-emerald-300 rounded-xl bg-white text-sm text-emerald-950 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    placeholder="Ej: Antes consumía 12 horas-persona semanales y un 8% de error. Con el modelo el tiempo bajó a 15 minutos y 0% de error en 300 casos auditados."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2 flex items-center gap-2">
                      <GithubIcon className="w-4 h-4" /> Repositorio en GitHub
                    </label>
                    <input 
                      type="url" 
                      value={project.githubUrl}
                      onChange={(e) => setProject({ ...project, githubUrl: e.target.value })}
                      placeholder="https://github.com/usuario/proyecto"
                      className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#CC2027]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2 flex items-center gap-2">
                      <Video className="w-4 h-4 text-red-600" /> Enlace de Video en YouTube
                    </label>
                    <input 
                      type="url" 
                      value={project.youtubeUrl}
                      onChange={(e) => setProject({ ...project, youtubeUrl: e.target.value })}
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#CC2027]"
                    />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3 flex items-center gap-2">
                    <Video className="w-4 h-4 text-[#CC2027]" /> Demo en Video (YouTube)
                  </span>
                  {getYouTubeEmbedUrl(project.youtubeUrl) ? (
                    <div className="aspect-video w-full rounded-xl overflow-hidden shadow-inner bg-black">
                      <iframe 
                        src={getYouTubeEmbedUrl(project.youtubeUrl)!} 
                        title="Demo YouTube"
                        className="w-full h-full" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <div className="aspect-video w-full rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-6 text-center text-gray-400">
                      <Play className="w-8 h-8 mb-2 opacity-50" />
                      <p className="text-xs">Pega tu link de YouTube para ver aquí la demostración en video de tu proyecto.</p>
                    </div>
                  )}
                </div>

                <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-md space-y-4">
                  <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest block">
                    Criterio de Evaluación Oficial
                  </span>
                  <h4 className="text-base font-black">Scorecard de 100 Puntos</h4>
                  <ul className="text-xs space-y-2 text-gray-300 font-medium">
                    <li className="flex justify-between border-b border-gray-800 pb-1">
                      <span>Impacto Económico:</span>
                      <strong className="text-white">25 Pts</strong>
                    </li>
                    <li className="flex justify-between border-b border-gray-800 pb-1">
                      <span>Eficiencia y Tiempos:</span>
                      <strong className="text-white">25 Pts</strong>
                    </li>
                    <li className="flex justify-between border-b border-gray-800 pb-1">
                      <span>Funcionalidad en Operación:</span>
                      <strong className="text-white">20 Pts</strong>
                    </li>
                    <li className="flex justify-between border-b border-gray-800 pb-1">
                      <span>Escalabilidad Institucional:</span>
                      <strong className="text-white">20 Pts</strong>
                    </li>
                    <li className="flex justify-between">
                      <span>Conectividad e Integración:</span>
                      <strong className="text-white">10 Pts</strong>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'team' && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-xs space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
                <div>
                  <h2 className="text-xl font-black uppercase tracking-tight text-gray-900">
                    Integrantes Registrados ({project.members.length})
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Todos los integrantes listados recibirán acreditación y diploma oficial en el concurso del 12 de Enero.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.members.map((member, idx) => (
                  <div key={member.id} className="p-5 rounded-xl border border-gray-200 bg-gray-50/50 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <span className="text-[10px] font-bold uppercase text-red-600 tracking-wider">
                            Integrante #{idx + 1}
                          </span>
                          <h4 className="text-sm font-black text-gray-900">{member.name}</h4>
                        </div>
                        {project.members.length > 1 && (
                          <button 
                            onClick={() => handleRemoveMember(member.id)}
                            className="text-gray-400 hover:text-red-600 p-1 cursor-pointer"
                            title="Eliminar"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      <div className="text-xs text-gray-600 font-medium mb-2">{member.role}</div>
                    </div>
                    <div className="pt-3 border-t border-gray-200/70 text-[11px] text-gray-500 space-y-1">
                      <div>📧 {member.email || 'Sin correo'}</div>
                      <div>📞 {member.phone || 'Sin teléfono'}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-700 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-[#CC2027]" /> Agregar un Nuevo Integrante
                </h3>
                <form onSubmit={handleAddMember} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <input 
                      type="text" 
                      placeholder="Nombre Completo *"
                      required
                      value={newMemberName} 
                      onChange={(e) => setNewMemberName(e.target.value)}
                      className="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#CC2027]"
                    />
                  </div>
                  <div>
                    <input 
                      type="text" 
                      placeholder="Rol en el proyecto (ej: Analista, Dev)"
                      value={newMemberRole} 
                      onChange={(e) => setNewMemberRole(e.target.value)}
                      className="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#CC2027]"
                    />
                  </div>
                  <div>
                    <input 
                      type="email" 
                      placeholder="Correo Electrónico"
                      value={newMemberEmail} 
                      onChange={(e) => setNewMemberEmail(e.target.value)}
                      className="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#CC2027]"
                    />
                  </div>
                  <div className="flex gap-2">
                    <input 
                      type="tel" 
                      placeholder="Teléfono / WhatsApp"
                      value={newMemberPhone} 
                      onChange={(e) => setNewMemberPhone(e.target.value)}
                      className="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#CC2027]"
                    />
                    <button 
                      type="submit"
                      className="px-4 bg-[#CC2027] hover:bg-[#b01b21] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shrink-0 cursor-pointer"
                    >
                      Añadir
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {activeTab === 'checklists' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-xs space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <CheckSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-gray-900 uppercase tracking-tight">Checklist de Cumplimiento</h3>
                    <p className="text-xs text-gray-500">Requisitos indispensables para calificar a la fase final.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { key: 'problem_defined', label: 'Problema Operativo Real', desc: 'Identificado claramente dentro de la empresa participante.' },
                    { key: 'functional_solution', label: 'Solución con IA ya Funcionando', desc: 'No se permiten presentaciones ni mockups teóricos sin código/flujo.' },
                    { key: 'verifiable_metrics', label: 'Métrica de Ahorro Verificable', desc: 'Comparativa Antes vs. Después comprobable por la gerencia.' },
                    { key: 'company_endorsed', label: 'Respaldo de la Empresa', desc: 'El área receptora valida la utilidad de la implementación.' },
                    { key: 'repo_available', label: 'Código y Documentación', desc: 'Repositorio de GitHub o documentación técnica disponible.' }
                  ].map(item => {
                    const isChecked = project.complianceChecks[item.key] || false;
                    return (
                      <div 
                        key={item.key} 
                        onClick={() => {
                          setProject({
                            ...project,
                            complianceChecks: {
                              ...project.complianceChecks,
                              [item.key]: !isChecked
                            }
                          });
                        }}
                        className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${isChecked ? 'bg-blue-50/40 border-blue-200' : 'bg-gray-50 border-gray-200'}`}
                      >
                        <div className="mt-0.5">
                          {isChecked ? <CheckCircle2 className="w-5 h-5 text-blue-600" /> : <Square className="w-5 h-5 text-gray-400" />}
                        </div>
                        <div>
                          <div className={`text-xs font-bold ${isChecked ? 'text-blue-950' : 'text-gray-700'}`}>{item.label}</div>
                          <div className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">{item.desc}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-xs space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-gray-900 uppercase tracking-tight">Checklist de Seguridad y Gobernanza</h3>
                    <p className="text-xs text-gray-500">Obligatorio según las bases del Reto IA Grupo Prosur.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { key: 'no_hardcoded_keys', label: 'Sin Credenciales en Código', desc: 'No existen API Keys, contraseñas o tokens expuestos en repositorios públicos.' },
                    { key: 'no_pii_public_models', label: 'Protección de Datos Confidenciales', desc: 'No se envían datos bancarios ni secretos de negocio a modelos públicos sin anonimizar.' },
                    { key: 'human_in_the_loop', label: 'Protocolo Human-in-the-Loop', desc: 'Las decisiones sensibles de negocio cuentan con validación y supervisión humana.' },
                    { key: 'ip_compliance', label: 'Uso de Licencias Autorizadas', desc: 'Todas las librerías y modelos cuentan con licencias permisivas comerciales.' }
                  ].map(item => {
                    const isChecked = project.securityChecks[item.key] || false;
                    return (
                      <div 
                        key={item.key} 
                        onClick={() => {
                          setProject({
                            ...project,
                            securityChecks: {
                              ...project.securityChecks,
                              [item.key]: !isChecked
                            }
                          });
                        }}
                        className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${isChecked ? 'bg-red-50/40 border-red-200' : 'bg-gray-50 border-gray-200'}`}
                      >
                        <div className="mt-0.5">
                          {isChecked ? <CheckCircle2 className="w-5 h-5 text-red-600" /> : <Square className="w-5 h-5 text-gray-400" />}
                        </div>
                        <div>
                          <div className={`text-xs font-bold ${isChecked ? 'text-red-950' : 'text-gray-700'}`}>{item.label}</div>
                          <div className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">{item.desc}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {activeTab === 'milestones' && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-xs space-y-8">
              <div>
                <h2 className="text-xl font-black uppercase tracking-tight text-gray-900">
                  Bitácora de Avances y Entregas
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Registra los hitos clave alcanzados para que el comité organizador audite tu progreso.
                </p>
              </div>

              <div className="space-y-4">
                {project.milestones.map((m, i) => (
                  <div key={m.id} className="p-5 rounded-xl border border-gray-200 bg-gray-50/40 flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-red-100 text-[#CC2027] font-bold text-xs flex items-center justify-center shrink-0">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-sm font-black text-gray-900">{m.title}</h4>
                        <span className="text-[10px] font-mono text-gray-400 bg-white px-2 py-0.5 rounded border border-gray-200">{m.date}</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{m.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-700 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-[#CC2027]" /> Registrar Nuevo Avance
                </h3>
                <form onSubmit={handleAddMilestone} className="space-y-3">
                  <input 
                    type="text" 
                    placeholder="Título del avance (ej: Despliegue de versión beta en taller)..."
                    required
                    value={newMilestoneTitle}
                    onChange={(e) => setNewMilestoneTitle(e.target.value)}
                    className="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#CC2027]"
                  />
                  <textarea 
                    rows={2}
                    placeholder="Describe los resultados obtenidos, retroalimentación del usuario y métricas preliminares..."
                    value={newMilestoneDesc}
                    onChange={(e) => setNewMilestoneDesc(e.target.value)}
                    className="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#CC2027]"
                  />
                  <button 
                    type="submit"
                    className="px-6 py-2.5 bg-gray-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                  >
                    Publicar Avance en Bitácora
                  </button>
                </form>
              </div>
            </div>
          )}

          {activeTab === 'demo' && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-xs space-y-8">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-red-50 text-red-700 text-xs font-bold uppercase tracking-wider mb-2">
                  <Video className="w-3.5 h-3.5" />
                  <span>Fase de Validación y Admisibilidad</span>
                </div>
                <h2 className="text-2xl font-black uppercase tracking-tight text-gray-900">
                  Agenda tu Demo de Validación Operativa
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                  Para que tu proyecto clasifique formalmente a la presentación final del <strong>12 de Enero</strong>, deberás mostrar tu solución funcionando en vivo (30 minutos) ante el equipo de Mejora Continua de Grupo Prosur.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-gray-700">Estado de tu Demo</h4>
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-amber-500 animate-ping"></span>
                    <span className="text-sm font-black text-gray-900">
                      {project.demoStatus === 'approved' ? '¡Proyecto Aprobado para el Concurso del 12 de Enero!' :
                       project.demoStatus === 'scheduled' ? `Demo Confirmada: ${project.demoDate}` :
                       'Pendiente de agendar sesión de validación'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Asegúrate de tener listo el acceso a tu sistema, la comparativa Antes vs. Después y la asistencia de al menos un integrante de la empresa receptora.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-red-50 to-orange-50/50 border border-red-200 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-widest text-[#CC2027] mb-2">
                      Calendly de Mejora Continua
                    </h4>
                    <p className="text-xs text-gray-700 leading-relaxed mb-4">
                      Selecciona día y horario disponible directamente con la Gerencia de Mejora Continua:
                    </p>
                  </div>
                  <a 
                    href="https://calendly.com/gerencia-mejoracontinua-prosur/30min"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[#CC2027] hover:bg-[#b01b21] text-white font-bold text-xs uppercase tracking-widest shadow-md transition-all"
                  >
                    <span>Abrir Agenda en Calendly</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
