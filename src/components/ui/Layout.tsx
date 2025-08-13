import { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';

// Function to generate menu items based on user
const getMenuItems = (user: any) => {
  // Determine dashboard URL based on user type
  let dashboardHref = '/dashboard';
  if (user?.organizationType === 'Corporate' && user?.id) {
    dashboardHref = `/dashboard/corporate?id=${user.id}`;
  } else if (user?.organizationType === 'Studio' && user?.id) {
    dashboardHref = `/dashboard/studio?id=${user.id}`;
  } else if (user?.organizationType === 'Government' && user?.id) {
    dashboardHref = `/dashboard/government?id=${user.id}`;
  } else if (user?.organizationType === 'Research Org' && user?.id) {
    dashboardHref = `/dashboard/research?id=${user.id}`;
  } else if (user?.organizationType === 'Investor' && user?.id) {
    dashboardHref = `/dashboard/investor?id=${user.id}`;
  }

  return [
    { href: dashboardHref, label: 'Dashboard' },
    { href: '/studios', label: 'Studios' },
    { href: '/corporates', label: 'Corporates' },
    { href: '/research-organizations', label: 'Research Organizations' },
    { href: '/governments', label: 'Governments' },
    { href: '/investors', label: 'Investors' },
    { href: '/challenges', label: 'Challenges' },
    { href: '/top-deals', label: 'Top Deals' },
    { href: '/learning', label: 'Learning' },
    { href: '/settings', label: 'Settings' },
  ];
};

interface LayoutProps {
  children: ReactNode;
  isAuthenticated?: boolean;
  user?: any;
  onLogout?: () => void;
  fullscreen?: boolean;
}

export default function Layout({ 
  children, 
  isAuthenticated = false, 
  user = null, 
  onLogout,
  fullscreen = false
}: LayoutProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    router.push('/');
  };

  // If not authenticated, show content without sidebar
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
        <main className="p-8">
          {children}
        </main>
      </div>
    );
  }

  // If authenticated, show full layout with sidebar
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 px-6 py-8 bg-white dark:bg-gray-800 shadow-md space-y-8">
        <div className="text-2xl font-bold tracking-tight text-center mb-8">🚀 Venturewaves</div>

        {/* User Info */}
        {user && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 p-4 rounded-lg border border-blue-100 dark:border-gray-600 mb-6">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-lg">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-gray-900 dark:text-white break-words leading-tight">
                  {user.name || 'User'}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                  {user.organizationType || 'Member'}
                </div>
              </div>
            </div>
          </div>
        )}

        <nav className="space-y-2">
          {getMenuItems(user).map((item) => {
            // Better active state detection for dashboard
            const isActive = 
              router.asPath === item.href || 
              (item.label === 'Dashboard' && router.pathname.startsWith('/dashboard')) ||
              (item.href !== '/dashboard' && router.asPath.startsWith(item.href));
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-4 py-2 rounded transition ${
                  isActive
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 rounded transition hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 mt-4"
          >
            🚪 Log Out
          </button>
        </nav>

        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="w-full mt-10 py-2 bg-gray-200 dark:bg-gray-700 text-sm rounded hover:opacity-90 transition"
        >
          {mounted ? (theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode') : '...'}
        </button>
      </aside>

      {/* Main content */}
      <main className={`flex-1 overflow-y-auto ${
        fullscreen 
          ? 'p-0 bg-transparent' 
          : 'p-8 bg-gray-50 dark:bg-gray-900'
      }`}>
        <div className={fullscreen ? 'pt-6' : ''}>
          {children}
        </div>
      </main>
    </div>
  );
}