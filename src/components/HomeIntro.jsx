import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, MapPinned, Route, ShieldCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { fadeUp, staggerContainer } from '../utils/animations'

const features = [
  { key: 'scope', icon: Route },
  { key: 'quality', icon: ShieldCheck },
  { key: 'presence', icon: MapPinned },
]

export default function HomeIntro() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <section id="suite-accueil" className="relative py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="text-center max-w-3xl mx-auto mb-16 lg:mb-20"
        >
          <motion.span variants={fadeUp} className="block text-[#2E7D32] font-semibold text-sm tracking-widest uppercase">
            {t('home.intro_eyebrow')}
          </motion.span>
          <motion.h2 variants={fadeUp} className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-[#111111] leading-tight">
            {t('home.intro_title')}
          </motion.h2>
          <motion.div variants={fadeUp} className="mt-4 w-16 h-1 bg-[#FFC107] mx-auto rounded-full" />
          <motion.p variants={fadeUp} className="mt-6 text-gray-600 text-sm sm:text-base leading-relaxed">
            {t('home.intro_lead')}
          </motion.p>
        </motion.div>

        <motion.ul
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16 lg:mb-20"
          variants={staggerContainer(0.1, 0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {features.map(({ key, icon: Icon }) => (
            <motion.li
              key={key}
              variants={fadeUp}
              className="group rounded-sm border border-gray-100 bg-gray-50/80 p-8 text-left transition-shadow duration-300 hover:shadow-lg hover:shadow-gray-200/80 hover:border-[#2E7D32]/20"
            >
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-sm bg-[#2E7D32] text-white shadow-md shadow-green-900/25">
                <Icon size={22} strokeWidth={2} aria-hidden />
              </div>
              <h3 className="text-lg font-bold text-[#111111] tracking-tight">
                {t(`home.features.${key}.title`)}
              </h3>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                {t(`home.features.${key}.desc`)}
              </p>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-3 sm:gap-4"
        >
          <button
            type="button"
            onClick={() => navigate('/about')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-[#111111]/15 bg-white text-[#111111] font-semibold text-sm tracking-wide rounded-sm transition-all duration-200 hover:border-[#2E7D32]/40 hover:bg-[#2E7D32]/5 cursor-pointer"
          >
            {t('home.link_about')}
            <ArrowRight size={16} className="opacity-70" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => navigate('/products')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#2E7D32] hover:bg-[#4CAF50] text-white font-bold text-sm tracking-wide rounded-sm transition-all duration-200 hover:shadow-lg hover:shadow-green-900/25 cursor-pointer"
          >
            {t('home.link_products')}
            <ArrowRight size={16} aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => navigate('/contact')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-[#FFC107]/60 text-[#111111] font-semibold text-sm tracking-wide rounded-sm transition-all duration-200 hover:bg-[#FFC107]/10 cursor-pointer"
          >
            {t('home.link_contact')}
            <ArrowRight size={16} className="text-[#2E7D32]" aria-hidden />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
