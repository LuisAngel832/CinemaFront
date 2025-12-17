import { LuTicket, LuLogIn } from "react-icons/lu";
import { CiLogin } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = ({ setIsTryLogin }) => {
  const { isLogged, isAdmin, logout } = useAuth();

  const buttonClass =
    "font-bold text-center p-2.5 px-7.5 rounded-2xl transition hover:cursor-pointer";
  const loginButtonClass =
    `flex items-center gap-1 text-1xl text-white bg-purple-600 hover:scale-105 ` +
    buttonClass;
  const adminButtonClass =
    `text-black bg-white hover:bg-gray-200 ` + buttonClass;
  const logoutButtonClass =
    `text-white flex items-center gap-1.5 bg-red-500 hover:bg-red-600 ` +
    buttonClass;

  return (
    <nav className="bg-black/90 p-4 text-white flex justify-between items-center">
      <div className="flex gap-10 items-center ml-10">
        <Link to="/">
          <div className="group flex items-center text-white font-bold px-3 py-1 rounded cursor-pointer">
            <LuTicket className="text-4xl transform rotate-90 transition-transform duration-200 ease-out origin-center group-hover:text-purple-600 group-hover:scale-105" />
            <p className="ml-3 text-2xl font-semibold transition-colors duration-200 ease-out origin-center group-hover:text-purple-600 group-hover:scale-105">
              Cine Plus
            </p>
          </div>
        </Link>

        {isLogged && (
          <Link to="/perfil">
            <button className="text-white font-bold px-3 py-1 rounded transition-colors duration-200 ease-out origin-center hover:text-purple-600 hover:scale-105 cursor-pointer">
              Mi cuenta
            </button>
          </Link>
        )}
      </div>

      <div className="flex gap-5">
        {isLogged && isAdmin && (
          <Link to="/gestion-funciones">
            <button className={adminButtonClass}>
              Administrar
            </button>
          </Link>
        )}

        {isLogged ? (
          <button
            className={logoutButtonClass}
            onClick={() => {
              logout();
              if (setIsTryLogin) setIsTryLogin(true);
            }}
          >
            <CiLogin className="text-2xl" />
            Log Out
          </button>
        ) : (
          <button
            className={loginButtonClass}
            onClick={() => setIsTryLogin(true)}
          >
            <LuLogIn />
            Log In
          </button>
        )}
      </div>
    </nav>
  );
};

export { Navbar };
