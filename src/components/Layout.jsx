import { Link } from 'react-router-dom';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-primary">CoinControl</h1>
        <nav className="space-x-4">
          <Link to="/">Inicio</Link>
          <Link to="/summary">Resumen</Link>
        </nav>
      </header>
      <main className="p-4">{children}</main>
    </div>
  );
}
