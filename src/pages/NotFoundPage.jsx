import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

export default function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <>
      <Helmet>
        <title>404 - {t('notfound.title', 'Page non trouvée')} – PINTAPLANA MAROC</title>
        <meta name="description" content={t('notfound.desc', "Désolé, la page que vous recherchez n'existe pas ou a été déplacée.")} />
        <meta property="og:title" content={`404 - ${t('notfound.title', 'Page non trouvée')} – PINTAPLANA MAROC`} />
        <meta property="og:description" content={t('notfound.desc', "Désolé, la page que vous recherchez n'existe pas ou a été déplacée.")} />
      </Helmet>
      
      <main className="pt-32 pb-20 bg-dark min-h-screen text-white flex flex-col justify-center items-center relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-[#FFC107]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 text-center z-10 max-w-2xl flex flex-col items-center">
          {/* Animated Glowing Sign/Icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative mb-8"
          >
            {/* Pulsing ring */}
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              className="absolute inset-0 rounded-full bg-primary/20 blur-xl"
            />
            
            {/* Hexagon shape / Road Sign styling */}
            <div className="w-40 h-40 bg-[#1a1a1a] border-4 border-primary rounded-3xl flex items-center justify-center shadow-2xl relative">
              {/* Traffic symbol style slash line inside */}
              <div className="absolute w-full h-1 bg-primary/30 rotate-45 pointer-events-none" />
              <span className="text-5xl font-black font-display tracking-tight text-white select-none">
                404
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-3xl md:text-5xl font-extrabold mb-4 font-display tracking-tight"
          >
            {t('notfound.title', 'Page non trouvée')}
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-gray-400 text-lg mb-10 max-w-md leading-relaxed"
          >
            {t('notfound.desc', "Désolé, la page que vous recherchez n'existe pas ou a été déplacée.")}
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-[#4CAF50] text-white font-bold text-sm tracking-widest uppercase rounded-lg transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-primary/40 active:scale-95 group"
            >
              <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              {t('notfound.back_home', "Retour à l'accueil")}
            </Link>
          </motion.div>
        </div>
      </main>
    </>
  )
}
