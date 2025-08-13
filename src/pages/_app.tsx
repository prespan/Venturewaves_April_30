import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import Layout from '@/components/ui/Layout'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function MyApp({ Component, pageProps }: AppProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Check if current route is a dashboard that needs fullscreen layout
  const isFullscreenRoute = router.pathname.startsWith('/dashboard')

  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem('user')
        const authToken = localStorage.getItem('authToken')
        
        if (storedUser && authToken && !router.pathname.startsWith('/dashboard')) {
          setUser(JSON.parse(storedUser))
          setIsAuthenticated(true)
          setIsLoading(false)
        } else {
          // TEMPORARY: Auto-login for dashboard routes
          if (router.pathname.startsWith('/dashboard')) {
            // Extract organization info from URL or use defaults
            let tempUser = {
              id: 76,
              name: 'Siemens',
              organizationType: 'Corporate'
            }
            
            // Extract ID from URL to determine specific organization
            const urlParams = new URLSearchParams(window.location.search);
            const urlId = urlParams.get('id');
            
            // Detect organization type and set appropriate user data
            if (router.pathname.includes('/corporate')) {
              tempUser = {
                id: parseInt(urlId || '76'),
                name: 'Siemens',
                organizationType: 'Corporate'
              }
            } else if (router.pathname.includes('/government')) {
              tempUser = {
                id: parseInt(urlId || '41'),
                name: 'Innovate UK',
                organizationType: 'Government'
              }
            } else if (router.pathname.includes('/studio')) {
              tempUser = {
                id: parseInt(urlId || '20'),
                name: 'Antler',
                organizationType: 'Studio'
              }
            } else if (router.pathname.includes('/research')) {
              // Simple mapping for research organizations
              const researchId = parseInt(urlId || '30');
              
              tempUser = {
                id: researchId,
                name: 'Fraunhofer Institute',
                organizationType: 'Research Org'
              }
            } else if (router.pathname.includes('/investor')) {
              // Dynamic name based on ID
              const investorId = parseInt(urlId || '40');
              let investorName = 'Sequoia Capital';
              
              if (investorId === 16 || investorId === 20) {
                investorName = 'Temasek';
              } else if (investorId === 40) {
                investorName = 'Sequoia Capital';
              }
              
              tempUser = {
                id: investorId,
                name: investorName,
                organizationType: 'Investor'
              }
            }
            
            console.log('Setting user:', tempUser);
            setUser(tempUser)
            setIsAuthenticated(true)
            localStorage.setItem('user', JSON.stringify(tempUser))
            localStorage.setItem('authToken', 'authenticated')
            setIsLoading(false)
          } else {
            setIsLoading(false)
          }
        }
      } catch (error) {
        console.error('Error checking authentication:', error)
        localStorage.removeItem('user')
        localStorage.removeItem('authToken')
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router.pathname, router.asPath])

  const handleLogin = (userData: any) => {
    setUser(userData)
    setIsAuthenticated(true)
    
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('authToken', 'authenticated')
    
    if (userData.organizationType === 'Corporate' && userData.id) {
      router.push(`/dashboard/corporate?id=${userData.id}`)
    } else if (userData.organizationType === 'Studio' && userData.id) {
      router.push(`/dashboard/studio?id=${userData.id}`)
    } else {
      router.push('/dashboard')
    }
  }

  const handleLogout = () => {
    setUser(null)
    setIsAuthenticated(false)
    
    localStorage.removeItem('user')
    localStorage.removeItem('authToken')
    
    router.push('/')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="text-2xl font-bold mb-2">🚀 Venturewaves</div>
          <div className="text-gray-600">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Layout 
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={handleLogout}
        fullscreen={isFullscreenRoute}
      >
        <Component 
          {...pageProps} 
          isAuthenticated={isAuthenticated}
          user={user}
          onLogin={handleLogin}
          onLogout={handleLogout}
        />
      </Layout>
    </ThemeProvider>
  )
}