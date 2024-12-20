import React from "react";
import "../assets/css/HomeStyles.css";
import "../assets/css/GeneralStyles.css";
import AboutUsSection from "../components/AboutUsSection";
import BookSection from "../components/BookSection";
import ContactSection from "../components/ContactSection";
import Header from "../components/Header";
import IntroHome from "../components/IntroHome";
import ServicesSection from "../components/ServicesSection";
import { useAuth } from "../context/AuthContext";
import HomeAdmin from "./HomeAdmin";

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {!isAuthenticated ? (
        <>
          <IntroHome />
          <ServicesSection />
          <AboutUsSection />
          <BookSection />
          <ContactSection />
        </>
      ) : (
        <HomeAdmin />
      )}
    </>
  );
};

export default Home;