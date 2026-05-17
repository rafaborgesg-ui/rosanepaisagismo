import { useEffect } from 'react';
import { auth } from '@/api/authService';
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import AppLayout from './components/layout/AppLayout';
import ScrollManager from './components/layout/ScrollManager';
import ProtectedRoute from './components/ProtectedRoute';
import ProtectedSubscriptionRoute from './components/ProtectedSubscriptionRoute';
import Landing from './pages/Landing';
import GuiaPaisagismo from './pages/GuiaPaisagismo';
import ServicoLanding from './pages/ServicoLanding';
import Portfolio from './pages/Portfolio';
import ProjetoPortfolio from './pages/ProjetoPortfolio';
import PaisagismoResidencial from './pages/PaisagismoResidencial';
import PaisagismoClinicas from './pages/PaisagismoClinicas';
import AreaGourmetPiscina from './pages/AreaGourmetPiscina';
import NicheLanding from './pages/NicheLanding';
import QuizPaisagismo from './pages/QuizPaisagismo';
import LocalLanding from './pages/LocalLanding';
import ManutencaoPremium from './pages/ManutencaoPremium';
import SobreEscritorio from './pages/SobreEscritorio';
import AcceptInvite from './pages/AcceptInvite';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentCancel from './pages/PaymentCancel';
import Dashboard from './pages/Dashboard';
import Comercial from './pages/Comercial';
import CaixaEntrada from './pages/CaixaEntrada';
import CaixaSaida from './pages/CaixaSaida';
import Metas from './pages/Metas';
import Relatorios from './pages/Relatorios';
import Equipe from './pages/Equipe';
import Fornecedores from './pages/Fornecedores';
import Projetos from './pages/Projetos';
import ProjetosExecucao from './pages/ProjetosExecucao';
import AgendaExecucao from './pages/AgendaExecucao';
import DetalheProjetoExecucao from './pages/DetalheProjetoExecucao';
import Clientes from './pages/Clientes';
import Sistema from './pages/Sistema';
import Contato from './pages/Contato';
import Produtos from './pages/Produtos';
import Admin from './pages/Admin';
import Pricing from './pages/Pricing';
import Agradecimento from './pages/Agradecimento';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermosDeServico from './pages/TermosDeServico';
import CatalogoBotanico from './pages/CatalogoBotanico';
import Login from './pages/Login';
import { trackEvent } from '@/lib/tracking';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isAuthenticated } = useAuth();

  // Show loading spinner while checking auth
  if (isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Always show landing first before checking auth
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/guia-paisagismo" element={<GuiaPaisagismo />} />
      <Route path="/servico/:id" element={<ServicoLanding />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/portfolio/:slug" element={<ProjetoPortfolio />} />
      <Route path="/paisagismo-residencial" element={<PaisagismoResidencial />} />
      <Route path="/paisagismo-clinicas" element={<PaisagismoClinicas />} />
      <Route path="/area-gourmet-piscina" element={<AreaGourmetPiscina />} />
      <Route path="/jardim-tropical" element={<NicheLanding slug="jardim-tropical" />} />
      <Route path="/jardim-vertical" element={<NicheLanding slug="jardim-vertical" />} />
      <Route path="/condominios-luxo" element={<NicheLanding slug="condominios-luxo" />} />
      <Route path="/fachadas-comerciais" element={<NicheLanding slug="fachadas-comerciais" />} />
      <Route path="/paisagismo-corporativo" element={<NicheLanding slug="paisagismo-corporativo" />} />
      <Route path="/quiz-paisagismo" element={<QuizPaisagismo />} />
      <Route path="/manutencao-premium" element={<ManutencaoPremium />} />
      <Route path="/sobre" element={<Navigate to="/#sobre" replace />} />
      <Route path="/paisagista-em-montes-claros" element={<LocalLanding slug="paisagista-em-montes-claros" />} />
      <Route path="/paisagismo-em-sao-paulo" element={<LocalLanding slug="paisagismo-em-sao-paulo" />} />
      <Route path="/paisagismo-alto-padrao-mg" element={<LocalLanding slug="paisagismo-alto-padrao-mg" />} />
      <Route path="/accept-invite" element={<AcceptInvite />} />
      <Route path="/sistema" element={<Sistema />} />
      <Route path="/contato" element={<Contato />} />
      <Route path="/produtos" element={<Produtos />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/agradecimento" element={<Agradecimento />} />
      <Route path="/privacidade" element={<PrivacyPolicy />} />
      <Route path="/termos" element={<TermosDeServico />} />
      <Route path="/catalogo" element={<CatalogoBotanico />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/payment/success" element={<PaymentSuccess />} />
      <Route path="/payment/cancel" element={<PaymentCancel />} />
      
      {/* Protected Routes */}
      <Route element={<ProtectedRoute unauthenticatedElement={<Navigate to="/login" replace />} />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<ProtectedSubscriptionRoute><Dashboard /></ProtectedSubscriptionRoute>} />
          <Route path="/comercial" element={<Comercial />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/caixa-entrada" element={<CaixaEntrada />} />
          <Route path="/caixa-saida" element={<CaixaSaida />} />
          <Route path="/metas" element={<Metas />} />
          <Route path="/relatorios" element={<Relatorios />} />
          <Route path="/equipe" element={<Equipe />} />
          <Route path="/fornecedores" element={<Fornecedores />} />
          <Route path="/projetos" element={<Projetos />} />
          <Route path="/projetos-execucao" element={<ProjetosExecucao />} />
          <Route path="/projetos-execucao/:id" element={<DetalheProjetoExecucao />} />
          <Route path="/agenda-execucao" element={<AgendaExecucao />} />
        </Route>
      </Route>
      
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {
  useEffect(() => {
    const handleDocumentClick = (event) => {
      const anchor = event.target?.closest?.("a[href]");
      if (!anchor) return;

      const href = anchor.getAttribute("href") || "";
      const isWhatsappLink = href.includes("wa.me/") || href.includes("api.whatsapp.com/");
      if (!isWhatsappLink) return;

      trackEvent("whatsapp_click", {
        href,
        page_path: window.location.pathname,
        cta_text: (anchor.textContent || "").trim().slice(0, 80) || "whatsapp_cta",
      });
    };

    document.addEventListener("click", handleDocumentClick, true);
    return () => document.removeEventListener("click", handleDocumentClick, true);
  }, []);

  return (
    <HelmetProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClientInstance}>
          <Router>
            <ScrollManager />
            <AuthenticatedApp />
          </Router>
          <Toaster />
        </QueryClientProvider>
      </AuthProvider>
    </HelmetProvider>
  )
}

export default App
