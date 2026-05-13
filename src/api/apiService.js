import { supabase } from '../lib/supabaseClient';

const ensureSupabase = () => {
  if (!supabase) {
    throw new Error('Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
  }
  return supabase;
};

const createEntityMethods = (tableName) => ({
  list: async () => {
    const client = ensureSupabase();
    const { data, error } = await client.from(tableName).select('*');
    if (error) throw error;
    return data;
  },
  filter: async (filters = {}) => {
    const client = ensureSupabase();
    let query = client.from(tableName).select('*');
    Object.keys(filters).forEach(key => {
      query = query.eq(key, filters[key]);
    });
    const { data, error } = await query;
    if (error) throw error;
    return data;
  },
  get: async (id) => {
    const client = ensureSupabase();
    const { data, error } = await client.from(tableName).select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  },
  create: async (payload) => {
    const client = ensureSupabase();
    const { data, error } = await client.from(tableName).insert([payload]).select().single();
    if (error) throw error;
    return data;
  },
  update: async (id, payload) => {
    const client = ensureSupabase();
    const { data, error } = await client.from(tableName).update(payload).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },
  delete: async (id) => {
    const client = ensureSupabase();
    const { error } = await client.from(tableName).delete().eq('id', id);
    if (error) throw error;
    return true;
  }
});

export const api = {
  entities: {
    CaixaEntrada: createEntityMethods('caixa_entrada'),
    CaixaSaida: createEntityMethods('caixa_saida'),
    Commercial: createEntityMethods('commercial'),
    Project: createEntityMethods('projects'),
    Projeto: createEntityMethods('projects'),
    ProjetoExecucao: createEntityMethods('projetos_execucao'),
    CronogramaExecucao: createEntityMethods('cronograma_execucao'),
    Cliente: createEntityMethods('clientes'),
    Fornecedor: createEntityMethods('fornecedores'),
    Equipe: createEntityMethods('equipe'),
    MetaAnual: createEntityMethods('metas_anuais'),
    CatalogoBotanico: createEntityMethods('catalogo_botanico'),
    LandingContent: createEntityMethods('landing_content'),
    Leads: createEntityMethods('leads'),
    TeamInvite: createEntityMethods('team_invites'),
    Subscription: createEntityMethods('subscriptions'),
  },
  functions: {
    invoke: async (name, payload) => {
      const client = ensureSupabase();
      // Supabase Edge Functions
      const { data, error } = await client.functions.invoke(name, { body: payload });
      return { data, error };
    }
  },
  integrations: {
    Core: {
      UploadFile: async ({ file, bucket = 'uploads' }) => {
        const client = ensureSupabase();
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { data, error } = await client.storage.from(bucket).upload(filePath, file);
        if (error) throw error;

        const { data: { publicUrl } } = client.storage.from(bucket).getPublicUrl(filePath);
        return { data: { url: publicUrl }, error: null };
      }
    }
  }
};
