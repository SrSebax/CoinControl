import React from "react";
import logo from "../assets/coin-control-light.svg";

export default function SplashScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[var(--color-background)] to-[var(--color-primary)] animate-background-fade">
      <img
        src={logo}
        alt="CoinControl"
        className="h-28 w-auto animate-soft-bounce drop-shadow-xl"
      />
      <p className="mt-6 text-md text-text-secondary font-bold animate-fade-slide-up tracking-wide">
        Cargando tu espacio financiero...
      </p>
    </div>
  );
}
