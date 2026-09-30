import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { queryClient } from './lib/queryClient';
import { useAuthStore } from './store/authStore';
import { ProtectedRoute, PublicRoute } from './components/common/RouteGuard';
import { HomePage } from './pages/HomePage';
import { SignUpPage } from './pages/SignUpPage';
import { SignInPage } from './pages/SignInPage';
import { NotesPage } from './pages/NotesPage';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route element={<PublicRoute />}>
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/login" element={<Navigate to="/signin" replace />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/notes" element={<NotesPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
