import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { fadeUp, scaleIn, staggerContainer } from '../utils/animations'

const productImages = [
  { src: '/product/WhatsApp Image 2026-03-08 at 7.41.14 PM-min.jpeg',      alt: 'Panneau de signalisation PINTAPLANA MAROC' },
  { src: '/product/WhatsApp Image 2026-03-08 at 7.48.12 PM (1)-min.jpeg', alt: 'Panneau routier standard' },
  { src: '/product/WhatsApp Image 2026-03-08 at 7.48.12 PM-min.jpeg',     alt: 'Signalisation verticale' },
  { src: '/product/WhatsApp Image 2026-03-08 at 7.48.24 PM-min.jpeg',     alt: 'Panneau sur mesure' },
  { src: '/product/WhatsApp Image 2026-03-08 at 7.48.25 PM-min.jpeg',     alt: 'Accessoires de signalisation' },
  { src: '/product/WhatsApp Image 2026-03-08 at 7.48.42 PM-min.jpeg',     alt: 'Panneaux routiers PINTAPLANA' },
]

export default function Products() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [lightbox, setLightbox] = useState(null)

  return (
    <>
      <section id="produits" className="py-24 lg:py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Header ── */}
          <motion.div
            variants={staggerContainer(0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.4 }}
            className="text-center mb-16"
          >
            <motion.span variants={fadeUp} className="block text-[#2E7D32] font-semibold text-sm tracking-widest uppercase">
              {t('products.subtitle')}
            </motion.span>
            <motion.h2 variants={fadeUp} className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-black text-[#111111]">
              {t('products.title')}
            </motion.h2>
            <motion.div variants={fadeUp} className="mt-4 w-16 h-1 bg-[#FFC107] mx-auto rounded-full" />
            <motion.p variants={fadeUp} className="mt-4 text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
              {t('products.desc')}
            </motion.p>
          </motion.div>

          {/* ── Image Grid — each card scales + fades in staggered ── */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            variants={staggerContainer(0.1, 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
          >
            {productImages.map((img, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                className="group relative overflow-hidden rounded-sm bg-gray-100 cursor-pointer"
                onClick={() => setLightbox(img)}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/10 backdrop-blur-sm p-3 rounded-full border border-white/30">
                    <ZoomIn size={20} className="text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* ── CTA ── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.5 }}
            className="text-center mt-12"
          >
            <button
              type="button"
              onClick={() => navigate('/contact')}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#2E7D32] hover:bg-[#4CAF50] text-white font-bold text-sm tracking-wider rounded-sm transition-all duration-200 hover:shadow-xl hover:shadow-green-900/20 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              {t('products.quote_btn')}
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-4 right-4 p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              onClick={() => setLightbox(null)}
            >
              <X size={22} />
            </button>
            <motion.img
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.25 }}
              src={lightbox.src}
              alt={lightbox.alt}
              className="max-w-full max-h-[90vh] object-contain rounded-sm shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
