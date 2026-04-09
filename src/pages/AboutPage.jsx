import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import About from '../components/About'

export default function AboutPage() {
  const { t } = useTranslation()

  return (
    <>
      <Helmet>
        <title>{t('about.subtitle')} – PINTAPLANA MAROC</title>
        <meta name="description" content={t('about.p1')} />
        <meta property="og:title" content={`${t('about.subtitle')} – PINTAPLANA MAROC`} />
        <meta property="og:description" content={t('about.p1')} />
      </Helmet>
      <main className="pt-16 md:pt-20">
        <About />
      </main>
    </>
  )
}
