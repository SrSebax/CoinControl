import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../services/firebase";
import { useNavigate } from "react-router-dom";

export function useLoginController() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({ open: false, type: "info", message: "" });
  const navigate = useNavigate();

  const showAlert = (type, message) => {
    setAlert({ open: true, type, message });
  };

  const handleCloseAlert = () => {
    setAlert((prev) => ({ ...prev, open: false }));
  };

  const getErrorMessage = (code) => {
    const messages = {
      "auth/invalid-email": "El correo no es válido.",
      "auth/missing-password": "Debes ingresar una contraseña.",
      "auth/wrong-password": "La contraseña es incorrecta.",
      "auth/user-not-found": "No se encontró una cuenta con ese correo.",
      "auth/email-already-in-use": "Este correo ya está registrado.",
      "auth/weak-password": "La contraseña debe tener al menos 6 caracteres.",
      "auth/popup-closed-by-user": "Cierre inesperado. Intenta de nuevo.",
    };
    return messages[code] || "Ocurrió un error. Intenta nuevamente.";
  };

  const loginWithEmail = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      showAlert("success", "Inicio de sesión exitoso");
      navigate("/home");
    } catch (error) {
      showAlert("error", getErrorMessage(error.code));
    }
  };

  const registerWithEmail = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      showAlert("success", "Registro exitoso");
      navigate("/home");
    } catch (error) {
      showAlert("error", getErrorMessage(error.code));
    }
  };

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      showAlert("success", "Inicio de sesión con Google exitoso");
      navigate("/home");
    } catch (error) {
      showAlert("error", getErrorMessage(error.code));
    }
  };

  return {
    email,
    password,
    setEmail,
    setPassword,
    loginWithEmail,
    registerWithEmail,
    loginWithGoogle,
    alert,
    handleCloseAlert,
  };
}
