import { Helmet } from 'react-helmet-async'
import Hero from '../components/Hero'
import About from '../components/About'
import Products from '../components/Products'
import Partners from '../components/Partners'
import ContactForm from '../components/ContactForm'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>PINTAPLANA MAROC – Leader en Signalisation Routière</title>
        <meta
          name="description"
          content="PINTAPLANA MAROC, spécialiste de la signalisation routière verticale et horizontale, panneaux standard ou sur mesure au Maroc."
        />
        <meta name="keywords" content="signalisation routière, panneaux, PINTAPLANA MAROC, Maroc, signalétique" />
        <meta property="og:title" content="PINTAPLANA MAROC – Leader en Signalisation Routière" />
        <meta property="og:description" content="Conception et fabrication de panneaux de signalisation de qualité au Maroc." />
        <meta property="og:type" content="website" />
      </Helmet>

      <main>
        <Hero />
        <About />
        <Products />
        <Partners />
        <ContactForm />
      </main>
    </>
  )
}
