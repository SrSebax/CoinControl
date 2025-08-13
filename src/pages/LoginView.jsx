import { useLoginController } from "../controller/LoginController";
import ToastMessage from "../components/ToastMessage";
import { FcGoogle } from "react-icons/fc";
import nordwareLogo from "../assets/nørdware/nordware-full-dark.svg";
import { useState } from "react";
import { FiEye, FiEyeOff, FiArrowLeft } from "react-icons/fi";

export default function LoginView() {
  const {
    email,
    password,
    setEmail,
    setPassword,
    loginWithEmail,
    registerWithEmail,
    loginWithGoogle,
    resetPassword,
    alert,
    handleCloseAlert,
  } = useLoginController();
  const [showPassword, setShowPassword] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#f0f9ff] via-[#e5f7f5] to-[#dff7f4] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-gradient-to-br from-teal-100/40 to-teal-300/30 blur-3xl"></div>
        <div className="absolute bottom-[-15%] right-[-5%] w-[50%] h-[50%] rounded-full bg-gradient-to-tl from-blue-100/30 to-teal-200/20 blur-3xl"></div>
        <div className="absolute top-[40%] right-[10%] w-[20%] h-[20%] rounded-full bg-gradient-to-br from-teal-200/20 to-teal-300/10 blur-2xl"></div>
      </div>
      
      {/* Toast */}
      <ToastMessage
        open={alert.open}
        message={alert.message}
        type={alert.type}
        duration={4000}
        onClose={handleCloseAlert}
      />

      {/* Logo Nørdware en esquina inferior derecha */}
      <div
        className="
  absolute 
  top-4 left-1/2 transform -translate-x-1/2 
  md:top-auto md:bottom-4 md:left-auto md:right-4 md:translate-x-0
  z-10
"
      >
        <img src={nordwareLogo} alt="Nørdware" className="h-15 drop-shadow-md" />
      </div>

      <div className="w-full max-w-md bg-white/90 backdrop-blur-sm border border-gray-100 shadow-2xl rounded-2xl p-8 animate-fade-in relative z-10">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-500 mb-2">
            CoinControl
          </h1>
          <p className="text-center text-gray-500 text-sm">
            Controla tus ingresos y gastos fácilmente
          </p>
        </div>

        {showResetForm ? (
          <div className="space-y-4">
            <div className="flex items-center mb-2">
              <button 
                type="button" 
                onClick={() => setShowResetForm(false)}
                className="text-gray-500 hover:text-gray-700 mr-2"
              >
                <FiArrowLeft size={20} />
              </button>
              <h2 className="text-xl font-bold text-gray-800">Recuperar contraseña</h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
            </p>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Correo electrónico
              </label>
              <input
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent shadow-sm transition-all duration-200"
                placeholder="tucorreo@ejemplo.com"
              />
            </div>
            <button
              onClick={async () => {
                const success = await resetPassword(resetEmail);
                if (success) {
                  setTimeout(() => setShowResetForm(false), 3000);
                }
              }}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
            >
              Enviar correo de recuperación
            </button>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent shadow-sm transition-all duration-200"
              placeholder="tucorreo@ejemplo.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent shadow-sm transition-all duration-200"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                aria-label={
                  showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                }
                title={
                  showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                }
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
          </div>
          
          {!showResetForm && (
            <div className="text-right mb-2">
              <button 
                type="button" 
                onClick={() => {
                  setShowResetForm(true);
                  setResetEmail(email);
                }}
                className="text-sm text-teal-600 hover:text-teal-800 font-medium transition-colors duration-200"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          )}

          <div className="flex gap-2">
            <button
              onClick={loginWithEmail}
              className="w-1/2 py-3 rounded-lg bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
            >
              Iniciar sesión
            </button>
            <button
              onClick={registerWithEmail}
              className="w-1/2 py-3 rounded-lg border border-teal-500 text-teal-600 hover:border-teal-600 hover:bg-teal-50 font-semibold shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02]"
            >
              Registrarse
            </button>
          </div>
        </form>
        )}

        <div className="flex items-center my-5">
          <div className="flex-grow h-px bg-gray-200" />
          <span className="text-gray-400 mx-3 text-sm">o</span>
          <div className="flex-grow h-px bg-gray-200" />
        </div>

        <button
          onClick={loginWithGoogle}
          className="w-full flex items-center justify-center gap-3 py-3 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02]"
        >
          <FcGoogle size={20} />
          Iniciar sesión con Google
        </button>

        <div className="mt-8 text-xs text-center text-gray-500 space-y-1">
          <p>
            Desarrollado por{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-500 font-semibold">
              Sebastian Londoño 🧑‍💻
            </span>
          </p>
          <p>
            Diseñado por{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-500 font-semibold">Ana Naranjo 🎨</span>
          </p>
        </div>
      </div>
    </div>
  );
}
