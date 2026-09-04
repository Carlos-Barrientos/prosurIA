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
  Square,
  Edit,
  X
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
  // Fila 1: Prosur, Chesa, CAFI
  { id: 'prosur', name: 'Grupo Prosur', logo: '/companies/prosur.png', subtitle: 'Corporativo', badgeColor: 'border-red-200 bg-red-50 text-red-700' },
  { id: 'chesa', name: 'Chesa', logo: '/companies/chesa.png', subtitle: 'Grupo Automotríz', badgeColor: 'border-gray-200 bg-gray-50 text-gray-800' },
  { id: 'cafi', name: 'CAFI', logo: '/companies/cafi.png', subtitle: 'Tu Casa Financiera', badgeColor: 'border-orange-200 bg-orange-50 text-orange-800' },
  // Fila 2: Calzamoda, Rio Vinyl, Cinco Pinos
  { id: 'calzamoda', name: 'Calzamoda', logo: '/companies/calzamoda.png', subtitle: 'Calzado y Retail', badgeColor: 'border-lime-200 bg-lime-50 text-lime-800' },
  { id: 'riovinyl', name: 'Rio Vinyl', logo: '/companies/riovinyl.png', subtitle: 'Rio Vinyl de México', badgeColor: 'border-teal-200 bg-teal-50 text-teal-800' },
  { id: 'cincopinos', name: 'Cinco Pinos', logo: '/companies/cincopinos.png', subtitle: 'Inmobiliaria y Proyectos', badgeColor: 'border-emerald-200 bg-emerald-50 text-emerald-800' },
  // Fila 3: Comercialtos, CAI, Insumos del Sureste
  { id: 'comercialtos', name: 'Comercialtos', logo: '/companies/comercialtos.jpg', subtitle: 'Comercialización y Abasto', badgeColor: 'border-amber-200 bg-amber-50 text-amber-800' },
  { id: 'cai', name: 'CAI', logo: '/companies/cai.png', subtitle: 'Futuro Activo A.C.', badgeColor: 'border-blue-200 bg-blue-50 text-blue-800' },
  { id: 'insumos_sureste', name: 'Insumos del Sureste', logo: '/companies/insumos_sureste.png', subtitle: 'Insumos Industriales', badgeColor: 'border-rose-200 bg-rose-50 text-rose-800' },
  // Opciones Colaborativas y Especiales
  { id: 'multiempresa', name: 'Multi Empresa', logo: '/logoprosur.png', subtitle: 'Desarrollo Colaborativo entre Empresas', badgeColor: 'border-red-200 bg-red-50 text-[#CC2027]' },
  { id: 'otros', name: 'Otros', logo: '/companies/prosur.png', subtitle: 'Otra Empresa o Área', badgeColor: 'border-slate-200 bg-slate-50 text-slate-700' },
];

export const CATEGORIES = [
  { id: 'A', name: 'Finanzas, Contabilidad y Tesorería' },
  { id: 'B', name: 'Operaciones, Taller y Logística' },
  { id: 'C', name: 'Ventas y Marketing' },
  { id: 'D', name: 'Capital Humano y Compliance' },
  { id: 'E', name: 'Tecnología, Sistemas e Innovación' },
];

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  company?: string;
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
  targetCompanies?: string[];
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

export interface RegisteredUser {
  id: string;
  email: string;
  name: string;
  role: 'participant' | 'admin';
  companyId: string;
  targetCompanies?: string[];
  categoryId?: string;
  registeredAt?: string;
}

export const DEFAULT_ADMIN_USERS: RegisteredUser[] = [
  {
    id: 'user-carlos',
    email: 'gerencia.mejoracontinua@prosur.com.mx',
    name: 'Carlos Barrientos',
    role: 'admin',
    companyId: 'prosur',
    categoryId: 'A',
    registeredAt: '2026-09-01T00:00:00.000Z'
  },
  {
    id: 'user-dario',
    email: 'dario.gonzalez@prosur.com.mx',
    name: 'Dario Gonzalez',
    role: 'admin',
    companyId: 'prosur',
    categoryId: 'A',
    registeredAt: '2026-09-01T00:00:00.000Z'
  }
];

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
  const [authTargetCompanies, setAuthTargetCompanies] = useState<string[]>([]);
  const [authCategory, setAuthCategory] = useState(initialCategory || 'A');

  // Modal para edición de proyecto por parte del Administrador
  const [editingProject, setEditingProject] = useState<ProjectData | null>(null);

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
        { id: 'm3', title: 'Auditoría de Seguridad y Demo de Validación', date: '15 Diciembre 2026', description: 'Revisión técnica de métricas antes vs después y verificación de seguridad.', completed: false },
        { id: 'm4', title: 'Pitch Final y Gran Concurso', date: 'Viernes 15 Enero 2027', description: 'Presentación ejecutiva final ante directores y jurado evaluador.', completed: false }
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
  const [adminActiveTab, setAdminActiveTab] = useState<'projects' | 'users'>('projects');
  
  const [allUsers, setAllUsers] = useState<RegisteredUser[]>(() => {
    const userMap = new Map<string, RegisteredUser>();
    DEFAULT_ADMIN_USERS.forEach(u => userMap.set(u.email.toLowerCase().trim(), u));
    const saved = localStorage.getItem('prosur_all_users_db');
    if (saved) {
      try {
        const parsed: RegisteredUser[] = JSON.parse(saved) || [];
        parsed.forEach(u => { if (u && u.email) userMap.set(u.email.toLowerCase().trim(), u); });
      } catch (e) {
        // ignore
      }
    }
    return Array.from(userMap.values());
  });

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
    async function loadProjectsAndUsers() {
      // 1. Obtener proyectos de localStorage
      let localDb: ProjectData[] = [];
      const saved = localStorage.getItem('prosur_all_projects_db');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          localDb = (parsed || []).filter((p: any) => !['p1', 'p2', 'p3', 'p4'].includes(p.id));
        } catch {
          localDb = [];
        }
      }

      // 2. Intentar cargar desde el backend de Node (/api/projects)
      let backendProjects: ProjectData[] = [];
      try {
        const res = await fetch('/api/projects');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            backendProjects = data.filter((p: any) => !['p1', 'p2', 'p3', 'p4'].includes(p.id));
          }
        }
      } catch (e) {
        console.log('Backend /api/projects not reached:', e);
      }

      // 3. Intentar cargar desde Supabase si hay filas reales
      let supabaseProjects: ProjectData[] = [];
      try {
        const { data, error } = await supabase.from('projects').select('*, team_members(*), project_milestones(*)');
        if (!error && data && data.length > 0) {
          supabaseProjects = data.map((p: any) => ({
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
        }
      } catch (err) {
        console.log('Supabase sync info:', err);
      }

      // 4. Fusionar proyectos sin perder ninguno (Backend > Supabase > Local)
      const projectMap = new Map<string, ProjectData>();
      localDb.forEach(p => { if (p && p.id) projectMap.set(p.id, p); });
      supabaseProjects.forEach(p => { if (p && p.id) projectMap.set(p.id, p); });
      backendProjects.forEach(p => { if (p && p.id) projectMap.set(p.id, p); });

      const merged = Array.from(projectMap.values());
      setAllProjects(merged);
      localStorage.setItem('prosur_all_projects_db', JSON.stringify(merged));

      // Sincronizar proyectos al backend si no estaban guardados en disco
      merged.forEach(p => {
        if (!backendProjects.some(bp => bp.id === p.id)) {
          fetch('/api/projects', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(p)
          }).catch(() => {});
        }
      });

      // 5. Vincular el proyecto activo del usuario actual
      if (currentUser && currentUser.role === 'participant') {
        const userProj = merged.find(p => p.userId === currentUser.email) || merged.find(p => p.id === project.id);
        if (userProj) {
          setProject(userProj);
          localStorage.setItem('prosur_current_project', JSON.stringify(userProj));
        }
      }

      // 6. Cargar y sincronizar usuarios registrados
      let localUsers: RegisteredUser[] = [];
      const savedUsers = localStorage.getItem('prosur_all_users_db');
      if (savedUsers) {
        try {
          localUsers = JSON.parse(savedUsers) || [];
        } catch {
          localUsers = [];
        }
      }

      let backendUsers: RegisteredUser[] = [];
      try {
        const uRes = await fetch('/api/users');
        if (uRes.ok) {
          const uData = await uRes.json();
          if (Array.isArray(uData)) backendUsers = uData;
        }
      } catch (e) {
        console.log('Backend /api/users info:', e);
      }

      const userMap = new Map<string, RegisteredUser>();
      // 1. Siempre asegurar administradores corporativos base (Carlos y Dario)
      DEFAULT_ADMIN_USERS.forEach(admin => {
        userMap.set(admin.email.toLowerCase().trim(), admin);
      });

      // 2. Cargar usuarios locales y de backend
      localUsers.forEach(u => { if (u && u.email) userMap.set(u.email.toLowerCase().trim(), u); });
      backendUsers.forEach(u => { if (u && u.email) userMap.set(u.email.toLowerCase().trim(), u); });

      // 3. Intentar sincronizar usuarios de Supabase si la tabla existe
      try {
        const { data: sUsers } = await supabase.from('registered_users').select('*');
        if (sUsers && Array.isArray(sUsers)) {
          sUsers.forEach((su: any) => {
            if (su && su.email) {
              userMap.set(su.email.toLowerCase().trim(), {
                id: su.id,
                email: su.email,
                name: su.name,
                role: su.role,
                companyId: su.company_id,
                categoryId: su.category_id,
                targetCompanies: su.target_companies,
                registeredAt: su.registered_at
              });
            }
          });
        }
      } catch (e) {
        // Supabase registered_users opcional
      }

      // 4. Si el usuario actual está en sesión, registrarlo si no está
      if (currentUser && currentUser.email) {
        const cEmail = currentUser.email.toLowerCase().trim();
        if (!userMap.has(cEmail)) {
          userMap.set(cEmail, {
            id: 'user-' + cEmail.replace(/[^a-zA-Z0-9]/g, '_'),
            email: cEmail,
            name: currentUser.name || cEmail.split('@')[0],
            role: currentUser.role,
            companyId: currentUser.companyId || 'prosur',
            registeredAt: new Date().toISOString()
          });
        }
      }

      // 5. Extraer usuarios de los proyectos guardados si no existen en la lista
      merged.forEach(p => {
        if (p.userId && p.userId.includes('@')) {
          const cleanEmail = p.userId.toLowerCase().trim();
          if (!userMap.has(cleanEmail)) {
            userMap.set(cleanEmail, {
              id: 'user-' + cleanEmail.replace(/[^a-zA-Z0-9]/g, '_'),
              email: cleanEmail,
              name: p.members[0]?.name || p.title || cleanEmail.split('@')[0],
              role: 'participant',
              companyId: p.companyId,
              categoryId: p.categoryId,
              targetCompanies: p.targetCompanies,
              registeredAt: p.updatedAt
            });
          }
        }
      });

      const mergedUsers = Array.from(userMap.values());
      setAllUsers(mergedUsers);
      localStorage.setItem('prosur_all_users_db', JSON.stringify(mergedUsers));

      // 6. Sincronizar usuarios al backend local si no estaban guardados en disco
      mergedUsers.forEach(u => {
        if (!backendUsers.some(bu => bu.email?.toLowerCase() === u.email?.toLowerCase())) {
          fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(u)
          }).catch(() => {});
        }
      });

      // 7. Intentar sincronizar usuarios a Supabase
      try {
        supabase.from('registered_users').upsert(
          mergedUsers.map(u => ({
            id: u.id,
            email: u.email,
            name: u.name,
            role: u.role,
            company_id: u.companyId,
            category_id: u.categoryId,
            target_companies: u.targetCompanies || [],
            registered_at: u.registeredAt || new Date().toISOString()
          }))
        ).catch(() => {});
      } catch (e) {}
    }

    loadProjectsAndUsers();
  }, [currentUser?.email]);

  const handleSaveProject = async () => {
    const projectToSave: ProjectData = {
      ...project,
      userId: currentUser?.email || project.userId || 'usuario-local',
      updatedAt: new Date().toISOString()
    };

    setProject(projectToSave);
    localStorage.setItem('prosur_current_project', JSON.stringify(projectToSave));

    setAllProjects(prev => {
      const idx = prev.findIndex(p => p.id === projectToSave.id);
      const updated = idx >= 0 ? prev.map(p => p.id === projectToSave.id ? projectToSave : p) : [projectToSave, ...prev];
      localStorage.setItem('prosur_all_projects_db', JSON.stringify(updated));
      return updated;
    });

    // Guardar en backend (persistencia en archivo projects.json del servidor)
    try {
      await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectToSave)
      });
    } catch (e) {
      console.log('Error saving to /api/projects:', e);
    }

    // Intentar sincronizar con Supabase
    try {
      await supabase.from('projects').upsert({
        id: projectToSave.id,
        user_id: projectToSave.userId,
        title: projectToSave.title,
        company_id: projectToSave.companyId,
        category_id: projectToSave.categoryId,
        scope: projectToSave.scope,
        problem: projectToSave.problem,
        solution: projectToSave.solution,
        verifiable_metrics: projectToSave.verifiableMetrics,
        github_url: projectToSave.githubUrl,
        youtube_url: projectToSave.youtubeUrl,
        compliance_checks: projectToSave.complianceChecks,
        security_checks: projectToSave.securityChecks,
        updated_at: projectToSave.updatedAt
      });
    } catch (e) {
      console.log('Cloud sync saved', e);
    }

    alert('¡Proyecto guardado con éxito!');
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
    // 1. Guardar o actualizar registro en la lista de usuarios
    const userRecord: RegisteredUser = {
      id: 'user-' + Date.now(),
      email: email,
      name: cleanName,
      role: 'participant',
      companyId: authCompany || 'prosur',
      targetCompanies: authCompany === 'multiempresa' ? authTargetCompanies : undefined,
      categoryId: authCategory,
      registeredAt: new Date().toISOString()
    };

    setAllUsers(prev => {
      const idx = prev.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
      const updated = idx >= 0 ? prev.map(u => u.email.toLowerCase() === email.toLowerCase() ? { ...u, ...userRecord } : u) : [userRecord, ...prev];
      localStorage.setItem('prosur_all_users_db', JSON.stringify(updated));
      return updated;
    });

    fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userRecord)
    }).catch(err => console.log('Error saving user to backend:', err));

    if (authMode === 'register') {
      const newProj: ProjectData = {
        ...project,
        id: 'proj-' + Date.now(),
        title: project.title || `Proyecto ${cleanName}`,
        companyId: authCompany,
        categoryId: authCategory,
        targetCompanies: authCompany === 'multiempresa' ? authTargetCompanies : undefined,
        userId: email,
        members: project.members.length > 0 ? project.members : [
          {
            id: 'm-' + Date.now(),
            name: cleanName,
            role: 'Líder de Proyecto',
            email: email,
            phone: '',
            company: authCompany
          }
        ],
        updatedAt: new Date().toISOString()
      };
      setProject(newProj);
      localStorage.setItem('prosur_current_project', JSON.stringify(newProj));
      setAllProjects(prev => {
        const updated = [newProj, ...prev.filter(p => p.id !== newProj.id)];
        localStorage.setItem('prosur_all_projects_db', JSON.stringify(updated));
        return updated;
      });
      fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProj)
      }).catch(err => console.log('Error saving new project to backend:', err));
    } else {
      const existing = allProjects.find(p => p.userId === email);
      if (existing) {
        setProject(existing);
        localStorage.setItem('prosur_current_project', JSON.stringify(existing));
      }
    }
  };

  const handleDeleteUser = async (userEmailOrId: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este usuario registrado?')) return;
    const updated = allUsers.filter(u => u.id !== userEmailOrId && u.email.toLowerCase() !== userEmailOrId.toLowerCase());
    setAllUsers(updated);
    localStorage.setItem('prosur_all_users_db', JSON.stringify(updated));
    try {
      await fetch(`/api/users/${encodeURIComponent(userEmailOrId)}`, { method: 'DELETE' });
    } catch (e) {
      console.log('Error deleting user:', e);
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
  const [newMemberCompany, setNewMemberCompany] = useState('prosur');

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName) return;
    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: newMemberName,
      role: newMemberRole || 'Colaborador',
      email: newMemberEmail,
      phone: newMemberPhone,
      company: newMemberCompany
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

  // Funciones de Administrador para Editar y Eliminar Proyectos / Usuarios
  const handleDeleteProject = async (projectId: string, projectTitle: string) => {
    if (!window.confirm(`¿Estás seguro de que deseas eliminar permanentemente el proyecto "${projectTitle || 'Sin Título'}"? Esta acción no se puede deshacer.`)) {
      return;
    }

    // 1. Eliminar de la lista local
    const updated = allProjects.filter(p => p.id !== projectId);
    setAllProjects(updated);
    localStorage.setItem('prosur_all_projects_db', JSON.stringify(updated));

    // Si el proyecto actual activo es el que se borra, resetearlo
    if (project.id === projectId) {
      localStorage.removeItem('prosur_current_project');
    }

    // 2. Eliminar en Supabase
    try {
      const { error } = await supabase.from('projects').delete().eq('id', projectId);
      if (error) {
        console.error('Error al eliminar en Supabase:', error);
      }
    } catch (e) {
      console.log('Error de red al borrar en Supabase', e);
    }

    alert('Proyecto eliminado exitosamente.');
  };

  const handleUpdateProjectAdmin = async (updatedProj: ProjectData) => {
    const updatedList = allProjects.map(p => p.id === updatedProj.id ? updatedProj : p);
    setAllProjects(updatedList);
    localStorage.setItem('prosur_all_projects_db', JSON.stringify(updatedList));

    if (project.id === updatedProj.id) {
      setProject(updatedProj);
      localStorage.setItem('prosur_current_project', JSON.stringify(updatedProj));
    }

    try {
      await supabase.from('projects').upsert({
        id: updatedProj.id,
        title: updatedProj.title,
        company_id: updatedProj.companyId,
        category_id: updatedProj.categoryId,
        scope: updatedProj.scope,
        problem: updatedProj.problem,
        solution: updatedProj.solution,
        verifiable_metrics: updatedProj.verifiableMetrics,
        github_url: updatedProj.githubUrl,
        youtube_url: updatedProj.youtubeUrl,
        demo_status: updatedProj.demoStatus,
        demo_date: updatedProj.demoDate,
        updated_at: new Date().toISOString()
      });
    } catch (e) {
      console.log('Error sincronizando actualización en Supabase', e);
    }

    setEditingProject(null);
    alert('Proyecto actualizado correctamente.');
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

  const filteredUsers = allUsers.filter(u => {
    const matchCompany = adminCompanyFilter === 'all' || u.companyId === adminCompanyFilter;
    const matchCategory = adminCategoryFilter === 'all' || !u.categoryId || u.categoryId === adminCategoryFilter;
    const matchSearch = adminSearch === '' || 
      u.name.toLowerCase().includes(adminSearch.toLowerCase()) || 
      u.email.toLowerCase().includes(adminSearch.toLowerCase());
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

      {/* Subheader Institucional / Cronograma Oficial Prosur */}
      <div className="bg-white border-b border-gray-200/90 shadow-2xs">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-[#CC2027] border border-red-200/80 text-[10px] font-black uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#CC2027] animate-pulse"></span>
              Convocatoria Oficial
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Apertura:</span>
              <span className="font-bold text-gray-900">Lunes 7 de Septiembre</span>
            </div>
            <div className="h-3.5 w-[1px] bg-gray-200 hidden sm:block"></div>
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-[#CC2027]" />
              <span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Gran Concurso & Pitch:</span>
              <span className="font-black text-[#CC2027]">Viernes 15 de Enero</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a 
              href="/Base_IA_Grupo_Prosur.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-red-50 text-gray-800 hover:text-[#CC2027] border border-gray-200 hover:border-red-200 text-xs font-bold uppercase tracking-wider shadow-2xs transition-all cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-[#CC2027]" />
              <span>Bases Oficiales (PDF)</span>
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
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
                        Empresas Convocadas
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {PARTICIPATING_COMPANIES.filter(c => !['otros', 'multiempresa'].includes(c.id)).map(c => (
                        <div key={c.id} className="bg-white p-1.5 rounded-lg border border-white/20 shadow-xs flex items-center justify-center h-12 hover:scale-[1.03] transition-all" title={c.name}>
                          <img src={c.logo} alt={c.name} className="max-h-8 max-w-full object-contain" />
                        </div>
                      ))}
                    </div>

                    {/* Multi Empresa en cuadro blanco hasta abajo */}
                    <div className="bg-white p-2.5 rounded-xl border border-white/20 shadow-xs flex items-center justify-between hover:scale-[1.01] transition-all mt-2.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center shrink-0">
                          <img src="/logoprosur.png" alt="Multi Empresa" className="h-4 object-contain" />
                        </div>
                        <div>
                          <div className="text-xs font-black text-gray-900 leading-tight">Multi Empresa</div>
                          <div className="text-[10px] text-gray-500 font-medium">Equipos transversales inter-empresas</div>
                        </div>
                      </div>
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
                      </div>

                      {authCompany === 'multiempresa' && (
                        <div className="p-5 rounded-2xl bg-gray-50/90 border border-gray-200/90 space-y-4 animate-in fade-in duration-200">
                          <div className="flex items-center justify-between pb-2.5 border-b border-gray-200/60">
                            <div className="flex items-center gap-2.5">
                              <span className="w-2 h-2 rounded-full bg-[#CC2027]"></span>
                              <span className="text-xs font-bold uppercase tracking-wider text-gray-900">
                                Empresas que integran tu desarrollo Multi Empresa
                              </span>
                            </div>
                            <span className="text-[10px] font-bold text-gray-500 bg-white px-2.5 py-0.5 rounded-full border border-gray-200">
                              {authTargetCompanies.length} seleccionadas
                            </span>
                          </div>
                          
                          <p className="text-xs text-gray-500 leading-relaxed font-normal">
                            Fomentamos la colaboración transversal. Marca las empresas de donde son los integrantes o donde impactará la solución:
                          </p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1">
                            {PARTICIPATING_COMPANIES.filter(c => !['otros', 'multiempresa'].includes(c.id)).map(c => {
                              const checked = authTargetCompanies.includes(c.id);
                              return (
                                <label 
                                  key={c.id} 
                                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl border text-xs cursor-pointer transition-all duration-200 ${
                                    checked 
                                      ? 'bg-white border-[#CC2027] ring-1 ring-[#CC2027]/20 shadow-xs text-gray-900 font-bold' 
                                      : 'bg-white/80 hover:bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                                  }`}
                                >
                                  <input 
                                    type="checkbox"
                                    checked={checked}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setAuthTargetCompanies([...authTargetCompanies, c.id]);
                                      } else {
                                        setAuthTargetCompanies(authTargetCompanies.filter(id => id !== c.id));
                                      }
                                    }}
                                    className="w-4 h-4 rounded text-[#CC2027] focus:ring-[#CC2027] border-gray-300 cursor-pointer"
                                  />
                                  <span className="whitespace-nowrap font-medium text-xs text-gray-900">{c.name}</span>
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      )}

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
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-gray-200">
            <div>
              <h1 className="text-2xl font-black uppercase tracking-tight text-gray-900">
                Supervisión General
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">
                Seguimiento de proyectos y colaboradores registrados por empresa filial.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="px-3.5 py-1.5 bg-white rounded-lg border border-gray-200 text-right">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Proyectos</span>
                <span className="text-lg font-black text-gray-900 leading-none">{allProjects.length}</span>
              </div>
              <div className="px-3.5 py-1.5 bg-white rounded-lg border border-gray-200 text-right">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Usuarios</span>
                <span className="text-lg font-black text-gray-900 leading-none">{allUsers.length}</span>
              </div>
              <div className="px-3.5 py-1.5 bg-white rounded-lg border border-gray-200 text-right">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Demos Listas</span>
                <span className="text-lg font-black text-emerald-600 leading-none">
                  {allProjects.filter(p => p.demoStatus === 'approved').length}
                </span>
              </div>
            </div>
          </div>

          {/* Navegación y Búsqueda en una sola fila compacta */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="inline-flex p-1 bg-gray-100 rounded-xl border border-gray-200/80">
              <button
                onClick={() => setAdminActiveTab('projects')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  adminActiveTab === 'projects'
                    ? 'bg-white text-gray-900 shadow-xs'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-gray-500" />
                <span>Proyectos</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                  adminActiveTab === 'projects' ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {allProjects.length}
                </span>
              </button>

              <button
                onClick={() => setAdminActiveTab('users')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  adminActiveTab === 'users'
                    ? 'bg-white text-gray-900 shadow-xs'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <Users className="w-3.5 h-3.5 text-gray-500" />
                <span>Usuarios</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                  adminActiveTab === 'users' ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {allUsers.length}
                </span>
              </button>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={adminSearch}
                onChange={(e) => setAdminSearch(e.target.value)}
                placeholder={adminActiveTab === 'projects' ? "Buscar proyecto..." : "Buscar usuario..."}
                className="w-full pl-9 pr-7 py-1.5 bg-white border border-gray-200 rounded-lg text-xs text-gray-800 placeholder-gray-400 focus:outline-hidden focus:ring-1 focus:ring-gray-400"
              />
              {adminSearch && (
                <button 
                  onClick={() => setAdminSearch('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* Filtro por Empresa Elegante y Compacto */}
          <div className="bg-white px-4 py-2.5 rounded-xl border border-gray-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 mr-1">
                <Filter className="w-3.5 h-3.5 text-gray-400" />
                Empresa:
              </span>

              <select
                value={adminCompanyFilter}
                onChange={(e) => setAdminCompanyFilter(e.target.value)}
                className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-800 focus:outline-hidden focus:border-gray-400 cursor-pointer"
              >
                <option value="all">Todas las Empresas ({adminActiveTab === 'projects' ? allProjects.length : allUsers.length})</option>
                {PARTICIPATING_COMPANIES.map(c => {
                  const count = adminActiveTab === 'projects'
                    ? allProjects.filter(p => p.companyId === c.id).length
                    : allUsers.filter(u => u.companyId === c.id).length;
                  return (
                    <option key={c.id} value={c.id}>{c.name} ({count})</option>
                  );
                })}
              </select>

              <button
                onClick={() => setAdminCompanyFilter('all')}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  adminCompanyFilter === 'all'
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                Todas
              </button>

              {PARTICIPATING_COMPANIES.filter(c => {
                const count = adminActiveTab === 'projects'
                  ? allProjects.filter(p => p.companyId === c.id).length
                  : allUsers.filter(u => u.companyId === c.id).length;
                return count > 0;
              }).map(c => {
                const count = adminActiveTab === 'projects'
                  ? allProjects.filter(p => p.companyId === c.id).length
                  : allUsers.filter(u => u.companyId === c.id).length;
                const isSelected = adminCompanyFilter === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setAdminCompanyFilter(c.id)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#CC2027] text-white'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200'
                    }`}
                  >
                    <img src={c.logo} alt={c.name} className="h-3 max-w-[36px] object-contain" />
                    <span>{c.name}</span>
                    <span className={`text-[10px] font-mono ${isSelected ? 'text-white/90' : 'text-gray-400'}`}>({count})</span>
                  </button>
                );
              })}
            </div>

            <span className="text-xs font-mono text-gray-400 ml-auto">
              {adminActiveTab === 'projects' ? filteredProjects.length : filteredUsers.length} resultado(s)
            </span>
          </div>

          {/* VISTA 1: PROYECTOS REGISTRADOS */}
          {adminActiveTab === 'projects' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProjects.length === 0 ? (
                <div className="col-span-full py-16 text-center bg-white rounded-xl border border-gray-200 p-8">
                  <Building2 className="w-10 h-10 text-gray-300 mx-auto mb-2.5" />
                  <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-1">Sin proyectos en esta selección</h3>
                  <p className="text-xs text-gray-400">Los participantes seleccionados aún no han completado su ficha de registro.</p>
                </div>
              ) : (
                filteredProjects.map(p => {
                  const companyObj = PARTICIPATING_COMPANIES.find(c => c.id === p.companyId) || PARTICIPATING_COMPANIES[0];
                  return (
                    <div key={p.id} className="bg-white rounded-xl border border-gray-200 shadow-2xs hover:shadow-sm transition-all overflow-hidden flex flex-col justify-between">
                      
                      <div className="p-5 border-b border-gray-100">
                        <div className="flex items-center justify-between gap-3 mb-2.5">
                          <div className="h-7 flex items-center">
                            <img src={companyObj.logo} alt={companyObj.name} className="max-h-6 max-w-[110px] object-contain" />
                          </div>
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 border border-gray-200/60">
                            Cat. {p.categoryId}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-gray-900 leading-snug">
                          {p.title}
                        </h3>
                      </div>

                      <div className="p-5 space-y-3 flex-1">
                        {p.scope && (
                          <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                            {p.scope}
                          </p>
                        )}

                        {/* Solo mostrar si tiene datos comprobables reales */}
                        {p.verifiableMetrics && p.verifiableMetrics.trim().length > 0 && (
                          <div className="p-2.5 rounded-lg bg-emerald-50/50 border border-emerald-100 text-xs">
                            <span className="text-[10px] font-bold uppercase text-emerald-800 flex items-center gap-1 mb-0.5">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Datos Comprobables
                            </span>
                            <p className="text-emerald-950 text-xs font-normal leading-relaxed">
                              {p.verifiableMetrics}
                            </p>
                          </div>
                        )}

                        {/* Solo mostrar integrantes si existen */}
                        {p.members && p.members.length > 0 && (
                          <div>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                              Equipo:
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {p.members.map(m => (
                                <span key={m.id} className="text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-700">
                                  {m.name}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="pt-2 flex items-center justify-between text-xs text-gray-500 border-t border-gray-100">
                          <span className="text-[10px] uppercase font-bold text-gray-400">Demo:</span>
                          <span className={`text-[11px] font-semibold ${
                            p.demoStatus === 'approved' ? 'text-emerald-600' :
                            p.demoStatus === 'scheduled' ? 'text-blue-600' :
                            'text-gray-400'
                          }`}>
                            {p.demoStatus === 'approved' ? '✓ Aprobado 15 Ene' :
                             p.demoStatus === 'scheduled' ? `Agendada: ${p.demoDate || 'Pendiente'}` :
                             'Por Agendar'}
                          </span>
                        </div>
                      </div>

                      <div className="p-3.5 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5">
                          {p.githubUrl && (
                            <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="p-1.5 text-gray-500 hover:text-gray-900 bg-white rounded-md border border-gray-200 transition-colors" title="Ver GitHub">
                              <GithubIcon className="w-3.5 h-3.5" />
                            </a>
                          )}
                          {p.youtubeUrl && (
                            <a href={p.youtubeUrl} target="_blank" rel="noopener noreferrer" className="p-1.5 text-gray-500 hover:text-red-600 bg-white rounded-md border border-gray-200 transition-colors" title="Ver Video Demo">
                              <Video className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button 
                            onClick={() => setEditingProject(p)}
                            className="px-2.5 py-1 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 text-xs font-semibold transition-colors cursor-pointer"
                            title="Editar información"
                          >
                            Editar
                          </button>

                          <button 
                            onClick={() => handleDeleteProject(p.id, p.title)}
                            className="p-1.5 rounded-md text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                            title="Eliminar proyecto"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>

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
                            className="px-3 py-1.5 rounded-lg bg-gray-900 hover:bg-black text-white text-xs font-bold transition-colors cursor-pointer"
                          >
                            Ver Ficha
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })
              )}
            </div>
          ) : (
            /* VISTA 2: USUARIOS REGISTRADOS */
            <div className="space-y-4">
              {filteredUsers.length === 0 ? (
                <div className="py-16 text-center bg-white rounded-xl border border-gray-200 p-8">
                  <Users className="w-10 h-10 text-gray-300 mx-auto mb-2.5" />
                  <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Sin usuarios en este filtro
                  </h3>
                  <p className="text-xs text-gray-400">
                    Los colaboradores registrados aparecerán automáticamente en esta lista.
                  </p>
                </div>
              ) : (
                <div className="bg-white rounded-xl border border-gray-200 shadow-2xs overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-gray-200 bg-gray-50/80 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                          <th className="py-4 px-6">Usuario / Participante</th>
                          <th className="py-4 px-6">Correo Electrónico</th>
                          <th className="py-4 px-6">Empresa</th>
                          <th className="py-4 px-6">Categoría</th>
                          <th className="py-4 px-6">Ficha de Proyecto</th>
                          <th className="py-4 px-6">Registro</th>
                          <th className="py-4 px-6 text-right">Acciones</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 text-xs">
                        {filteredUsers.map(u => {
                          const companyObj = PARTICIPATING_COMPANIES.find(c => c.id === u.companyId) || PARTICIPATING_COMPANIES[0];
                          const userProject = allProjects.find(
                            p => (p.userId && p.userId.toLowerCase().trim() === u.email.toLowerCase().trim()) || p.id === u.id
                          );
                          const initials = (u.name || u.email || 'U')
                            .split(' ')
                            .map(n => n[0])
                            .slice(0, 2)
                            .join('')
                            .toUpperCase();

                          return (
                            <tr key={u.id || u.email} className="hover:bg-gray-50/70 transition-colors">
                              
                              {/* Nombre y Rol */}
                              <td className="py-4 px-6">
                                <div className="flex items-center gap-3">
                                  <div className="w-9 h-9 rounded-xl bg-gray-900 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                                    {initials}
                                  </div>
                                  <div>
                                    <div className="font-bold text-gray-900 text-sm">{u.name}</div>
                                    <span className={`inline-block mt-0.5 text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                                      u.role === 'admin' 
                                        ? 'bg-red-50 text-[#CC2027] border border-red-200' 
                                        : 'bg-gray-100 text-gray-600'
                                    }`}>
                                      {u.role === 'admin' ? 'Administrador' : 'Participante'}
                                    </span>
                                  </div>
                                </div>
                              </td>

                              {/* Correo */}
                              <td className="py-4 px-6">
                                <a 
                                  href={`mailto:${u.email}`} 
                                  className="text-gray-600 hover:text-[#CC2027] flex items-center gap-1.5 font-mono text-[11px] transition-colors"
                                >
                                  <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                                  <span>{u.email}</span>
                                </a>
                              </td>

                              {/* Empresa */}
                              <td className="py-4 px-6">
                                <div className="flex items-center gap-2.5">
                                  <div className="h-7 w-12 bg-white rounded border border-gray-200 p-0.5 flex items-center justify-center shrink-0">
                                    <img src={companyObj.logo} alt={companyObj.name} className="max-h-5 max-w-full object-contain" />
                                  </div>
                                  <div>
                                    <span className="font-bold text-gray-800 block text-xs">{companyObj.name}</span>
                                    {u.companyId === 'multiempresa' && u.targetCompanies && u.targetCompanies.length > 0 && (
                                      <span className="text-[10px] text-gray-400 font-mono">
                                        ({u.targetCompanies.length} empresas)
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </td>

                              {/* Categoría */}
                              <td className="py-4 px-6">
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-gray-100 text-gray-800 border border-gray-200">
                                  Cat. {u.categoryId || '1'}
                                </span>
                              </td>

                              {/* Estado del Proyecto */}
                              <td className="py-4 px-6">
                                {userProject ? (
                                  <div className="space-y-1">
                                    <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                      <span>Registrado</span>
                                    </div>
                                    <div className="font-semibold text-gray-900 truncate max-w-[220px]" title={userProject.title}>
                                      {userProject.title}
                                    </div>
                                    <div className="text-[10px] text-gray-400 font-mono">
                                      {userProject.milestones?.filter(m => m.completed).length || 0} de {userProject.milestones?.length || 4} hitos listos
                                    </div>
                                  </div>
                                ) : (
                                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-amber-50 text-amber-700 border border-amber-200">
                                    <Clock className="w-3 h-3 text-amber-500" />
                                    <span>Ficha en proceso</span>
                                  </div>
                                )}
                              </td>

                              {/* Fecha de Registro */}
                              <td className="py-4 px-6 text-gray-500 font-mono text-[11px]">
                                {u.registeredAt ? (
                                  new Date(u.registeredAt).toLocaleDateString('es-MX', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric'
                                  })
                                ) : (
                                  'Reciente'
                                )}
                              </td>

                              {/* Acciones */}
                              <td className="py-4 px-6 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  {userProject && (
                                    <button
                                      onClick={() => {
                                        setProject(userProject);
                                        setCurrentUser({
                                          email: u.email,
                                          name: u.name,
                                          role: 'participant',
                                          companyId: u.companyId
                                        });
                                      }}
                                      className="px-2.5 py-1.5 rounded-lg bg-gray-900 hover:bg-black text-white text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                                      title="Ver y editar ficha del participante"
                                    >
                                      Ver Ficha
                                    </button>
                                  )}
                                  <button
                                    onClick={() => handleDeleteUser(u.id || u.email)}
                                    className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs transition-colors cursor-pointer"
                                    title="Eliminar usuario registrado"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>

                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

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
                <div className="flex flex-wrap items-center gap-2.5 mb-2">
                  <span className="text-[10px] font-black uppercase px-3 py-1 rounded-full bg-red-50 text-[#CC2027] border border-red-200 shadow-2xs">
                    Categoría {project.categoryId} · {CATEGORIES.find(c => c.id === project.categoryId)?.name}
                  </span>
                  <span className="text-xs text-gray-500 font-bold uppercase tracking-widest flex items-center gap-1.5">
                    <span className="text-gray-400">Empresa:</span>
                    <span className="text-gray-900">{PARTICIPATING_COMPANIES.find(c => c.id === project.companyId)?.name}</span>
                    {project.companyId === 'prosur' && (
                      <span className="ml-1 text-[10px] font-bold text-[#CC2027] bg-red-50 px-2 py-0.5 rounded-full border border-red-200">
                        Transversal
                      </span>
                    )}
                    {project.companyId === 'multiempresa' && (
                      <span className="ml-1 text-[10px] font-bold text-gray-700 bg-gray-100 px-2.5 py-0.5 rounded-full border border-gray-200">
                        Colaborativo
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

                {project.companyId === 'multiempresa' && (
                  <div className="p-5 rounded-2xl bg-gray-50/90 border border-gray-200/90 space-y-4 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between pb-2.5 border-b border-gray-200/60">
                      <div className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-[#CC2027]"></span>
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-900">
                          Empresas que integran tu solución Multi Empresa
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-gray-500 bg-white px-2.5 py-0.5 rounded-full border border-gray-200">
                        {(project.targetCompanies || []).length} seleccionadas
                      </span>
                    </div>

                    <p className="text-xs text-gray-500 leading-relaxed font-normal">
                      Selecciona las empresas participantes en este desarrollo colaborativo:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1">
                      {PARTICIPATING_COMPANIES.filter(c => !['otros', 'multiempresa'].includes(c.id)).map(c => {
                        const currentTargets = project.targetCompanies || [];
                        const checked = currentTargets.includes(c.id);
                        return (
                          <label 
                            key={c.id} 
                            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl border text-xs cursor-pointer transition-all duration-200 ${
                              checked 
                                ? 'bg-white border-[#CC2027] ring-1 ring-[#CC2027]/20 shadow-xs text-gray-900 font-bold' 
                                : 'bg-white/80 hover:bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                            }`}
                          >
                            <input 
                              type="checkbox"
                              checked={checked}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setProject({ ...project, targetCompanies: [...currentTargets, c.id] });
                                } else {
                                  setProject({ ...project, targetCompanies: currentTargets.filter(id => id !== c.id) });
                                }
                              }}
                              className="w-4 h-4 rounded text-[#CC2027] focus:ring-[#CC2027] border-gray-300 cursor-pointer"
                            />
                            <span className="whitespace-nowrap font-medium text-xs text-gray-900">{c.name}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}

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
                    Todos los integrantes listados recibirán acreditación y diploma oficial en el concurso del Viernes 15 de Enero.
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
                      <div className="text-xs text-gray-600 font-medium mb-1">{member.role}</div>
                      {member.company && (
                        <span className="inline-block text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200 mb-2">
                          Empresa: {PARTICIPATING_COMPANIES.find(c => c.id === member.company)?.name || member.company}
                        </span>
                      )}
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
                <form onSubmit={handleAddMember} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
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
                      placeholder="Rol (ej: Analista, Dev TI)"
                      value={newMemberRole} 
                      onChange={(e) => setNewMemberRole(e.target.value)}
                      className="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#CC2027]"
                    />
                  </div>
                  <div>
                    <select
                      value={newMemberCompany}
                      onChange={(e) => setNewMemberCompany(e.target.value)}
                      className="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#CC2027]"
                      title="Empresa a la que pertenece este integrante"
                    >
                      {PARTICIPATING_COMPANIES.filter(c => c.id !== 'multiempresa').map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <input 
                      type="email" 
                      placeholder="Correo Institucional"
                      value={newMemberEmail} 
                      onChange={(e) => setNewMemberEmail(e.target.value)}
                      className="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#CC2027]"
                    />
                  </div>
                  <div className="flex gap-2">
                    <input 
                      type="tel" 
                      placeholder="Teléfono / Cel"
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
                    <h3 className="text-base font-black text-gray-900 uppercase tracking-tight">Checklist de Calidad y Alcance</h3>
                    <p className="text-xs text-gray-500">Criterios mínimos que deben cumplirse antes de agendar la demo.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { key: 'problem_defined', label: 'Problema Operativo Definido', desc: 'Identifica con precisión el área, dolor operativo y usuarios afectados.' },
                    { key: 'functional_solution', label: 'Solución Funcional Comprobada', desc: 'No es una idea teórica; el modelo o software ya procesa datos en un entorno real o piloto.' },
                    { key: 'verifiable_metrics', label: 'Datos Comprobables (Antes vs. Después)', desc: 'Existe medición cuantificable de ahorro de tiempo, reducción de error o beneficio económico.' },
                    { key: 'company_endorsed', label: 'Validado por la Empresa Participante', desc: 'Cuenta con la aprobación y respaldo de los líderes del proceso en la empresa.' },
                    { key: 'repo_available', label: 'Código y Documentación Lista', desc: 'Repositorio de GitHub o documentación técnica disponible para auditoría del jurado.' }
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
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
                <div>
                  <h2 className="text-xl font-black uppercase tracking-tight text-gray-900">
                    Cronograma de Avances y Bitácora
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Hitos oficiales del reto y registro de avances técnicos de tu equipo.
                  </p>
                </div>
              </div>

              <div className="relative border-l-2 border-gray-200 ml-4 pl-6 space-y-8">
                {project.milestones.map((m) => (
                  <div key={m.id} className="relative group">
                    <div 
                      onClick={() => {
                        setProject({
                          ...project,
                          milestones: project.milestones.map(item => 
                            item.id === m.id ? { ...item, completed: !item.completed } : item
                          )
                        });
                      }}
                      className={`absolute -left-[35px] top-0 w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all ${m.completed ? 'bg-[#CC2027] border-[#CC2027] text-white' : 'bg-white border-gray-300 text-transparent group-hover:border-[#CC2027]'}`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>

                    <div className="bg-gray-50/70 p-5 rounded-2xl border border-gray-200/80">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                        <h4 className="text-sm font-black text-gray-900">{m.title}</h4>
                        <span className="text-[10px] font-bold text-[#CC2027] bg-red-50 px-2.5 py-0.5 rounded-full border border-red-200/60">
                          {m.date}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed font-normal">{m.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-700 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-[#CC2027]" /> Registrar Avance o Hito Adicional
                </h3>
                <form onSubmit={handleAddMilestone} className="space-y-3">
                  <input 
                    type="text" 
                    placeholder="Título del Hito (Ej: Integración con base de datos de sucursales) *"
                    required
                    value={newMilestoneTitle} 
                    onChange={(e) => setNewMilestoneTitle(e.target.value)}
                    className="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#CC2027]"
                  />
                  <textarea 
                    rows={2}
                    placeholder="Detalles del avance técnico o pruebas realizadas..."
                    value={newMilestoneDesc} 
                    onChange={(e) => setNewMilestoneDesc(e.target.value)}
                    className="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#CC2027]"
                  />
                  <div className="flex justify-end">
                    <button 
                      type="submit"
                      className="px-5 py-2.5 bg-[#CC2027] hover:bg-[#b01b21] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                    >
                      Añadir Avance a la Bitácora
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {activeTab === 'demo' && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-xs space-y-8">
              <div>
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#CC2027] mb-2">
                  <Video className="w-4 h-4" />
                  <span>Fase de Validación y Admisibilidad</span>
                </div>
                <h2 className="text-2xl font-black uppercase tracking-tight text-gray-900">
                  Agenda tu Demo de Validación Operativa
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                  Para que tu proyecto clasifique formalmente a la presentación final del <strong>Viernes 15 de Enero</strong>, deberás mostrar tu solución funcionando en vivo (30 minutos) ante el equipo de Mejora Continua de Grupo Prosur.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-gray-700">Estado de tu Demo</h4>
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-amber-500 animate-ping"></span>
                    <span className="text-sm font-black text-gray-900">
                      {project.demoStatus === 'approved' ? '¡Proyecto Aprobado para el Concurso del Viernes 15 de Enero!' :
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

      {/* Modal de Edición de Proyecto / Usuario para Administrador */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setEditingProject(null)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl relative border-t-4 border-[#CC2027]" onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setEditingProject(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Edit className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">Editar Proyecto / Registro</h3>
                <p className="text-xs text-gray-500">Panel de Administración Exclusivo</p>
              </div>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              handleUpdateProjectAdmin(editingProject);
            }} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Título del Proyecto *
                </label>
                <input 
                  type="text"
                  required
                  value={editingProject.title}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#CC2027]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Empresa Asignada *
                  </label>
                  <select 
                    value={editingProject.companyId}
                    onChange={(e) => setEditingProject({ ...editingProject, companyId: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-200 text-xs font-semibold focus:outline-none focus:border-[#CC2027]"
                  >
                    {PARTICIPATING_COMPANIES.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Categoría *
                  </label>
                  <select 
                    value={editingProject.categoryId}
                    onChange={(e) => setEditingProject({ ...editingProject, categoryId: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-200 text-xs font-semibold focus:outline-none focus:border-[#CC2027]"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c.id} value={c.id}>Cat. {c.id}: {c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Alcance y Propuesta
                </label>
                <textarea 
                  rows={3}
                  value={editingProject.scope}
                  onChange={(e) => setEditingProject({ ...editingProject, scope: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#CC2027]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Métricas Comprobables (Antes vs. Después)
                </label>
                <textarea 
                  rows={2}
                  value={editingProject.verifiableMetrics}
                  onChange={(e) => setEditingProject({ ...editingProject, verifiableMetrics: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#CC2027]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Estado Demo
                  </label>
                  <select 
                    value={editingProject.demoStatus}
                    onChange={(e) => setEditingProject({ ...editingProject, demoStatus: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl border border-gray-200 text-xs font-medium focus:outline-none focus:border-[#CC2027]"
                  >
                    <option value="pending">Por Agendar</option>
                    <option value="scheduled">Agendada</option>
                    <option value="approved">Aprobado Viernes 15 de Enero</option>
                    <option value="adjustments">Requiere Ajustes</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Fecha Demo
                  </label>
                  <input 
                    type="text"
                    value={editingProject.demoDate || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, demoDate: e.target.value })}
                    placeholder="Ej: 25 de Noviembre 11:00 AM"
                    className="w-full p-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#CC2027]"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
                <button 
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-gray-800 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#CC2027] hover:bg-[#b01b21] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
