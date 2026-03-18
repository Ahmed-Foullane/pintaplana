import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

// navLinks moved inside component

function scrollToSection(href) {
  const id = href.replace('#', '')
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('accueil')

  const navLinks = [
    { label: t('navbar.accueil'), href: '#accueil' },
    { label: t('navbar.produits'), href: '#produits' },
    { label: t('navbar.references'), href: '#references' },
    { label: t('navbar.contact'), href: '#contact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      // Determine active section
      const sections = ['accueil', 'produits', 'references', 'contact']
      let current = 'accueil'
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 100) current = id
        }
      }
      setActiveSection(current)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleNavClick = (href) => {
    setMobileOpen(false)
    scrollToSection(href)
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0d0d0d]/95 backdrop-blur-md shadow-lg shadow-black/20'
            : 'bg-[#0d0d0d]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <button
              onClick={() => scrollToSection('#accueil')}
              className="flex items-center gap-2 group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-sm bg-[#2E7D32] flex items-center justify-center">
                <span className="text-white font-black text-sm">P</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-white font-bold text-sm tracking-wider">PINTAPLANA</span>
                <span className="text-[#FFC107] font-bold text-xs tracking-widest">MAROC</span>
              </div>
            </button>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const sectionId = link.href.replace('#', '')
                const isActive = activeSection === sectionId
                return (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.href)}
                    className={`relative px-4 py-2 text-xs font-semibold tracking-widest transition-colors duration-200 group cursor-pointer
                      ${isActive ? 'text-[#FFC107]' : 'text-gray-300 hover:text-white'}`}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-0 left-4 right-4 h-0.5 rounded-full transition-all duration-300
                        ${isActive ? 'bg-[#FFC107] scale-x-100' : 'bg-[#2E7D32] scale-x-0 group-hover:scale-x-100'}`}
                    />
                  </button>
                )
              })}
              <button
                onClick={() => handleNavClick('#contact')}
                className="ml-4 px-5 py-2 bg-[#2E7D32] hover:bg-[#4CAF50] text-white text-xs font-bold tracking-wider rounded-sm transition-all duration-200 hover:shadow-lg hover:shadow-green-900/30 active:scale-95 cursor-pointer uppercase"
              >
                {t('navbar.quote')}
              </button>

              <div className="flex items-center gap-3 ml-6 border-l border-white/10 pl-6 cursor-pointer">
                {['fr', 'en', 'es'].map(lang => (
                  <button
                    key={lang}
                    onClick={() => i18n.changeLanguage(lang)}
                    className={`text-xs font-bold uppercase transition-colors ${i18n.language === lang ? 'text-[#FFC107]' : 'text-gray-400 hover:text-white'}`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#0d0d0d] flex flex-col pt-20 px-6"
          >
            <div className="flex flex-col gap-2 mt-6">
              {navLinks.map((link, i) => {
                const sectionId = link.href.replace('#', '')
                return (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 + 0.1 }}
                  >
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className={`w-full flex items-center justify-between py-4 border-b border-white/5 text-base font-bold tracking-widest cursor-pointer
                        ${activeSection === sectionId ? 'text-[#FFC107]' : 'text-gray-200 hover:text-[#FFC107]'}
                        transition-colors duration-200`}
                    >
                      {link.label}
                      <ChevronRight size={16} className="text-[#2E7D32]" />
                    </button>
                  </motion.div>
                )
              })}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-6 flex flex-col gap-4"
              >
                <div className="flex items-center justify-center gap-6 py-2 border-b border-white/5 pb-6">
                  {['fr', 'en', 'es'].map(lang => (
                    <button
                      key={lang}
                      onClick={() => i18n.changeLanguage(lang)}
                      className={`text-sm font-bold uppercase transition-colors cursor-pointer ${i18n.language === lang ? 'text-[#FFC107]' : 'text-gray-400 hover:text-white'}`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => handleNavClick('#contact')}
                  className="block w-full text-center py-3 bg-[#2E7D32] text-white font-bold tracking-wider rounded-sm cursor-pointer uppercase"
                >
                  {t('navbar.quote')}
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
