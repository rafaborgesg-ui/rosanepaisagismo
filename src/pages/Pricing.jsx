import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import PlanosSection from '@/components/sistema/PlanosSection';

export default function Pricing() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoadingAuth } = useAuth();

  if (isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-4 border-stone-200 border-t-stone-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif:wght@400;600;700;900&family=Work+Sans:wght@400;500;600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        .font-serif-pricing { font-family: 'Noto Serif', serif; }
        .font-sans-pricing { font-family: 'Work Sans', sans-serif; }
        .material-symbols-outlined { font-family: 'Material Symbols Outlined'; font-weight: normal; font-style: normal; font-size: 24px; line-height: 1; letter-spacing: normal; text-transform: none; display: inline-block; white-space: nowrap; word-wrap: normal; direction: ltr; -webkit-font-smoothing: antialiased; }
      `}</style>

      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-stone-100 font-sans-pricing">
        <div className="max-w-[1280px] mx-auto px-8 h-16 flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="font-serif-pricing text-lg font-bold text-[#1a3d2b] hover:text-[#276a4d] transition-colors"
          >
            ← Voltar
          </button>
          <h1 className="font-serif-pricing text-xl font-bold text-[#1a3d2b]">Planos</h1>
          <div className="w-20"></div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <PlanosSection onSignup={() => {}} />
      </main>
    </div>
  );
}
