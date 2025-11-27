// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ logedIn = true }) => {
  const navigate = useNavigate();

  const goToAdmin = () => {
    navigate("/gestion-funciones");
  };

  const goToLogin = () => {
    navigate("/");
  };

  return (
    <nav className="bg-black/90 p-4 text-white flex justify-between items-center">
      <div className="flex gap-10 items-center ml-10">
        {/* Logo: te lleva a la cartelera */}
        <Link
          to="/cartelera"
          className="text-white font-bold px-3 py-1 rounded hover:cursor-pointer"
        >
          CinePlus
        </Link>

        {/* Cartelera */}
        <Link
          to="/cartelera"
          className="text-white font-bold px-3 py-1 rounded hover:cursor-pointer"
        >
          Cartelera
        </Link>

        {/* Mi cuenta (perfil) */}
        {logedIn && (
          <Link
            to="/perfil"
            className="text-white font-bold px-3 py-1 rounded hover:cursor-pointer"
          >
            Mi cuenta
          </Link>
        )}
      </div>

      {logedIn ? (
        <div className="flex gap-5">
          {/* Admin */}
          <button
            className="text-black font-bold text-1xl bg-white text-center p-2.5 px-7.5 rounded-2xl hover:cursor-pointer"
            onClick={goToAdmin}
          >
            Administrar
          </button>

          {/* Logout (solo navega al login de momento) */}
          <button
            className="text-black font-bold text-1xl bg-white text-center p-2.5 px-7.5 rounded-2xl transition hover:cursor-pointer"
            onClick={goToLogin}
          >
            Log Out
          </button>
        </div>
      ) : (
        <button
          className="text-black font-bold text-1xl bg-white text-center p-2.5 px-7.5 rounded-2xl hover:text-yellow-400 transition hover:cursor-pointer"
          onClick={goToLogin}
        >
          Log In
        </button>
      )}
    </nav>
  );
};

export { Navbar };
