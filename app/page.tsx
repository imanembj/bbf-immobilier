import Hero from '@/components/home/Hero'
import Services from '@/components/home/Services'
import FeaturedProperties from '@/components/home/FeaturedProperties'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import Testimonials from '@/components/home/Testimonials'
import SocialFeed from '@/components/home/SocialFeed'
import ContactCTA from '@/components/home/ContactCTA'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'BBF Immobilier - Agence immobilière en Martinique | Vente, Location, Gestion',
  description: 'BBF Immobilier, votre agence immobilière de confiance en Martinique. Vente, location saisonnière et annuelle, gestion locative. Découvrez nos biens d\'exception : villas, appartements, terrains.',
  keywords: 'immobilier martinique, agence immobilière martinique, vente villa martinique, location saisonnière martinique, location annuelle martinique, BBF immobilier',
  openGraph: {
    title: 'BBF Immobilier - Agence immobilière en Martinique',
    description: 'Vente, location et gestion immobilière en Martinique. Découvrez nos biens d\'exception.',
    url: 'https://www.bbf-immobilier.com',
    siteName: 'BBF Immobilier',
    locale: 'fr_FR',
    type: 'website',
  },
}

export const revalidate = 3600 // Revalider toutes les heures

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <FeaturedProperties />
      <WhyChooseUs />
      <Testimonials />
      <SocialFeed />
      <ContactCTA />
    </>
  )
}
