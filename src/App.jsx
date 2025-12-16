import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { useState } from "react";

import { Navbar } from "./components/Navbar";
import LoginPage from "./pages/LoginPage.jsx";

import GestionDeFunciones from "./pages/admin/GestionDeFunciones.jsx";

import CarteleraPage from "./pages/client/CarteleraPage.jsx";
import FuncionesPage from "./pages/client/FuncionesPage.jsx";
import SeleccionAsientosPage from "./pages/client/SeleccionAsientosPage.jsx";
import PagoPage from "./pages/client/PagoPage.jsx";
import ProfilePage from "./pages/client/ProfilePage.jsx";
import ProfileHistoryPage from "./pages/client/ProfileHistoryPage.jsx";
import ProfilePaymentsPage from "./pages/client/ProfilePaymentsPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import Footer from "./components/Footer.jsx";

import "./App.css";
import AdminRoute from "./components/AdminRoute.jsx";
import ClientRoute from "./components/ClientRoute.jsx";

function App() {
  const [istryLogin, setIsTryLogin] = useState(() => !localStorage.getItem("token"));
  const [istryRegister, setIsTryRegister] = useState(false);

  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen flex flex-col bg-[#f5f5fb]">
          <Navbar setIsTryLogin={setIsTryLogin} />

          {istryLogin ? (
            <LoginPage
              setIsTryLogin={setIsTryLogin}
              setIsTryRegister={setIsTryRegister}
            />
          ) : null}

          {istryRegister ? (
            <RegisterPage
              setIsTryRegister={setIsTryRegister}
              setIsTryLogin={setIsTryLogin}
            />
          ) : null}

          <main className="flex-1">
            <Routes>
              <Route path="/" element={<CarteleraPage />} />
              <Route path="/cartelera" element={<CarteleraPage />} />

              <Route
                path="/gestion-funciones"
                element={
                  <AdminRoute>
                    <GestionDeFunciones />
                  </AdminRoute>
                }
              />

              <Route
                path="/funciones"
                element={
                  <ClientRoute>
                    <FuncionesPage />
                  </ClientRoute>
                }
              />
              <Route
                path="/asientos"
                element={
                  <ClientRoute>
                    <SeleccionAsientosPage />
                  </ClientRoute>
                }
              />
              <Route
                path="/pago"
                element={
                  <ClientRoute>
                    <PagoPage />
                  </ClientRoute>
                }
              />

              <Route
                path="/perfil"
                element={
                  <ClientRoute>
                    <ProfilePage />
                  </ClientRoute>
                }
              />
              <Route
                path="/historial"
                element={
                  <ClientRoute>
                    <ProfileHistoryPage />
                  </ClientRoute>
                }
              />
              <Route
                path="/pagos"
                element={
                  <ClientRoute>
                    <ProfilePaymentsPage />
                  </ClientRoute>
                }
              />
            </Routes>
          </main>

          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
