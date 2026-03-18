import { useState, useEffect } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'sonner'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Loader from './components/Loader'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Scroll to top on load/reload
    window.history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
  }, [])

  return (
    <HelmetProvider>
      <AnimatePresence mode="wait">
        {isLoading && (
          <Loader key="loader" onLoadingComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <div className={`min-h-screen flex flex-col ${isLoading ? 'h-screen overflow-hidden' : ''}`}>
        <Navbar />
        <div className="flex-1">
          <Home />
        </div>
        <Footer />
      </div>

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#1a1a1a',
            color: '#fff',
            border: '1px solid #2E7D32',
          },
        }}
        richColors
      />
    </HelmetProvider>
  )
}
