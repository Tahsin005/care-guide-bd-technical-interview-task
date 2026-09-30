import { Link } from 'react-router';
import { NotefulLogo } from '../components/common/NotefulLogo';
import { ArrowLeft, User, Mail, Lock } from 'lucide-react';

export function SignUpPage() {
  return (
    <main className="min-h-screen w-full bg-[#f4f6f8] flex flex-col items-center justify-center p-6 selection:bg-[#3d6157] selection:text-white">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-[#e6e9ed] overflow-hidden">
        <div className="px-8 pt-10 pb-6 flex flex-col items-center justify-center text-center border-b border-[#f0f2f5]">
          <NotefulLogo
            variant="light"
            className="w-48 h-auto"
          />
          <p className="mt-3 text-xs font-medium text-[#59766e]">
            Create your account to start taking secure notes
          </p>
        </div>

        <div className="p-8 space-y-5">
          <div>
            <label className="block text-xs font-semibold text-[#59766e] uppercase tracking-wider mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-3 w-4 h-4 text-[#59766e]" />
              <input
                type="text"
                disabled
                placeholder="Your full name"
                className="w-full pl-10 pr-4 py-2.5 bg-[#f4f6f8] border border-[#e6e9ed] rounded-xl text-sm text-[#1e293b] cursor-not-allowed placeholder:text-[#94a3b8]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#59766e] uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 w-4 h-4 text-[#59766e]" />
              <input
                type="email"
                disabled
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-2.5 bg-[#f4f6f8] border border-[#e6e9ed] rounded-xl text-sm text-[#1e293b] cursor-not-allowed placeholder:text-[#94a3b8]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#59766e] uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 w-4 h-4 text-[#59766e]" />
              <input
                type="password"
                disabled
                placeholder="Create a strong password"
                className="w-full pl-10 pr-4 py-2.5 bg-[#f4f6f8] border border-[#e6e9ed] rounded-xl text-sm text-[#1e293b] cursor-not-allowed placeholder:text-[#94a3b8]"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="button"
              disabled
              className="w-full py-3 bg-[#3d6157] text-white font-semibold rounded-xl text-sm opacity-80 cursor-not-allowed shadow-sm"
            >
              Sign Up (Placeholder)
            </button>
          </div>

          <div className="pt-4 text-center border-t border-[#f0f2f5]">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#3d6157] hover:text-[#34534a] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SignUpPage;
