import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <h1 className="text-3xl font-bold">404 - Página no encontrada</h1>
      <Link to="/" className="text-blue-500 mt-4">Volver al inicio</Link>
    </div>
  );
}
