'use client'

import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

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

function Home() {
  const router = useRouter()
  const [role, setRole] = useState('')
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleStart = async () => {
    if (!role) return
    setLoading(true)

    try {
      const res = await fetch(`/api/register/${role}`)
      const org = await res.json()

      console.log('Fetched data from API:', org)

      if (!res.ok || !org || !org.name) {
        alert(`No ${role} organization found or invalid data`)
        return
      }

      router.push(`/register/${role}?name=${encodeURIComponent(org.name)}`)
    } catch (err) {
      console.error('Fetch failed:', err)
      alert('Failed to fetch organization')
    } finally {
      setLoading(false)
    }
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-white">
      {/* Subtle background pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundSize: '32px 32px',
          backgroundImage: `
            radial-gradient(circle at 1px 1px, #94a3b8 1px, transparent 0)
          `
        }}
      />
      
      {/* Header */}
      <header className="relative z-10 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-2xl font-bold text-gray-900">
            VentureWaves
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 px-6 py-16">
        <div className="max-w-6xl mx-auto">
          
          {/* Hero section */}
          <div className="text-center max-w-4xl mx-auto mb-20">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-sm text-blue-700 mb-8">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
              Trusted by 500+ organizations worldwide
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 leading-tight mb-8">
              Let&apos;s{' '}
              <span className="text-blue-600">Co-Build</span>
              <br />
              the Future
            </h1>
            
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-12">
              Where corporations, governments, and studios collaborate to solve 
              real-world problems and scale breakthrough ventures.
            </p>

            {/* CTA Section */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-8">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="appearance-none bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all duration-200 px-6 py-4 pr-12 rounded-xl text-gray-900 text-lg font-medium shadow-sm focus:outline-none min-w-64"
              >
                <option value="">Select your organization type</option>
                <option value="studio">Studio</option>
                <option value="corporate">Corporate</option>
                <option value="government">Government</option>
                <option value="research">Research Institution</option>
                <option value="investor">Investor</option>
              </select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              <button
                onClick={handleStart}
                disabled={!role || loading}
                className="bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-50 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 disabled:transform-none min-w-48"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2" />
                    Loading...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    Get Started
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                )}
              </button>
            </div>
            
          </div>

          {/* Partners section */}
          <div className="text-center mb-20">
            <h3 className="text-lg font-semibold text-gray-700 mb-12">
              Trusted by Industry Leaders
            </h3>
            <div className="relative overflow-hidden">
              {/* Gradient overlays for smooth edges */}
              <div 
                className="absolute left-0 top-0 bottom-0 w-20 z-10"
                style={{
                  backgroundImage: 'linear-gradient(to right, white, transparent)'
                }}
              />
              <div 
                className="absolute right-0 top-0 bottom-0 w-20 z-10"
                style={{
                  backgroundImage: 'linear-gradient(to left, white, transparent)'
                }}
              />
              
              <div className="flex">
                <div 
                  className="flex items-center"
                  style={{
                    animation: 'logoScroll 25s linear infinite'
                  }}
                >
                  {[...logos, ...logos, ...logos].map((logo, index) => (
                    <div key={index} className="flex-none mx-12 group">
                      <div className="flex items-center justify-center h-20 w-44">
                        <img
                          src={`/logos/${logo}`}
                          alt="Partner Logo"
                          className="max-h-full max-w-full object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-100 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center text-gray-500">
            <p>&copy; 2024 VentureWaves. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Global styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes logoScroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.333%); }
          }
        `
      }} />
    </div>
  )
}

export default Home