-- =========================================================================
-- ESQUEMA DE BASE DE DATOS SUPABASE - RETO DE IA GRUPO PROSUR
-- =========================================================================

-- 1. Tabla de Empresas Participantes
CREATE TABLE IF NOT EXISTS companies (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    subtitle TEXT,
    logo_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar RLS en companies y permitir lectura pública
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view companies" ON companies;
CREATE POLICY "Public can view companies" ON companies FOR SELECT USING (true);

-- Insertar las 9 empresas convocadas iniciales
INSERT INTO companies (id, name, subtitle, logo_url) VALUES
('prosur', 'Grupo Prosur', 'Corporativo', '/companies/prosur.png'),
('chesa', 'Chesa', 'Grupo Automotríz', '/companies/chesa.png'),
('comercialtos', 'Comercialtos', 'Comercialización y Abasto', '/companies/comercialtos.jpg'),
('cincopinos', 'Cinco Pinos', 'Inmobiliaria y Proyectos', '/companies/cincopinos.png'),
('cai', 'CAI', 'Futuro Activo A.C.', '/companies/cai.png'),
('cafi', 'CAFI', 'Tu Casa Financiera', '/companies/cafi.png'),
('riovinyl', 'Rio Vinyl', 'Rio Vinyl de México', '/companies/riovinyl.png'),
('calzamoda', 'Calzamoda', 'Calzado y Retail', '/companies/calzamoda.png'),
('insumos_sureste', 'Insumos del Sureste', 'Insumos Industriales', '/companies/insumos_sureste.png')
ON CONFLICT (id) DO NOTHING;

-- 2. Tabla de Proyectos
CREATE TABLE IF NOT EXISTS projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    company_id TEXT REFERENCES companies(id),
    category_id TEXT NOT NULL,
    scope TEXT,
    problem TEXT,
    solution TEXT,
    verifiable_metrics TEXT,
    github_url TEXT,
    youtube_url TEXT,
    demo_status TEXT DEFAULT 'pending',
    demo_date TEXT,
    compliance_checks JSONB DEFAULT '{}'::jsonb,
    security_checks JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Tabla de Integrantes del Equipo
CREATE TABLE IF NOT EXISTS team_members (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    role TEXT,
    email TEXT,
    phone TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Tabla de Avances / Bitácora
CREATE TABLE IF NOT EXISTS project_milestones (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    date TEXT NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_milestones ENABLE ROW LEVEL SECURITY;

-- Políticas de Seguridad
DROP POLICY IF EXISTS "Users can view and edit own projects" ON projects;
CREATE POLICY "Users can view and edit own projects" 
ON projects FOR ALL 
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can view all projects" ON projects;
CREATE POLICY "Admins can view all projects" 
ON projects FOR SELECT 
USING (auth.jwt() ->> 'email' LIKE '%@prosur.com.mx');

DROP POLICY IF EXISTS "Users can view and edit own team members" ON team_members;
CREATE POLICY "Users can view and edit own team members" 
ON team_members FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM projects 
    WHERE projects.id = team_members.project_id 
    AND projects.user_id = auth.uid()
  )
);

DROP POLICY IF EXISTS "Users can view and edit own milestones" ON project_milestones;
CREATE POLICY "Users can view and edit own milestones" 
ON project_milestones FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM projects 
    WHERE projects.id = project_milestones.project_id 
    AND projects.user_id = auth.uid()
  )
);

-- 5. Tabla de Usuarios Registrados (Portal)
CREATE TABLE IF NOT EXISTS registered_users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    role TEXT DEFAULT 'participant',
    company_id TEXT,
    category_id TEXT,
    target_companies JSONB DEFAULT '[]'::jsonb,
    registered_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE registered_users ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view and edit registered_users" ON registered_users;
CREATE POLICY "Public can view and edit registered_users" 
ON registered_users FOR ALL 
USING (true) 
WITH CHECK (true);

-- Insertar administradores base
INSERT INTO registered_users (id, email, name, role, company_id, registered_at) VALUES
('user-carlos', 'gerencia.mejoracontinua@prosur.com.mx', 'Carlos Barrientos', 'admin', 'prosur', NOW()),
('user-dario', 'dario.gonzalez@prosur.com.mx', 'Dario Gonzalez', 'admin', 'prosur', NOW())
ON CONFLICT (id) DO NOTHING;

