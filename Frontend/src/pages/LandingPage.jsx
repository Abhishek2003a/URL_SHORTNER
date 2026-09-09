import { useState } from "react";
import { useLocation } from "react-router-dom";

import Navbar from "../components/landing/Navbar";
import HeroSection from "../components/landing/HeroSection";
import Features from "../components/landing/features";
import HowItWorks from "../components/landing/HowItWorks";
import CTA from "../components/landing/CTA";
import Footer from "../components/landing/Footer";

import LoginCard from "../components/auth/loginCard";
import SignupCard from "../components/auth/SignupCard";

import MainLayout from "../layouts/MainLayout";
import { useAuth } from "../contexts/AuthContext";
const LandingPage = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const [showLogin, setShowLogin] = useState(
    Boolean(location.state?.from && !isAuthenticated),
  );
  const [showSignup, setShowSignup] = useState(false);

  return (
    <MainLayout>
      {(showLogin || showSignup) && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" />
      )}

      {showLogin && (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
          <LoginCard
            onClose={() => setShowLogin(false)}
            onSwitch={() => {
              setShowLogin(false);
              setShowSignup(true);
            }}
          />
        </div>
      )}

      {showSignup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
          <SignupCard
            onClose={() => setShowSignup(false)}
            onSwitch={() => {
              setShowSignup(false);
              setShowLogin(true);
            }}
          />
        </div>
      )}

      <div
        className={`relative z-10 transition-all duration-300 ${
          showLogin || showSignup ? "blur-sm scale-[0.98]" : ""
        }`}
      >
        <Navbar
          onLogin={() => setShowLogin(true)}
          onSignup={() => setShowSignup(true)}
        />
        <HeroSection />
        <Features />
        <HowItWorks />
        {!isAuthenticated && <CTA onSignup={() => setShowSignup(true)} />}
        <Footer />
      </div>
    </MainLayout>
  );
};

export default LandingPage;
