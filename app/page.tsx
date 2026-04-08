import Hero from '@/components/home/Hero'
import Services from '@/components/home/Services'
import FeaturedProperties from '@/components/home/FeaturedProperties'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import Testimonials from '@/components/home/Testimonials'
import SocialFeed from '@/components/home/SocialFeed'
import ContactCTA from '@/components/home/ContactCTA'

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
