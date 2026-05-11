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
