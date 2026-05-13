import { supabase } from '../lib/supabaseClient';

const ensureSupabaseAuth = () => {
  if (!supabase) {
    throw new Error('Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
  }
  return supabase;
};

export const auth = {
  isAuthenticated: async () => {
    const client = ensureSupabaseAuth();
    const { data: { session } } = await client.auth.getSession();
    return !!session;
  },
  me: async () => {
    const client = ensureSupabaseAuth();
    const { data: { user } } = await client.auth.getUser();
    if (!user) return null;
    return {
      id: user.id,
      email: user.email,
      name: user.user_metadata?.name || user.email,
      role: user.user_metadata?.role || 'user'
    };
  },
  login: async ({ email, password }) => {
    const client = ensureSupabaseAuth();
    const { data, error } = await client.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data.user;
  },
  logout: async (redirectUrl) => {
    const client = ensureSupabaseAuth();
    await client.auth.signOut();
    if (redirectUrl) {
      window.location.href = redirectUrl;
    }
  },
  redirectToLogin: (fromUrl) => {
    window.location.href = `/login?from_url=${encodeURIComponent(fromUrl)}`;
  }
};
