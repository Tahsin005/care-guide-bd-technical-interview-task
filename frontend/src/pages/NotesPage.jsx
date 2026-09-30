import { Navbar } from '../components/common/Navbar';
import { useAuthStore } from '../store/authStore';
import { Plus, FileText, Shield, User, Mail, Sparkles } from 'lucide-react';

export function NotesPage() {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen w-full bg-[#f4f6f8] text-[#1e293b] flex flex-col selection:bg-[#3d6157] selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-10 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1e293b]">
              My Notes
            </h1>
            <p className="mt-1 text-sm text-[#59766e]">
              Welcome back, {user?.name}!
            </p>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#3d6157] hover:bg-[#34534a] text-white text-sm font-semibold rounded-xl shadow-sm hover:shadow-md transition-all self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>New Note</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white rounded-3xl p-8 border border-[#e6e9ed] shadow-sm flex flex-col items-center justify-center text-center min-h-[320px]">
            <div className="w-14 h-14 rounded-2xl bg-[#3d6157]/10 text-[#3d6157] flex items-center justify-center mb-4">
              <FileText className="w-7 h-7" />
            </div>
            <h2 className="text-lg font-bold text-[#1e293b]">
              Notes
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#e6e9ed] shadow-sm space-y-5">
            <div className="flex items-center gap-2 text-xs font-bold text-[#3d6157] tracking-wider">
              <Shield className="w-4 h-4" />
              <span>Session Status</span>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="flex items-start gap-2.5">
                <User className="w-4 h-4 text-[#59766e] mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-[#1e293b]">{user?.name}</p>
                  <p className="text-[#59766e] text-[11px]">Active account</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#59766e] mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-[#1e293b]">{user?.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#59766e] mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-[#1e293b]">Role & Interests</p>
                  <p className="text-[#59766e] text-[11px] capitalize">
                    {user?.role} {user?.interests?.length ? `· ${user.interests.join(', ')}` : ''}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default NotesPage;
