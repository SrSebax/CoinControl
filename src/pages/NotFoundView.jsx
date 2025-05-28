import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";

export default function NotFoundView() {
  return (
    <div className="relative h-screen bg-[var(--color-background)] flex items-center justify-center p-4 overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -top-32 -left-32 w-64 h-64 rounded-full bg-[var(--color-primary)] opacity-10 animate-spin-slow"></div>
      <div className="absolute -bottom-32 -right-32 w-64 h-64 rounded-full bg-[var(--color-primary)] opacity-10 animate-spin-slow-reverse"></div>

      <div className="relative bg-[var(--color-dialog-background)] p-10 rounded-3xl shadow-2xl text-center max-w-md w-full">
        <AlertCircle className="mx-auto h-20 w-20 text-[var(--color-primary)] mb-6 animate-bounce" />
        <h1 className="text-7xl font-extrabold text-[var(--color-text)] mb-2 animate-pulse">
          404
        </h1>
        <p className="text-xl text-[var(--color-text-secondary)] mb-4">
          Lo sentimos, la página que buscas no existe.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/home"
            className="px-6 py-3 bg-[var(--color-primary)] text-[var(--color-text-button)] font-semibold rounded-full transition duration-300 transform hover:scale-110 hover:shadow-xl hover:bg-gradient-to-r hover:from-[var(--color-primary)] hover:to-[var(--color-success)] focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)]"
          >
            Inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
