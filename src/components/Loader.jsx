import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const imagesToPreload = [
  '/hero.png',
  '/product/WhatsApp Image 2026-03-08 at 7.41.14 PM-min.jpeg',
  '/product/WhatsApp Image 2026-03-08 at 7.48.12 PM (1)-min.jpeg',
  '/product/WhatsApp Image 2026-03-08 at 7.48.12 PM-min.jpeg',
  '/product/WhatsApp Image 2026-03-08 at 7.48.24 PM-min.jpeg',
  '/product/WhatsApp Image 2026-03-08 at 7.48.25 PM-min.jpeg',
  '/product/WhatsApp Image 2026-03-08 at 7.48.42 PM-min.jpeg',
  '/partners/tangermed.png'
]

export default function Loader({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let loadedCount = 0
    const totalImages = imagesToPreload.length

    if (totalImages === 0) {
      setProgress(100)
      setTimeout(() => onLoadingComplete(), 500)
      return
    }

    const handleImageLoad = () => {
      loadedCount++
      const newProgress = Math.round((loadedCount / totalImages) * 100)
      setProgress(newProgress)
      
      if (loadedCount === totalImages) {
        setTimeout(() => onLoadingComplete(), 600) // slight delay to show 100%
      }
    }

    const handleImageError = () => {
      // Treat errors as loaded so we don't block the site forever
      handleImageLoad()
    }

    imagesToPreload.forEach((src) => {
      const img = new Image()
      img.src = src
      img.onload = handleImageLoad
      img.onerror = handleImageError
    })

    // Fallback: If network is slow, bypass loader after 7 seconds max
    const fallbackTimeout = setTimeout(() => {
      if (loadedCount < totalImages) {
        setProgress(100)
        setTimeout(() => onLoadingComplete(), 400)
      }
    }, 7000)

    return () => clearTimeout(fallbackTimeout)
  }, [onLoadingComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-[#111111] flex flex-col items-center justify-center pointer-events-none"
      exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
    >
      <motion.div 
        className="flex flex-col items-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-16 h-16 rounded-sm bg-[#2E7D32] flex items-center justify-center shadow-lg shadow-green-900/40 mb-4">
          <span className="text-white font-black text-3xl">P</span>
        </div>
        <div className="text-center">
          <div className="text-white font-bold text-xl tracking-widest">PINTAPLANA</div>
          <div className="text-[#FFC107] font-bold text-sm tracking-[0.3em] uppercase">MAROC</div>
        </div>
      </motion.div>

      {/* Progress Bar Container */}
      <div className="w-64 sm:w-80 h-1.5 bg-white/10 rounded-full overflow-hidden relative">
        <motion.div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#2E7D32] via-[#FFC107] to-[#4CAF50]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: 'easeOut', duration: 0.3 }}
        />
      </div>

      {/* Percentage */}
      <div className="mt-4 text-gray-400 text-sm font-medium tracking-widest">
        {progress}%
      </div>
    </motion.div>
  )
}
