import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase";

import SplashView from "../pages/SplashView";
import HomeView from "../pages/HomeView";
import NewEntryView from "../pages/NewEntryView";
import EditEntryView from "../pages/EditEntryView";
import SelectEntryView from "../pages/SelectEntryView";
import NotFoundView from "../pages/NotFoundView";
import LoginView from "../pages/LoginView";
import CategoriesView from "../pages/CategoriesView";
import EditCategoryView from "../pages/EditCategoryView";
import SelectCategoryView from "../pages/SelectCategoryView";
import PocketsView from "../pages/PocketsView";
import EditPocketView from "../pages/EditPocketView";
import SelectPocketView from "../pages/SelectPocketView";

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
      <Route
        path="/categories"
        element={user ? <CategoriesView /> : <Navigate to="/" replace />}
      />
      <Route
        path="/select-category"
        element={user ? <SelectCategoryView /> : <Navigate to="/" replace />}
      />
      <Route
        path="/edit-category/:categoryId"
        element={user ? <EditCategoryView /> : <Navigate to="/" replace />}
      />
      <Route
        path="/select-entry"
        element={user ? <SelectEntryView /> : <Navigate to="/" replace />}
      />
      <Route
        path="/edit-entry/:entryId"
        element={user ? <EditEntryView /> : <Navigate to="/" replace />}
      />

      {/* Rutas de Bolsillos */}
      <Route
        path="/pockets"
        element={user ? <PocketsView /> : <Navigate to="/" replace />}
      />
      <Route
        path="/select-pocket"
        element={user ? <SelectPocketView /> : <Navigate to="/" replace />}
      />
      <Route
        path="/edit-pocket/:pocketId"
        element={user ? <EditPocketView /> : <Navigate to="/" replace />}
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