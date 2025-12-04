
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useState } from 'react';

import { Navbar } from './components/Navbar';
import LoginPage from './pages/LoginPage.jsx';

import GestionDeFunciones from './pages/admin/GestionDeFunciones.jsx';

import CarteleraPage from './pages/client/CarteleraPage.jsx';
import FuncionesPage from './pages/client/FuncionesPage.jsx';
import SeleccionAsientosPage from './pages/client/SeleccionAsientosPage.jsx';
import PagoPage from './pages/client/PagoPage.jsx';
import ProfilePage from './pages/client/ProfilePage.jsx';
import ProfileHistoryPage from './pages/client/ProfileHistoryPage.jsx';
import ProfilePaymentsPage from './pages/client/ProfilePaymentsPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import Footer from './components/Footer.jsx';

import './App.css';

function App() {
  const [istryLogin, setIsTryLogin] = useState(false);
  const [istryRegister, setIsTryRegister] = useState(false);

  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar setIsTryLogin={setIsTryLogin} />
          {istryLogin ? <LoginPage setIsTryLogin={setIsTryLogin} setIsTryRegister={setIsTryRegister} /> : null}
          {istryRegister ? <RegisterPage setIsTryRegister={setIsTryRegister} /> : null}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<CarteleraPage />} />
                        
              <Route path="/gestion-funciones" element={<GestionDeFunciones />} />
              
              <Route path="/funciones" element={<FuncionesPage />} />
              <Route path="/asientos" element={<SeleccionAsientosPage />} />
              <Route path="/pago" element={<PagoPage />} />

              
              <Route path="/perfil" element={<ProfilePage />} />
              <Route path="/historial" element={<ProfileHistoryPage />} />
              <Route path="/pagos" element={<ProfilePaymentsPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
