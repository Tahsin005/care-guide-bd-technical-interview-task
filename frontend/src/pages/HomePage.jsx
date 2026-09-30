import { Link } from 'react-router';
import { NotefulLogo } from '../components/common/NotefulLogo';
import { ArrowRight } from 'lucide-react';

export function HomePage() {
  return (
    <main className="min-h-screen w-full bg-[#f4f6f8] flex flex-col items-center justify-center p-6 selection:bg-[#3d6157] selection:text-white">
      <div className="flex flex-col items-center justify-center text-center">
        <NotefulLogo
          variant="light"
          className="w-80 sm:w-96 md:w-[460px] max-w-full h-auto drop-shadow-sm"
        />

        <div className="mt-10">
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#3d6157] hover:bg-[#34534a] text-white text-sm font-semibold rounded-2xl shadow-md hover:shadow-lg transition-all"
          >
            <span>Create an Account</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}

export default HomePage;
