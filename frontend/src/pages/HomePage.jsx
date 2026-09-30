import { NotefulLogo } from '../components/common/NotefulLogo';

export function HomePage() {
  return (
    <main className="min-h-screen w-full bg-[#f4f6f8] flex flex-col items-center justify-center p-6 selection:bg-[#3d6157] selection:text-white">
      <div className="flex flex-col items-center justify-center text-center">
        <NotefulLogo
          variant="light"
          className="w-80 sm:w-96 md:w-[460px] max-w-full h-auto drop-shadow-sm"
        />
      </div>
    </main>
  );
}

export default HomePage;
