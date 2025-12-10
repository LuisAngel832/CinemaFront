import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import {signupUser as signup} from "../api/AuthUser.js";

export default function RegisterPage({ setIsTryRegister, setIsTryLogin }) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre || !email || !password ) {
      setError("Por favor, completa todos los campos");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    signup({ fullName: nombre, email, password })
      .then((response) => {
        console.log("Usuario registrado:", response.data);
        setError("");
        if (setIsTryRegister) setIsTryRegister(false);
        if (setIsTryLogin) setIsTryLogin(true);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Error al registrar");
      });
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
            onClick={() => setIsTryRegister && setIsTryRegister(false)}
          />
        </div>

        <h1 className="text-3xl font-bold text-center text-black">
          Crear cuenta
        </h1>
        <p className="mt-2 text-center text-gray-600">
          Regístrate para comenzar
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="nombre"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre completo
            </label>
            <input
              id="nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="
                mt-1 block w-full
                px-4 py-2
                border border-gray-300 rounded-md
                focus:outline-none focus:ring-2 focus:ring-black
              "
              placeholder="Tu nombre"
            />
          </div>

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

          

          {error && <p className="text-sm text-red-500">{error}</p>}

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
            Crear cuenta
          </button>
        </form>

        <div className="mt-4 text-center ">
          <p className="text-sm text-gray-600 flex justify-center">
            ¿Ya tienes cuenta?{" "}
            <p  className="text-black hover:underline cursor-pointer"
            onClick={()=>{
              setIsTryRegister(false);
              setIsTryLogin(true);
            }}>
              Inicia sesión
            </p>
          </p>
        </div>
      </div>
    </div>
  );
}
