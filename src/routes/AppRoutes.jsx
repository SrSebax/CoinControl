import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Summary from "../pages/Summary";
import NotFound from "../pages/NotFound";
import SplashScreen from "../components/SplashScreen";

const AppRoutes = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <SplashScreen />;

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/summary" element={<Summary />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
