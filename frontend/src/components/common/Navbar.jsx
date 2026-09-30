import { Link, useNavigate, useLocation } from 'react-router';
import { Blobatar } from '@blobatar/react';
import 'blobatar/motion.css';
import { NotefulLogo } from './NotefulLogo';
import { useAuthStore } from '../../store/authStore';
import { LogOut } from 'lucide-react';
import { toast } from 'react-hot-toast';

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    toast.success('Signed out successfully');
    navigate('/signin', { replace: true });
  };

  const seed = user?.email || user?.name || 'NotefulUser';

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-[#e6e9ed]">
      <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to={'/'}>
            <NotefulLogo variant="light" className="w-36 h-auto" />
          </Link>

          {isAuthenticated && (
            <nav className="flex items-center gap-1">
              <Link
                to="/notes"
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                  location.pathname === '/notes'
                    ? 'bg-[#3d6157]/10 text-[#3d6157]'
                    : 'text-[#59766e] hover:text-[#1e293b] hover:bg-[#f4f6f8]'
                }`}
              >
                Notes
              </Link>
              {user?.role === 'admin' && (
                <Link
                  to="/admin"
                  className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                    location.pathname === '/admin'
                      ? 'bg-[#3d6157]/10 text-[#3d6157]'
                      : 'text-[#59766e] hover:text-[#1e293b] hover:bg-[#f4f6f8]'
                  }`}
                >
                  Admin
                </Link>
              )}
            </nav>
          )}
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-2.5 pl-1.5 pr-3 py-1.5 bg-[#f4f6f8] rounded-full border border-[#e6e9ed] shadow-xs hover:border-[#3d6157]/30 transition-colors">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-xs border border-[#e6e9ed]/60">
                  <Blobatar
                    name={seed}
                    size={28}
                    animate="hover"
                    title={user?.name || 'User'}
                  />
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-xs font-semibold text-[#1e293b] leading-tight">
                    {user?.name || 'User'}
                  </p>
                  <p className="text-[10px] text-[#59766e] leading-tight capitalize">
                    {user?.role || 'member'}
                  </p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#59766e] hover:text-[#b91c1c] hover:bg-[#fee2e2]/40 rounded-xl transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/signin"
                className="px-4 py-2 text-xs font-semibold text-[#3d6157] hover:text-[#34534a] transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-[#3d6157] hover:bg-[#34534a] text-white text-xs font-semibold rounded-xl shadow-sm transition-all"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
