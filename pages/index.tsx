import { useState } from 'react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { ChevronDown, ArrowRight } from 'lucide-react'

const logos = [
  '/logos/antler.png',
  '/logos/bcg.png',
  '/logos/temasek.png',
  '/logos/fraunhofer.png',
  '/logos/amrc.png',
  '/logos/catapult.png',
  '/logos/cpi.png',
  '/logos/byld.png',
  '/logos/boomerang.png',
  '/logos/coplex.png'
]

const roles = [
  { label: 'Corporate', value: 'corporate' },
  { label: 'Government', value: 'government' },
  { label: 'Studio', value: 'studio' },
  { label: 'Investor', value: 'investor' },
  { label: 'Research Organization', value: 'research' }
]

export default function Home() {
  const [role, setRole] = useState('')
  const router = useRouter()

  const handleRegister = () => {
    if (role) router.push(`/register/${role}`)
  }

  return (
    <main className="min-h-screen bg-white px-6 py-16 text-center">
      <motion.h1
        className="text-3xl md:text-5xl font-semibold mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Where Corporates, Governments & Studios Co-Build the Future of Innovation
      </motion.h1>

      <motion.p
        className="text-lg md:text-xl text-gray-600 mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        The platform where real problems meet scalable ventures.
      </motion.p>

      <motion.div
        className="max-w-md mx-auto mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <label className="text-gray-700 font-medium text-sm mb-2 block">Select Organization Type</label>
        <div className="relative">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full appearance-none border px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Choose a role...</option>
            {roles.map((r) => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
          <ChevronDown className="absolute top-2.5 right-3 w-4 h-4 text-gray-500 pointer-events-none" />
        </div>
        <button
          onClick={handleRegister}
          disabled={!role}
          className="mt-4 w-full bg-orange-600 text-white font-medium py-2 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
        >
          Get Started <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        {logos.map((src, i) => (
          <img key={i} src={src} alt="Logo" className="h-12 mx-auto grayscale hover:grayscale-0 transition" />
        ))}
      </motion.div>
    </main>
  )
}