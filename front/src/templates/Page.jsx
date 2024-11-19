import NavMenu from "../components/NavMenu"
import Footer from "../components/Footer"
const Page = ({children}) => {
  return (
    <>
    <NavMenu />
    {children}
    <Footer />
    </>
  )
}

export default Page
