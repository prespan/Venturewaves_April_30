import { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';

const menu = [
  { href: '/', label: 'Dashboard' },
  { href: '/studios', label: 'Studios' },
  { href: '/corporates', label: 'Corporates' },
  { href: '/research-orgs', label: 'Research Organizations' },
  { href: '/governments', label: 'Governments' },
  { href: '/investors', label: 'Investors' },
  { href: '/challenges', label: 'Challenges' },
  { href: '/top-deals', label: 'Top Deals' },
  { href: '/learning', label: 'Learning' },
  { href: '/settings', label: 'Settings' },
];

export default function Layout({ children }: { children: ReactNode }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 px-6 py-8 bg-white dark:bg-gray-800 shadow-md space-y-8">
        <div className="text-2xl font-bold tracking-tight text-center mb-8">🚀 Venturewaves</div>

        <nav className="space-y-2">
          {menu.map((item) => {
            const isActive = router.asPath.startsWith(item.href);
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
        </nav>

        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="w-full mt-10 py-2 bg-gray-200 dark:bg-gray-700 text-sm rounded hover:opacity-90 transition"
        >
          {mounted ? (theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode') : '...'}
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto bg-gray-50 dark:bg-gray-900">
        {children}
      </main>
    </div>
  );
}
