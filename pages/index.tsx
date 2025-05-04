import { useRouter } from 'next/router'
import { useState } from 'react'

const logos = [
  'catapult.png',
  'innovateuk.png',
  'amrc.png',
  'cpi.png',
  'temasek.png',
  'bcgdv.png',
  'fraunhofer.png',
  'antler.png',
  'byld.png',
  'coplex.png',
  'boomerang.png',
]

export default function Home() {
  const router = useRouter()
  const [role, setRole] = useState('')

  const handleStart = () => {
    if (role) {
      router.push(`/register/${role}`)
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-6 py-16">
      <div className="max-w-4xl mx-auto text-center space-y-10">
        <header>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Where Corporates, Governments & Studios Co-Build the Future of Innovation
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-4">
            The platform where real problems meet scalable ventures.
          </p>
        </header>
    <div className="min-h-screen flex flex-col justify-between px-4 py-16 sm:px-8 md:px-16 lg:px-32 bg-white text-gray-900">
      <header className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          Where Corporates, Governments & Studios Co-Build the Future of Innovation
        </h1>
        <p className="text-lg text-gray-600">
          The platform where real problems meet scalable ventures.
        </p>
      </header>

      <main className="mt-12 max-w-xl mx-auto w-full">
        <div className="space-y-4">
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
            Select Organization Type
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full rounded border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Choose a role...</option>
            <option value="studio">Studio</option>
            <option value="corporate">Corporate</option>
            <option value="government">Government</option>
            <option value="research">Research Organization</option>
            <option value="investor">Investor</option>
          </select>

          <button
            onClick={handleStart}
            disabled={!role}
            className="w-full rounded bg-blue-600 text-white px-4 py-2 font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            Get Started →
          </button>
        </div>
      </main>

      <section className="mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center justify-center">
        {logos.map((logo, index) => (
          <img
            key={index}
            src={`/logos/${logo}`}
            alt={logo.split('.')[0]}
            className="h-12 w-auto mx-auto object-contain grayscale hover:grayscale-0 transition"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none'
            }}
          />
        ))}
      </section>

      <footer className="text-center text-sm text-gray-400 mt-12">
        © {new Date().getFullYear()} VentureWaves. All rights reserved.
      </footer>
    </div>
  )
}
