import { Link } from 'react-router';
import { NotefulLogo } from '../components/common/NotefulLogo';
import { ArrowLeft } from 'lucide-react';

export function NotFoundPage() {
  return (
    <main className="min-h-screen w-full bg-[#f4f6f8] flex flex-col items-center justify-center p-6 selection:bg-[#3d6157] selection:text-white">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-[#e6e9ed] p-10 flex flex-col items-center text-center">
        <NotefulLogo variant="light" className="w-44 h-auto" />

        <div className="mt-8">
          <span className="text-6xl font-extrabold text-[#3d6157] tracking-tight">
            404
          </span>
          <h1 className="mt-2 text-xl font-bold text-[#1e293b]">
            Page Not Found
          </h1>
          <p className="mt-2 text-sm text-[#59766e]">
            The page you are looking for does not exist or has been moved.
          </p>
        </div>

        <div className="mt-8 w-full">
          <Link
            to="/"
            className="inline-flex w-full items-center justify-center gap-2 px-6 py-3 bg-[#3d6157] hover:bg-[#34534a] text-white text-sm font-semibold rounded-2xl shadow-md hover:shadow-lg transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default NotFoundPage;
