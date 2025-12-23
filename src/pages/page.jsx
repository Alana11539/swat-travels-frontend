
import HeroSection from "../components/home/HeroSection"
import WhyChooseSection from "../components/home/WhyChooseSection"
import StatsSection from "../components/home/StatsSection"
import ServicesSection from "../components/home/ServicesSection"
import TestimonialsSection from "../components/home/TestimonialsSection"
import FeedbackSection from "../components/home/FeedbackSection"
import CTASection from "../components/home/CTASection"
import "../styles/home.css"

export default function Home() {
  return (
    <main>
      <HeroSection />
      <WhyChooseSection />
      <StatsSection />
      <ServicesSection />
      <TestimonialsSection />
      <FeedbackSection />
      <CTASection />
    </main>
  )
}
