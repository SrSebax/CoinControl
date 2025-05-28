import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase";

import SplashView from "../pages/SplashView";
import HomeView from "../pages/HomeView";
import NewEntryView from "../pages/NewEntryView";
import NotFoundView from "../pages/NotFoundView";
import LoginView from "../pages/LoginView";

export default function AppRoutes() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    let resolvedAuth = false;
    let resolvedTimeout = false;

    const finishLoading = () => {
      if (resolvedAuth && resolvedTimeout) setLoading(false);
    };

    const timeout = setTimeout(() => {
      resolvedTimeout = true;
      finishLoading();
    }, 4000); // mínimo 3 segundos

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      resolvedAuth = true;
      finishLoading();
    });

    return () => {
      clearTimeout(timeout);
      unsubscribe();
    };
  }, []);

  if (loading) return <SplashView />;

  return (
    <Routes>
      {/* Rutas protegidas */}
      <Route
        path="/home"
        element={user ? <HomeView /> : <Navigate to="/" replace />}
      />
      <Route
        path="/new-entry"
        element={user ? <NewEntryView /> : <Navigate to="/" replace />}
      />

      {/* Login pública */}
      <Route
        path="/"
        element={user ? <Navigate to="/home" replace /> : <LoginView />}
      />

      {/* Ruta 404 */}
      <Route path="*" element={<NotFoundView />} />
    </Routes>
  );
}
