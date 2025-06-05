import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Dashboard from "./pages/Dashboard/Dashboard";
import SetupFactoryPage from "./pages/SetupFactory/SetupFactory";
import Doco from "./pages/SetupFactory/Doco";
import NavBar from './components/Nav/NavBar';
import MobileNavBar from './components/Nav/MobileNavBar';
import "./App.css";
import Forms from "./pages/Forms/Forms";

const App = () => {
  const location = useLocation();
  const [showFullNavBar, setShowFullNavBar] = useState(window.innerWidth >= 950);
  const [showMobileNavBar, setShowMobileNavBar] = useState(window.innerWidth < 950);
  const navBarRef = useRef(null);

  const updateNavBarVisibility = (isMobile) => {
    setShowMobileNavBar(isMobile);
    if (isMobile) {
      setShowFullNavBar(false);
    } else {
      setShowFullNavBar(true);
    }
  };

  const handleResize = () => {
    const screenWidth = window.innerWidth;
    const isMobile = screenWidth < 950;
    updateNavBarVisibility(isMobile);
  };

  const toggleFullNavBarVisibility = () => {
    setShowFullNavBar(!showFullNavBar);
    setShowMobileNavBar(false);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (window.innerWidth < 950) {
      updateNavBarVisibility(true);
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navBarRef.current && !navBarRef.current.contains(event.target) && showFullNavBar && window.innerWidth < 950) {
        setShowFullNavBar(false);
        setShowMobileNavBar(true);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showFullNavBar, showMobileNavBar]);

  // Determine if NavBar should be hidden based on the current path
  const shouldHideNavBars = ["/login", "/signup"].includes(location.pathname);

  return (
    <div className="app">
      {!shouldHideNavBars && showFullNavBar && <NavBar ref={navBarRef} />}
      <div className="page">
        {!shouldHideNavBars && showMobileNavBar && <MobileNavBar onToggle={toggleFullNavBarVisibility} />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/getting-started/setup" element={<SetupFactoryPage />} />
          <Route path="/getting-started/documentation" element={<Doco />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/forms/*" element={<Forms />} />

          {/* Additional routes as needed */}
        </Routes>
      </div>
    </div>
  );
};

export default App;
