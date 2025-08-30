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
  
  // Define public routes where sidebar should never show
  const publicRoutes = ['/', '/login', '/register', '/about', '/contact']
  const isPublicRoute = publicRoutes.includes(router.pathname)

  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem('user')
        const authToken = localStorage.getItem('authToken')
        
        // Only authenticate if NOT on a public route
        if (storedUser && authToken && !isPublicRoute) {
          const userData = JSON.parse(storedUser)
          setUser(userData)
          setIsAuthenticated(true)
          setIsLoading(false)
        } else if (router.pathname.startsWith('/dashboard')) {
          // TEMPORARY: Auto-login for dashboard routes
          
          // Extract ID from URL to determine specific organization
          const urlParams = new URLSearchParams(window.location.search);
          const urlId = urlParams.get('id');
          
          // Initialize default user
          let tempUser = {
            id: 1,
            name: 'Default User',
            organizationType: 'Corporate'
          }
          
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
              id: parseInt(urlId || '2'),
              name: 'Antler',
              organizationType: 'Studio'
            }
          } else if (router.pathname.includes('/research')) {
            // FIXED: Proper research organization detection
            const researchId = parseInt(urlId || '6');
            let researchName = 'MIT Research Lab';
            
            // Map specific research organization IDs to names
            if (researchId === 6) {
              researchName = 'MIT Research Lab';
            } else if (researchId === 30) {
              researchName = 'Fraunhofer Institute';
            } else if (researchId === 7) {
              researchName = 'Stanford Research Institute';
            } else {
              researchName = 'Research Organization';
            }
            
            tempUser = {
              id: researchId,
              name: researchName,
              organizationType: 'Research Org'
            }
          } else if (router.pathname.includes('/investor')) {
            const investorId = parseInt(urlId || '40');
            // FIXED: Always use Temasek for investor dashboard
            tempUser = {
              id: investorId,
              name: 'Temasek', // Changed to always use Temasek
              organizationType: 'Investor'
            }
          }
          
          console.log('Setting user for dashboard:', tempUser, 'Route:', router.pathname, 'ID:', urlId);
          setUser(tempUser)
          setIsAuthenticated(true)
          localStorage.setItem('user', JSON.stringify(tempUser))
          localStorage.setItem('authToken', 'authenticated')
          setIsLoading(false)
        } else {
          // On public routes, clear authentication
          if (isPublicRoute) {
            setUser(null)
            setIsAuthenticated(false)
          }
          setIsLoading(false)
        }
      } catch (error) {
        console.error('Error checking authentication:', error)
        localStorage.removeItem('user')
        localStorage.removeItem('authToken')
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router.pathname, router.asPath, isPublicRoute])

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
        isAuthenticated={isAuthenticated && !isPublicRoute}
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