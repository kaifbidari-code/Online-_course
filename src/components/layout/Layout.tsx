import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';

export function Layout() {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith('/instructor') || location.pathname.startsWith('/admin');
  const isPlayerRoute = location.pathname.includes('/learn');

  if (isPlayerRoute) {
    return (
      <main className="min-h-screen bg-surface-900 text-white flex flex-col">
        <Outlet />
      </main>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-surface-50 text-text-primary">
      <Navbar />
      <div className="flex-1 flex w-full">
        {isDashboardRoute && <Sidebar />}
        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>
      {!isDashboardRoute && <Footer />}
    </div>
  );
}
