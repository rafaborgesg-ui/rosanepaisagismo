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
