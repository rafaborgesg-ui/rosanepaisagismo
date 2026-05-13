-- SQL para configurar o Supabase (Rosane Paisagismo)

-- Clientes
create table clientes (
  id uuid default uuid_generate_v4() primary key,
  nome text,
  email text,
  telefone text,
  endereco text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Projetos
create table projects (
  id uuid default uuid_generate_v4() primary key,
  nome_projeto text,
  cliente text,
  endereco text,
  status text,
  valor_total decimal,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Caixa Entrada
create table caixa_entrada (
  id uuid default uuid_generate_v4() primary key,
  competencia text,
  valor_mensal decimal,
  cliente text,
  status text,
  office_owner text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Caixa Saída
create table caixa_saida (
  id uuid default uuid_generate_v4() primary key,
  competencia text,
  valor decimal,
  categoria text,
  pago boolean default false,
  office_owner text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Comercial (Pipeline)
create table commercial (
  id uuid default uuid_generate_v4() primary key,
  nome_cliente text,
  status text, -- 'Fechou', 'Aguardando', 'Não Fechou'
  tipo_projeto text,
  proposta1 decimal,
  mes text,
  office_owner text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Metas
create table metas_anuais (
  id uuid default uuid_generate_v4() primary key,
  ano int,
  meta_ideal decimal,
  meta_realista decimal,
  meta_pessimista decimal,
  office_owner text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Catálogo Botânico
create table catalogo_botanico (
  id uuid default uuid_generate_v4() primary key,
  nome text,
  nome_cientifico text,
  categoria text,
  clima text,
  rega text,
  porte text,
  imagem_url text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Landing Content (Home page config)
create table landing_content (
  id uuid default uuid_generate_v4() primary key,
  logo_topo_url text,
  logo_topo_size integer,
  logo_rodape_url text,
  logo_rodape_size integer,
  slides jsonb,
  sobre_titulo text,
  sobre_cargo text,
  sobre_frase text,
  sobre_texto text,
  sobre_imagem_url text,
  servico1_titulo text,
  servico1_desc text,
  servico2_titulo text,
  servico2_desc text,
  servico3_titulo text,
  servico3_desc text,
  portfolio_items jsonb,
  whatsapp_numero text,
  email_contato text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Leads
create table leads (
  id uuid default uuid_generate_v4() primary key,
  nome text,
  email text unique,
  whatsapp text,
  fonte text,
  status text,
  data_captura timestamp with time zone,
  utm_source text,
  utm_campaign text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

create index if not exists idx_leads_email on leads(email);
create index if not exists idx_leads_fonte on leads(fonte);

-- Team Invites
create table team_invites (
  id uuid default uuid_generate_v4() primary key,
  owner_email text,
  invited_email text,
  role text,
  status text, -- 'Pendente', 'Aceito', 'Cancelado'
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Subscriptions
create table subscriptions (
  id uuid default uuid_generate_v4() primary key,
  user_email text,
  plan_id text,
  status text, -- 'active', 'past_due', 'canceled'
  current_period_end timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Projetos Execução
create table projetos_execucao (
  id uuid default uuid_generate_v4() primary key,
  nome_projeto text,
  cliente text,
  endereco text,
  status text,
  data_inicio timestamp with time zone,
  data_fim timestamp with time zone,
  office_owner text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Cronograma Execução
create table cronograma_execucao (
  id uuid default uuid_generate_v4() primary key,
  projeto_id uuid references projetos_execucao(id) on delete cascade,
  fase text,
  data_inicio timestamp with time zone,
  data_fim timestamp with time zone,
  status text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Fornecedores
create table fornecedores (
  id uuid default uuid_generate_v4() primary key,
  nome text,
  categoria text,
  telefone text,
  email text,
  office_owner text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Equipe
create table equipe (
  id uuid default uuid_generate_v4() primary key,
  nome text,
  email text,
  role text,
  office_owner text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- ALTER TABLES TO ADD MISSING COLUMNS
ALTER TABLE clientes ADD COLUMN IF NOT EXISTS cidade text;
ALTER TABLE clientes ADD COLUMN IF NOT EXISTS observacoes text;
ALTER TABLE clientes ADD COLUMN IF NOT EXISTS office_owner text;

ALTER TABLE caixa_entrada ADD COLUMN IF NOT EXISTS cliente text;
ALTER TABLE caixa_entrada ADD COLUMN IF NOT EXISTS tipo_projeto text;
ALTER TABLE caixa_entrada ADD COLUMN IF NOT EXISTS categoria text;
ALTER TABLE caixa_entrada ADD COLUMN IF NOT EXISTS status text;
ALTER TABLE caixa_entrada ADD COLUMN IF NOT EXISTS valor_total decimal;
ALTER TABLE caixa_entrada ADD COLUMN IF NOT EXISTS mes_inicio text;
ALTER TABLE caixa_entrada ADD COLUMN IF NOT EXISTS valor_mensal decimal;
ALTER TABLE caixa_entrada ADD COLUMN IF NOT EXISTS parcelas integer;
ALTER TABLE caixa_entrada ADD COLUMN IF NOT EXISTS vencimento date;
ALTER TABLE caixa_entrada ADD COLUMN IF NOT EXISTS arquivo_url text;
ALTER TABLE caixa_entrada ADD COLUMN IF NOT EXISTS arquivo_nome text;
ALTER TABLE caixa_entrada ADD COLUMN IF NOT EXISTS observacoes text;

-- ENABLE RLS
ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE caixa_entrada ENABLE ROW LEVEL SECURITY;
ALTER TABLE caixa_saida ENABLE ROW LEVEL SECURITY;
ALTER TABLE commercial ENABLE ROW LEVEL SECURITY;
ALTER TABLE metas_anuais ENABLE ROW LEVEL SECURITY;
ALTER TABLE catalogo_botanico ENABLE ROW LEVEL SECURITY;
ALTER TABLE landing_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_invites ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE projetos_execucao ENABLE ROW LEVEL SECURITY;
ALTER TABLE cronograma_execucao ENABLE ROW LEVEL SECURITY;
ALTER TABLE fornecedores ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipe ENABLE ROW LEVEL SECURITY;

-- POLICIES FOR CLIENTES
CREATE POLICY "Users can view their own office clients" ON clientes
  FOR SELECT USING (auth.jwt() ->> 'email' = office_owner);

CREATE POLICY "Users can insert their own office clients" ON clientes
  FOR INSERT WITH CHECK (auth.jwt() ->> 'email' = office_owner);

CREATE POLICY "Users can update their own office clients" ON clientes
  FOR UPDATE USING (auth.jwt() ->> 'email' = office_owner);

CREATE POLICY "Users can delete their own office clients" ON clientes
  FOR DELETE USING (auth.jwt() ->> 'email' = office_owner);

-- POLICIES FOR PROJECTS
CREATE POLICY "Users can view their own office projects" ON projects
  FOR SELECT USING (auth.jwt() ->> 'email' = office_owner);

CREATE POLICY "Users can insert their own office projects" ON projects
  FOR INSERT WITH CHECK (auth.jwt() ->> 'email' = office_owner);

CREATE POLICY "Users can update their own office projects" ON projects
  FOR UPDATE USING (auth.jwt() ->> 'email' = office_owner);

CREATE POLICY "Users can delete their own office projects" ON projects
  FOR DELETE USING (auth.jwt() ->> 'email' = office_owner);

-- POLICIES FOR CAIXA_ENTRADA
CREATE POLICY "Users can view their own office caixa_entrada" ON caixa_entrada
  FOR SELECT USING (auth.jwt() ->> 'email' = office_owner);

CREATE POLICY "Users can insert their own office caixa_entrada" ON caixa_entrada
  FOR INSERT WITH CHECK (auth.jwt() ->> 'email' = office_owner);

CREATE POLICY "Users can update their own office caixa_entrada" ON caixa_entrada
  FOR UPDATE USING (auth.jwt() ->> 'email' = office_owner);

CREATE POLICY "Users can delete their own office caixa_entrada" ON caixa_entrada
  FOR DELETE USING (auth.jwt() ->> 'email' = office_owner);

-- POLICIES FOR CAIXA_SAIDA
CREATE POLICY "Users can view their own office caixa_saida" ON caixa_saida
  FOR SELECT USING (auth.jwt() ->> 'email' = office_owner);

CREATE POLICY "Users can insert their own office caixa_saida" ON caixa_saida
  FOR INSERT WITH CHECK (auth.jwt() ->> 'email' = office_owner);

CREATE POLICY "Users can update their own office caixa_saida" ON caixa_saida
  FOR UPDATE USING (auth.jwt() ->> 'email' = office_owner);

CREATE POLICY "Users can delete their own office caixa_saida" ON caixa_saida
  FOR DELETE USING (auth.jwt() ->> 'email' = office_owner);

-- POLICIES FOR COMMERCIAL
CREATE POLICY "Users can view their own office commercial" ON commercial
  FOR SELECT USING (auth.jwt() ->> 'email' = office_owner);

CREATE POLICY "Users can insert their own office commercial" ON commercial
  FOR INSERT WITH CHECK (auth.jwt() ->> 'email' = office_owner);

CREATE POLICY "Users can update their own office commercial" ON commercial
  FOR UPDATE USING (auth.jwt() ->> 'email' = office_owner);

CREATE POLICY "Users can delete their own office commercial" ON commercial
  FOR DELETE USING (auth.jwt() ->> 'email' = office_owner);

-- POLICIES FOR METAS_ANUAIS
CREATE POLICY "Users can view their own office metas_anuais" ON metas_anuais
  FOR SELECT USING (auth.jwt() ->> 'email' = office_owner);

CREATE POLICY "Users can insert their own office metas_anuais" ON metas_anuais
  FOR INSERT WITH CHECK (auth.jwt() ->> 'email' = office_owner);

CREATE POLICY "Users can update their own office metas_anuais" ON metas_anuais
  FOR UPDATE USING (auth.jwt() ->> 'email' = office_owner);

CREATE POLICY "Users can delete their own office metas_anuais" ON metas_anuais
  FOR DELETE USING (auth.jwt() ->> 'email' = office_owner);

-- POLICIES FOR CATALOGO_BOTANICO (public, no office_owner)
CREATE POLICY "Anyone can view catalogo_botanico" ON catalogo_botanico
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert catalogo_botanico" ON catalogo_botanico
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update catalogo_botanico" ON catalogo_botanico
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete catalogo_botanico" ON catalogo_botanico
  FOR DELETE USING (auth.role() = 'authenticated');

-- POLICIES FOR LANDING_CONTENT (public)
CREATE POLICY "Anyone can view landing_content" ON landing_content
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert landing_content" ON landing_content
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update landing_content" ON landing_content
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete landing_content" ON landing_content
  FOR DELETE USING (auth.role() = 'authenticated');

-- POLICIES FOR TEAM_INVITES
CREATE POLICY "Users can view their own team_invites" ON team_invites
  FOR SELECT USING (auth.jwt() ->> 'email' = owner_email);

CREATE POLICY "Users can insert their own team_invites" ON team_invites
  FOR INSERT WITH CHECK (auth.jwt() ->> 'email' = owner_email);

CREATE POLICY "Users can update their own team_invites" ON team_invites
  FOR UPDATE USING (auth.jwt() ->> 'email' = owner_email);

CREATE POLICY "Users can delete their own team_invites" ON team_invites
  FOR DELETE USING (auth.jwt() ->> 'email' = owner_email);

-- POLICIES FOR SUBSCRIPTIONS
CREATE POLICY "Users can view their own subscriptions" ON subscriptions
  FOR SELECT USING (auth.jwt() ->> 'email' = user_email);

CREATE POLICY "Users can insert their own subscriptions" ON subscriptions
  FOR INSERT WITH CHECK (auth.jwt() ->> 'email' = user_email);

CREATE POLICY "Users can update their own subscriptions" ON subscriptions
  FOR UPDATE USING (auth.jwt() ->> 'email' = user_email);

CREATE POLICY "Users can delete their own subscriptions" ON subscriptions
  FOR DELETE USING (auth.jwt() ->> 'email' = user_email);

-- POLICIES FOR PROJETOS_EXECUCAO
CREATE POLICY "Users can view their own office projetos_execucao" ON projetos_execucao
  FOR SELECT USING (auth.jwt() ->> 'email' = office_owner);

CREATE POLICY "Users can insert their own office projetos_execucao" ON projetos_execucao
  FOR INSERT WITH CHECK (auth.jwt() ->> 'email' = office_owner);

CREATE POLICY "Users can update their own office projetos_execucao" ON projetos_execucao
  FOR UPDATE USING (auth.jwt() ->> 'email' = office_owner);

CREATE POLICY "Users can delete their own office projetos_execucao" ON projetos_execucao
  FOR DELETE USING (auth.jwt() ->> 'email' = office_owner);

-- POLICIES FOR CRONOGRAMA_EXECUCAO
CREATE POLICY "Users can view their own office cronograma_execucao" ON cronograma_execucao
  FOR SELECT USING (auth.jwt() ->> 'email' = office_owner);

CREATE POLICY "Users can insert their own office cronograma_execucao" ON cronograma_execucao
  FOR INSERT WITH CHECK (auth.jwt() ->> 'email' = office_owner);

CREATE POLICY "Users can update their own office cronograma_execucao" ON cronograma_execucao
  FOR UPDATE USING (auth.jwt() ->> 'email' = office_owner);

CREATE POLICY "Users can delete their own office cronograma_execucao" ON cronograma_execucao
  FOR DELETE USING (auth.jwt() ->> 'email' = office_owner);

-- POLICIES FOR FORNECEDORES
CREATE POLICY "Users can view their own office fornecedores" ON fornecedores
  FOR SELECT USING (auth.jwt() ->> 'email' = office_owner);

CREATE POLICY "Users can insert their own office fornecedores" ON fornecedores
  FOR INSERT WITH CHECK (auth.jwt() ->> 'email' = office_owner);

CREATE POLICY "Users can update their own office fornecedores" ON fornecedores
  FOR UPDATE USING (auth.jwt() ->> 'email' = office_owner);

CREATE POLICY "Users can delete their own office fornecedores" ON fornecedores
  FOR DELETE USING (auth.jwt() ->> 'email' = office_owner);

-- POLICIES FOR EQUIPE
CREATE POLICY "Users can view their own office equipe" ON equipe
  FOR SELECT USING (auth.jwt() ->> 'email' = office_owner);

CREATE POLICY "Users can insert their own office equipe" ON equipe
  FOR INSERT WITH CHECK (auth.jwt() ->> 'email' = office_owner);

CREATE POLICY "Users can update their own office equipe" ON equipe
  FOR UPDATE USING (auth.jwt() ->> 'email' = office_owner);

CREATE POLICY "Users can delete their own office equipe" ON equipe
  FOR DELETE USING (auth.jwt() ->> 'email' = office_owner);
