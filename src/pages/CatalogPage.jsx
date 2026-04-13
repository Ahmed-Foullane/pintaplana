import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { BookOpen, Newspaper } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { catalogDocuments, catalogPdfHref } from '../data/catalogDocuments'
import { fadeUp, staggerContainer } from '../utils/animations'

const icons = { catalog: BookOpen, flyer: Newspaper }

export default function CatalogPage() {
  const { t } = useTranslation()

  return (
    <>
      <Helmet>
        <title>{t('catalog.meta_title')} – PINTAPLANA MAROC</title>
        <meta name="description" content={t('catalog.meta_desc')} />
        <meta property="og:title" content={`${t('catalog.meta_title')} – PINTAPLANA MAROC`} />
        <meta property="og:description" content={t('catalog.meta_desc')} />
      </Helmet>
      <main className="pt-16 md:pt-20 min-h-[60vh] bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <motion.div
            variants={staggerContainer(0.12)}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <motion.h1
              variants={fadeUp}
              className="text-2xl sm:text-3xl md:text-4xl font-black text-[#111111] tracking-tight leading-tight uppercase"
            >
              {t('catalog.page_title')}
            </motion.h1>
            <motion.div variants={fadeUp} className="mt-8 h-px w-full max-w-md mx-auto bg-gray-200" />
          </motion.div>

          <motion.div
            variants={staggerContainer(0.1, 0.15)}
            initial="hidden"
            animate="visible"
            className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10"
          >
            {catalogDocuments.map(({ id, file }) => {
              const Icon = icons[id] ?? BookOpen
              const href = catalogPdfHref(file)
              return (
                <motion.a
                  key={id}
                  variants={fadeUp}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-5 rounded-sm border border-gray-200 bg-gray-50/50 p-6 sm:p-8 text-left transition-all duration-300 hover:border-[#2E7D32]/35 hover:bg-white hover:shadow-lg hover:shadow-gray-200/80"
                >
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-sm bg-[#2E7D32] text-white shadow-md shadow-green-900/20 transition-transform duration-300 group-hover:scale-105">
                    <Icon size={28} strokeWidth={1.75} aria-hidden />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-xs font-semibold uppercase tracking-widest text-[#2E7D32] mb-1">
                      {t('catalog.badge_pdf')}
                    </span>
                    <span className="block font-black text-[#111111] text-sm sm:text-base tracking-wide uppercase leading-snug">
                      {t(`catalog.cards.${id}.label`)}
                    </span>
                    <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-gray-500 group-hover:text-[#2E7D32] transition-colors">
                      {t('catalog.open')}
                    </span>
                  </div>
                </motion.a>
              )
            })}
          </motion.div>
        </div>
      </main>
    </>
  )
}
