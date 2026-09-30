import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NotefulLogo } from '../components/common/NotefulLogo';
import { Mail, Lock, ArrowLeft, Eye, EyeOff, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { api } from '../lib/api';
import { useAuthStore } from '../store/authStore';
import { signInSchema } from '../lib/validations/auth.schema';

export function SignInPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (formData) => {
    try {
      const response = await api.post('/auth/login', {
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      });

      const { token, user } = response.data;
      setAuth(token, user);
      toast.success('Signed in successfully');

      const origin = location.state?.from?.pathname || '/notes';
      navigate(origin, { replace: true });
    } catch (err) {
      toast.error(err.message || 'Invalid email or password');
    }
  };

  return (
    <main className="min-h-screen w-full bg-[#f4f6f8] flex flex-col items-center justify-center p-6 selection:bg-[#3d6157] selection:text-white">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-[#e6e9ed] overflow-hidden">
        <div className="px-8 pt-10 pb-6 flex flex-col items-center justify-center text-center border-b border-[#f0f2f5]">
          <NotefulLogo variant="light" className="w-48 h-auto" />
          <h1 className="mt-4 text-xl font-bold text-[#1e293b]">
            Sign in to Noteful
          </h1>
          <p className="mt-1.5 text-xs font-medium text-[#59766e]">
            Access your encrypted notes and knowledge
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#59766e] uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 w-4 h-4 text-[#59766e]" />
              <input
                type="email"
                {...register('email')}
                placeholder="name@example.com"
                className={`w-full pl-10 pr-4 py-2.5 bg-[#f4f6f8] border rounded-xl text-sm text-[#1e293b] outline-none transition-colors placeholder:text-[#94a3b8] ${
                  errors.email
                    ? 'border-[#b91c1c] focus:border-[#b91c1c] focus:bg-white'
                    : 'border-[#e6e9ed] focus:border-[#467368] focus:bg-white'
                }`}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-xs text-[#b91c1c]">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#59766e] uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 w-4 h-4 text-[#59766e]" />
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                placeholder="Enter your password"
                className={`w-full pl-10 pr-11 py-2.5 bg-[#f4f6f8] border rounded-xl text-sm text-[#1e293b] outline-none transition-colors placeholder:text-[#94a3b8] ${
                  errors.password
                    ? 'border-[#b91c1c] focus:border-[#b91c1c] focus:bg-white'
                    : 'border-[#e6e9ed] focus:border-[#467368] focus:bg-white'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-[#59766e] hover:text-[#3d6157] transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-[#b91c1c]">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-[#3d6157] hover:bg-[#34534a] text-white font-semibold rounded-xl text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </div>

          <div className="pt-2 text-center">
            <p className="text-xs text-[#59766e]">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="font-semibold text-[#3d6157] hover:underline"
              >
                Sign Up
              </Link>
            </p>
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
        </form>
      </div>
    </main>
  );
}

export default SignInPage;
