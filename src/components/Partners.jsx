import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import { useTranslation } from 'react-i18next'
import { fadeUp, staggerContainer } from '../utils/animations'

const partners = Array(6).fill({ name: 'Tanger Med', logo: '/partners/tangermed.png' })

export default function Partners() {
  const { t } = useTranslation()
  return (
    <section id="references" className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <motion.div
          variants={staggerContainer(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.4 }}
          className="text-center mb-12"
        >
          <motion.span variants={fadeUp} className="block text-[#2E7D32] font-semibold text-sm tracking-widest uppercase">
            {t('partners.subtitle')}
          </motion.span>
          <motion.h2 variants={fadeUp} className="mt-2 text-3xl sm:text-4xl font-black text-[#111111]">
            {t('partners.title')}
          </motion.h2>
          <motion.div variants={fadeUp} className="mt-4 w-16 h-1 bg-[#FFC107] mx-auto rounded-full" />
        </motion.div>

        {/* ── Carousel — fades in as a whole ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <Swiper
            modules={[Autoplay]}
            spaceBetween={40}
            slidesPerView={2}
            loop={true}
            autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true }}
            speed={3000}
            className="swiper-partners"
            breakpoints={{
              480:  { slidesPerView: 3 },
              768:  { slidesPerView: 4 },
              1024: { slidesPerView: 5 },
            }}
          >
            {partners.map((partner, i) => (
              <SwiperSlide key={i}>
                <div className="flex items-center justify-center py-6 px-4">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="partner-logo h-14 sm:h-16 w-auto object-contain cursor-pointer"
                    title={partner.name}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  )
}
