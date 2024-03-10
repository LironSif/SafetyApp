import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useCheckAuthStatusQuery } from "./services/userApi"; // Adjust the import path as necessary
import Navbar from "./components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
// import Login from "./Pages/Login/Login";
import Login from "./Pages/Login/Login.jsx";
import SignUp from "./Pages/SignUp/SignUp.jsx";

const App = () => {
  const { data: user, isLoading } = useCheckAuthStatusQuery();
  return (
    <BrowserRouter>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
