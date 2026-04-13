import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

// Local hero image from /public
const HERO_BG = '/hero.png'

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  return (
    <section id="accueil" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${HERO_BG})` }}
      >
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/85" />
        {/* Green accent line at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2E7D32] via-[#FFC107] to-[#2E7D32]" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
     
          

          {/* Company Name */}
          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-none mb-6"
          >
            PINTAPLANA
            <span className="block text-[#FFC107]">MAROC</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-10 font-light"
          >
            {t('hero.tagline_part1')}
            <span className="text-[#FFC107] font-semibold">{t('hero.tagline_part2')}</span>
            {t('hero.tagline_part3')}
            <span className="text-[#4CAF50] font-semibold">{t('hero.tagline_part4')}</span>
            {t('hero.tagline_part5')}
            <span className="text-[#FFC107] font-semibold">{t('hero.tagline_part6')}</span>
            {t('hero.tagline_part7')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              type="button"
              onClick={() => navigate('/products')}
              className="group flex items-center gap-3 px-8 py-4 bg-[#2E7D32] hover:bg-[#4CAF50] text-white font-bold text-sm tracking-wider rounded-sm transition-all duration-300 hover:shadow-xl hover:shadow-green-900/40 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              {t('hero.discover')}
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
            <button
              type="button"
              onClick={() => navigate('/contact')}
              className="flex items-center gap-3 px-8 py-4 border border-white/20 hover:border-[#FFC107]/50 text-white hover:text-[#FFC107] font-semibold text-sm tracking-wider rounded-sm transition-all duration-300 hover:bg-white/5 cursor-pointer"
            >
              {t('hero.contact_us')}
            </button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={fadeUp}
            className="mt-16 flex justify-center max-w-lg mx-auto"
          >
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-black text-[#FFC107]">100%</div>
              <div className="text-[10px] sm:text-xs text-gray-400 mt-1 leading-tight">{t('hero.satisfaction')}</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => navigate('/about')}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate('/about') } }}
        role="button"
        tabIndex={0}
      >
        <span className="text-gray-500 text-[10px] tracking-widest uppercase">{t('hero.scroll')}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-0.5 h-8 bg-gradient-to-b from-[#2E7D32] to-transparent rounded-full"
        />
      </motion.div>
    </section>
  )
}
