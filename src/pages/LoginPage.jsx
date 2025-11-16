import React, { useState } from 'react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }
        
        // Handle login logic here
        console.log('Login attempt:', { email, password });
        setError('');
    };

    return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600">🎬 CineTickets</h1>
      <p className="mt-4 text-gray-700">Compra tus boletos en línea</p>
      <button className="mt-6 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Ver Cartelera
      </button>
    </div>
  );
}