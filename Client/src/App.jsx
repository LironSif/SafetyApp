import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login.jsx";
import SignUp from "./Pages/SignUp/SignUp.jsx";
import "./App.css";

import Dashboard from "./Pages/Dashboard/Dashboard.jsx";
import SetupYourFactory from "./Pages/setup-your-factory/setup-your-factory.jsx";
import Doco from "./Pages/setup-your-factory/Doco.jsx";
import NavBar from './components/Nav/NavBar.jsx'
const App = () => {
  const location = useLocation(); // Hook to get the current location

  // Function to determine if the Sidebar should be displayed
  const shouldShowSidebar = () => {
    // List of paths where the Sidebar should not be shown
    const noSidebarPaths = ["/login", "/signup"];
    // Check if the current path is in the list of paths to not show the Sidebar
    return !noSidebarPaths.includes(location.pathname);
  };

  return (
    <div className="app">
    
      {shouldShowSidebar() && <NavBar />} 
      <div className="page">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path="/getting-started/setup" element={<SetupYourFactory/>} />
          <Route path="/getting-started/documentation" element={<Doco/>}/>
          
          <Route path="/dashboard/factory" element={<Dashboard/>} />
          <Route path="/dashboard/inventory" element={<Dashboard/>} />

          <Route path="/forms/subcontractor-form" element={<Dashboard/>} />
          <Route path="/forms/factory" element={<Dashboard/>} />

          <Route path="/chat" element={<Dashboard/>} />
          {/* You might want to remove the '/wdwdwd' route if it was mistakenly added or update its path */}
        </Routes>
      </div>
    </div>
  );
};

export default App;
