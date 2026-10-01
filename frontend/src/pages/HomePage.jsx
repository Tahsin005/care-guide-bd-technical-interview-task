import { Link } from 'react-router';
import { NotefulLogo } from '../components/common/NotefulLogo';
import { useAuthStore } from '../store/authStore';
import {
  ArrowRight,
  Sparkles,
  FileText,
  Share2,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export function HomePage() {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <div className="h-screen max-h-screen overflow-hidden flex flex-col justify-between bg-[#f4f6f8] relative selection:bg-[#3d6157] selection:text-white">

      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_75%_55%_at_50%_-5%,rgba(61,97,87,0.14),rgba(244,246,248,0))]" />


      <header className="relative z-10 px-6 sm:px-10 py-3.5 flex items-center justify-between border-b border-[#e6e9ed]/80 bg-white/70 backdrop-blur-md">
        <Link to="/" className="flex items-center gap-2">
          <NotefulLogo variant="light" className="w-32 sm:w-36 h-auto" />
        </Link>

        <nav className="flex items-center gap-2 sm:gap-3">
          {isAuthenticated ? (
            <>
              <Link
                to="/notes"
                className="px-3.5 py-1.5 text-xs font-semibold text-[#3d6157] hover:bg-[#3d6157]/10 rounded-xl transition-all"
              >
                Notes
              </Link>
              <Link
                to="/posts"
                className="px-3.5 py-1.5 text-xs font-semibold text-[#59766e] hover:text-[#1e293b] hover:bg-slate-100 rounded-xl transition-all"
              >
                Posts
              </Link>
              {user?.role === 'admin' && (
                <Link
                  to="/admin"
                  className="px-3.5 py-1.5 text-xs font-semibold text-[#59766e] hover:text-[#1e293b] hover:bg-slate-100 rounded-xl transition-all"
                >
                  Admin
                </Link>
              )}
              <Link
                to="/notes"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-[#3d6157] hover:bg-[#33524a] rounded-xl shadow-xs transition-all"
              >
                Dashboard
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/signin"
                className="px-4 py-1.5 text-xs font-semibold text-[#59766e] hover:text-[#1e293b] rounded-xl transition-all"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-[#3d6157] hover:bg-[#33524a] rounded-xl shadow-xs transition-all"
              >
                Get Started
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </>
          )}
        </nav>
      </header>


      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 text-center max-w-4xl mx-auto w-full py-4">

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#1e293b] leading-[1.12] mb-3 sm:mb-4">
          Capture Ideas. <br className="hidden sm:inline" />
          <span className="text-[#3d6157]">Organize Seamlessly.</span>
        </h1>


        <p className="text-sm sm:text-base md:text-lg text-[#59766e] max-w-xl mx-auto leading-relaxed mb-6">
          A focused workspace for taking notes, shared discussions.
        </p>


        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          {isAuthenticated ? (
            <>
              <Link
                to="/notes"
                className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-[#3d6157] hover:bg-[#33524a] rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                Go to Notes
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/posts"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#3d6157] bg-white hover:bg-slate-50 border border-[#e6e9ed] rounded-xl shadow-xs transition-all"
              >
                Explore Posts
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-[#3d6157] hover:bg-[#33524a] rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/signin"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#1e293b] bg-white hover:bg-slate-50 border border-[#e6e9ed] rounded-xl shadow-xs transition-all"
              >
                Sign In
              </Link>
            </>
          )}
        </div>
      </main>


      <footer className="relative z-10 px-6 sm:px-10 py-3 border-t border-[#e6e9ed]/70 bg-white/50 backdrop-blur-xs text-xs text-[#59766e] flex items-center justify-between">
        <span>© 2026 Noteful. All rights reserved.</span>
      </footer>
    </div>
  );
}

export default HomePage;
