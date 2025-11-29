import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

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

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />

        <Routes>
          {/* Login */}
          <Route path="/" element={<LoginPage />} />

          {/* Admin */}
          <Route path="/gestion-funciones" element={<GestionDeFunciones />} />

          {/* Cliente flujo compra */}
          <Route path="/cartelera" element={<CarteleraPage />} />
          <Route path="/funciones" element={<FuncionesPage />} />
          <Route path="/asientos" element={<SeleccionAsientosPage />} />
          <Route path="/pago" element={<PagoPage />} />

          {/* Perfil */}
          <Route path="/perfil" element={<ProfilePage />} />
          <Route path="/historial" element={<ProfileHistoryPage />} />
          <Route path="/pagos" element={<ProfilePaymentsPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
