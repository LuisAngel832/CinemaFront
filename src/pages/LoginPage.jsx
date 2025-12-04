import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineClose } from "react-icons/ai";


export default function LoginPage({setIsTryLogin, setIsTryRegister}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!email || !password) {
            setError('Por favor, completa todos los campos');
            return;
        }
        console.log('Intento de login:', { email, password });
        setError('');
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
                <div className='relative left-[95%] font-bold text-2xl '><AiOutlineClose className='cursor-pointer' onClick={()=> setIsTryLogin(false)} /></div>
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

                    <Link to="gestion-funciones">
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
                    </Link>
                </form>

                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        ¿No tienes cuenta?{' '}
                        <a
                            className="text-black hover:underline"
                            onClick={()=>{
                                setIsTryLogin(false)
                                setIsTryRegister(true)
                            }}
                        >
                            Regístrate
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
