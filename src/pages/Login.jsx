import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { auth } from '@/api/authService';
import { useAuth } from '@/lib/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { checkUserAuth } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log('Iniciando login para:', email);
      await auth.login({ email, password });
      console.log('Login bem-sucedido');
      
      // Aguarda um pouco para garantir que a sessão foi estabelecida
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Verifica a autenticação novamente
      await checkUserAuth();
      console.log('Auth verificado');
      
      const fromUrl = searchParams.get('from_url') || '/dashboard';
      console.log('Redirecionando para:', fromUrl);
      navigate(fromUrl);
    } catch (error) {
      console.error('Erro no login:', error);
      toast({
        title: "Erro no login",
        description: error.message || 'Credenciais inválidas ou erro de servidor',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9f9f9] p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10 border border-stone-100 animate-fade-in">
        <div className="text-center mb-10">
          <h1 className="font-serif-s text-3xl font-bold text-[#1a3d2b] mb-2">Acesso ao Sistema</h1>
          <p className="text-stone-500 text-sm">Plataforma de gestão para projetos premium</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-400">Email</label>
            <Input 
              type="email" 
              placeholder="seu@email.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="rounded-xl border-stone-200 h-12"
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-400">Senha</label>
            <Input 
              type="password" 
              placeholder="••••••••" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className="rounded-xl border-stone-200 h-12"
              disabled={isLoading}
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full h-12 bg-[#276a4d] hover:bg-[#1a3d2b] text-white rounded-xl font-bold transition-all shadow-lg shadow-[#276a4d]/20"
            disabled={isLoading}
          >
            {isLoading ? "Acessando..." : "Entrar no Sistema"}
          </Button>
        </form>
        
        <div className="mt-8 text-center">
          <a href="/" className="text-sm text-stone-400 hover:text-[#276a4d] transition-colors">Voltar para o site</a>
        </div>
      </div>
    </div>
  );
}
