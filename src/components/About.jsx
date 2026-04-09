import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, ChevronUp, ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { fadeUp, fadeRight, staggerContainer } from '../utils/animations'

export default function About() {
  const { t } = useTranslation()
  const [currentIndex, setCurrentIndex] = useState(0)

  const quotes = t('about.quotes', { returnObjects: true }) || []
  const values = [t('about.values.respect'), t('about.values.responsibility'), t('about.values.performance')]

  const nextQuote = () => {
    setCurrentIndex((prev) => (prev === quotes.length - 1 ? 0 : prev + 1))
  }

  const prevQuote = () => {
    setCurrentIndex((prev) => (prev === 0 ? quotes.length - 1 : prev - 1))
  }

  return (
    <section id="about" className="py-24 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <motion.div
          variants={staggerContainer(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="text-center mb-16"
        >
          <motion.span variants={fadeUp} className="text-[#2E7D32] font-semibold text-sm tracking-widest uppercase block">
            {t('about.subtitle')}
          </motion.span>
          <motion.h2 variants={fadeUp} className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-black text-[#111111] leading-tight">
            {t('about.title')}
          </motion.h2>
          <motion.div variants={fadeUp} className="mt-4 w-16 h-1 bg-[#FFC107] mx-auto rounded-full" />
        </motion.div>

        {/* ── Two Column Layout ── */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: Text — each paragraph fades up in sequence */}
          <motion.div
            className="space-y-6"
            variants={staggerContainer(0.12, 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
          >
            {[
              t('about.p1'),
              null, // bold paragraph handled separately
              t('about.p3'),
              t('about.p4'),
              t('about.p5'),
            ].map((text, i) =>
              text === null ? (
                <motion.p key={i} variants={fadeUp} className="text-gray-600 leading-relaxed text-base">
                  <strong className="text-[#111111]">PINTAPLANA MAROC</strong> {t('about.p2')}
                </motion.p>
              ) : (
                <motion.p key={i} variants={fadeUp} className="text-gray-600 leading-relaxed text-base">
                  {text}
                </motion.p>
              )
            )}

            {/* Values — staggered badges */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 pt-2">
              {values.map((value) => (
                <div key={value} className="flex items-center gap-2 px-4 py-2 bg-[#2E7D32]/10 border border-[#2E7D32]/20 rounded-sm">
                  <CheckCircle2 size={14} className="text-[#2E7D32] shrink-0" />
                  <span className="text-[#2E7D32] font-bold text-xs tracking-wider">{value}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            className="flex flex-col h-full justify-center lg:pl-8"
          >
            <h3 className="text-[2.5rem] sm:text-5xl font-light text-[#111111] mb-8 tracking-tight font-sans">
              {t('about.edito_title')}
            </h3>
            
            <div className="relative mb-8 pt-2">
              <div className="bg-[#f4f4f4] px-8 py-10 sm:px-10 sm:py-12 relative z-10 min-h-[220px] flex items-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentIndex}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="text-gray-600 italic text-[17px] sm:text-[19px] leading-[1.8] whitespace-pre-line font-medium"
                  >
                    “{quotes[currentIndex]}”
                  </motion.p>
                </AnimatePresence>
              </div>
              {/* Speech bubble pointer */}
              <div className="absolute -bottom-3 left-10 w-10 h-10 bg-[#f4f4f4] rotate-45" />
            </div>

            <div className="flex items-center justify-end pl-2 pt-2">
              <div className="flex gap-[2px]">
                <button
                  type="button"
                  onClick={prevQuote}
                  className="w-12 h-12 bg-[#6eb31a] hover:bg-[#5a9c14] text-white flex items-center justify-center transition-colors focus:outline-none"
                >
                  <ChevronUp size={28} strokeWidth={2.5} />
                </button>
                <button
                  type="button"
                  onClick={nextQuote}
                  className="w-12 h-12 bg-[#6eb31a] hover:bg-[#5a9c14] text-white flex items-center justify-center transition-colors focus:outline-none"
                >
                  <ChevronDown size={28} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
