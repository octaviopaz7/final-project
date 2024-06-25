import '../assets/css/HomeStyles.css'
import AboutUsSection from '../components/AboutUsSection'
import BookSection from '../components/BookSection'
import ContactSection from '../components/ContactSection'
import Header from '../components/Header'
import IntroHome from '../components/IntroHome'
import ServicesSection from '../components/ServicesSection'
const Home = () => {
  return (
    <>
    <IntroHome/>
    <ServicesSection />
    <AboutUsSection />
    <BookSection />
    <ContactSection />
    </>
  )
}

export default Home
