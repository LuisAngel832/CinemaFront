import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/AuthUser.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function LoginPage({ setIsTryLogin, setIsTryRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Por favor, completa todos los campos");
      return;
    }

    try {
      const response = await loginUser({ email, password });

      login(response.data);
      setError("");
      setIsTryLogin(false);

      // aquí decides a dónde lo mandas, por ejemplo a la cartelera
      navigate("/cartelera");
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setError(
        err.response?.data?.message || "Error al iniciar sesión"
      );
    }
  };

  return (
    <div
      className="
        fixed inset-0 z-40
        flex items-center justify-center
        bg-black/70 backdrop-blur-sm
      "
    >
      <div
        className="
          w-full max-w-sm
          p-6 sm:p-8
          bg-white rounded-2xl
          shadow-2xl border border-black/10
        "
      >
        <div className="relative left-[95%] font-bold text-2xl">
          <AiOutlineClose
            className="cursor-pointer"
            onClick={() => setIsTryLogin(false)}
          />
        </div>

        <h1 className="text-3xl font-bold text-center text-black">
          Iniciar sesión
        </h1>
        <p className="mt-2 text-center text-gray-600">
          Accede a tu cuenta
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                mt-1 block w-full
                px-4 py-2
                border border-gray-300 rounded-md
                focus:outline-none focus:ring-2 focus:ring-black
              "
              placeholder="correo@ejemplo.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                mt-1 block w-full
                px-4 py-2
                border border-gray-300 rounded-md
                focus:outline-none focus:ring-2 focus:ring-black
              "
              placeholder="********"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="
              w-full py-2 mt-4
              text-white bg-black
              rounded-md
              hover:bg-gray-800
              focus:outline-none focus:ring-2 focus:ring-black
            "
          >
            Iniciar sesión
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            ¿No tienes cuenta?{" "}
            <span
              className="text-black hover:underline cursor-pointer"
              onClick={() => {
                setIsTryLogin(false);
                setIsTryRegister(true);
              }}
            >
              Regístrate
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
