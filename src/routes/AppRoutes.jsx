import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import SplashScreen from "../pages/SplashScreen";
import NewEntry from "../pages/NewEntry";

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
      <Route path="/new-entry" element={<NewEntry />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
