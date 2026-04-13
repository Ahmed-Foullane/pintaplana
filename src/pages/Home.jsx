import { Helmet } from 'react-helmet-async'
import Hero from '../components/Hero'
import HomeIntro from '../components/HomeIntro'
import Partners from '../components/Partners'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>PINTAPLANA MAROC – Leader en Signalisation Routière</title>
        <meta
          name="description"
          content="PINTAPLANA MAROC, signalisation routière, glissières de sécurité et équipements pour sécuriser les chaussées — panneaux standard ou sur mesure au Maroc."
        />
        <meta name="keywords" content="signalisation routière, glissières, garde-corps, panneaux, PINTAPLANA MAROC, Maroc, signalétique" />
        <meta property="og:title" content="PINTAPLANA MAROC – Leader en Signalisation Routière" />
        <meta property="og:description" content="Signalisation, glissières et équipements de sécurité routière — conception et fabrication au Maroc." />
        <meta property="og:type" content="website" />
      </Helmet>

      <main>
        <Hero />
        <HomeIntro />
        <Partners />
      </main>
    </>
  )
}
