import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import ContactForm from '../components/ContactForm'

export default function ContactPage() {
  const { t } = useTranslation()

  return (
    <>
      <Helmet>
        <title>{t('contact.title')} – PINTAPLANA MAROC</title>
        <meta name="description" content={t('contact.desc')} />
        <meta property="og:title" content={`${t('contact.title')} – PINTAPLANA MAROC`} />
        <meta property="og:description" content={t('contact.desc')} />
      </Helmet>
      <main className="pt-16 md:pt-20">
        <ContactForm />
      </main>
    </>
  )
}
