import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import Products from '../components/Products'

export default function ProductsPage() {
  const { t } = useTranslation()

  return (
    <>
      <Helmet>
        <title>{t('products.title')} – PINTAPLANA MAROC</title>
        <meta name="description" content={t('products.desc')} />
        <meta property="og:title" content={`${t('products.title')} – PINTAPLANA MAROC`} />
        <meta property="og:description" content={t('products.desc')} />
      </Helmet>
      <main className="pt-16 md:pt-20">
        <Products />
      </main>
    </>
  )
}
