import { ReactNode, useEffect, useState } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'

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
]

export default function Layout({ children }: { children: ReactNode }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <aside className="w-60 p-4 bg-white dark:bg-gray-800 flex-shrink-0">
        <h2 className="text-xl font-bold mb-6">My App</h2>
        <nav className="space-y-2">
          {menu.map((item) => (
            <Link key={item.href} href={item.href}>
              <a className="block px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
                {item.label}
              </a>
            </Link>
          ))}
        </nav>
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="mt-6 px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded"
        >
          {mounted ? (theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode') : '…'}
        </button>
      </aside>
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  )
}