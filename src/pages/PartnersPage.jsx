import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import Partners from '../components/Partners'

export default function PartnersPage() {
  const { t } = useTranslation()

  return (
    <>
      <Helmet>
        <title>{t('partners.title')} – PINTAPLANA MAROC</title>
        <meta name="description" content={t('partners.subtitle')} />
        <meta property="og:title" content={`${t('partners.title')} – PINTAPLANA MAROC`} />
        <meta property="og:description" content={t('partners.subtitle')} />
      </Helmet>
      <main className="pt-16 md:pt-20">
        <Partners />
      </main>
    </>
  )
}
