import { supabase } from '../lib/supabaseClient';

const createEntityMethods = (tableName) => ({
  list: async () => {
    const { data, error } = await supabase.from(tableName).select('*');
    if (error) throw error;
    return data;
  },
  filter: async (filters = {}) => {
    let query = supabase.from(tableName).select('*');
    Object.keys(filters).forEach(key => {
      query = query.eq(key, filters[key]);
    });
    const { data, error } = await query;
    if (error) throw error;
    return data;
  },
  get: async (id) => {
    const { data, error } = await supabase.from(tableName).select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  },
  create: async (payload) => {
    const { data, error } = await supabase.from(tableName).insert([payload]).select().single();
    if (error) throw error;
    return data;
  },
  update: async (id, payload) => {
    const { data, error } = await supabase.from(tableName).update(payload).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },
  delete: async (id) => {
    const { error } = await supabase.from(tableName).delete().eq('id', id);
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
    TeamInvite: createEntityMethods('team_invites'),
    Subscription: createEntityMethods('subscriptions'),
  },
  functions: {
    invoke: async (name, payload) => {
      // Supabase Edge Functions
      const { data, error } = await supabase.functions.invoke(name, { body: payload });
      return { data, error };
    }
  },
  integrations: {
    Core: {
      UploadFile: async ({ file, bucket = 'uploads' }) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { data, error } = await supabase.storage.from(bucket).upload(filePath, file);
        if (error) throw error;

        const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(filePath);
        return { data: { url: publicUrl }, error: null };
      }
    }
  }
};
