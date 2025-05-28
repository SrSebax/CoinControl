import { useLoginController } from "../controller/LoginController";
import ToastMessage from "../components/ToastMessage";
import { FcGoogle } from "react-icons/fc";

export default function LoginView() {
  const {
    email,
    password,
    setEmail,
    setPassword,
    loginWithEmail,
    registerWithEmail,
    loginWithGoogle,
    alert,
    handleCloseAlert,
  } = useLoginController();

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#f8fdfa] to-[#e5f7f5] flex items-center justify-center px-4">
      {/* Toast */}
      <ToastMessage
        open={alert.open}
        message={alert.message}
        severity={alert.type}
        duration={4000}
        onClose={handleCloseAlert}
      />

      <div className="w-full max-w-md bg-white border border-gray-200 shadow-xl rounded-2xl p-8 animate-fade-in">
        <h1 className="text-3xl font-extrabold text-center text-teal-600 mb-2">
          CoinControl
        </h1>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Controla tus ingresos y gastos fácilmente
        </p>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="tucorreo@ejemplo.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="••••••••"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={loginWithEmail}
              className="w-1/2 py-2 rounded-lg bg-teal-500 hover:bg-teal-600 text-white font-semibold transition-transform hover:scale-[1.03]"
            >
              Iniciar sesión
            </button>
            <button
              onClick={registerWithEmail}
              className="w-1/2 py-2 rounded-lg border border-teal-500 text-teal-600 hover:border-teal-600 hover:bg-teal-50 font-semibold transition-transform hover:scale-[1.03]"
            >
              Registrarse
            </button>
          </div>
        </form>

        <div className="flex items-center my-5">
          <div className="flex-grow h-px bg-gray-200" />
          <span className="text-gray-400 mx-3 text-sm">o</span>
          <div className="flex-grow h-px bg-gray-200" />
        </div>

        <button
          onClick={loginWithGoogle}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-transform hover:scale-[1.03]"
        >
          <FcGoogle size={20} />
          Iniciar sesión con Google
        </button>

        <div className="mt-6 text-xs text-center text-gray-500 space-y-1">
          <p>
            Desarrollado por{" "}
            <span className="text-teal-600 font-semibold">
              Sebastian Londoño 🧑‍💻
            </span>
          </p>
          <p>
            Diseñado por{" "}
            <span className="text-teal-600 font-semibold">Ana Naranjo 🎨</span>
          </p>
        </div>
      </div>
    </div>
  );
}
