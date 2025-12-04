import { LuTicket } from "react-icons/lu";
import { LuLogIn } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";


const Navbar = ({setIsTryLogin}) => {
  const {islogged, logout} = useAuth();
  return (
    <nav className="bg-black/90 p-4 text-white flex justify-between items-center">
      <div className="flex gap-10 items-center ml-10">
        <Link to="/">
          <div className="group flex items-center text-white font-bold px-3 py-1 rounded cursor-pointer">
            <LuTicket className="text-4xl transform rotate-90 transition-transform duration-200 ease-out origin-center group-hover:text-purple-600 group-hover:scale-105" />
            <p className="ml-3 text-2xl font-semibold transition-colors duration-200 ease-out origin-center group-hover:text-purple-600 group-hover:scale-105">Cine Plus</p>
          </div>
        </Link>

        {
          islogged && (
            <Link to="/perfil">
              <button className="text-white font-bold px-3 py-1 rounded transition-colors duration-200 ease-out origin-center hover:text-purple-600 hover:scale-105 cursor-pointer">
                Mi cuenta
              </button>
          </Link>
          )
        }
      </div>

      {islogged ? (
        
        <div className="flex gap-5">
        <Link to="/gestion-funciones">
          <button className="text-black font-bold  bg-white text-center p-2.5 px-7.5 rounded-2xl  hover:cursor-pointer">
           Administrar
          </button>
        </Link>

          
          <button
            className="text-black font-bold text-1xl bg-white text-center p-2.5 px-7.5 rounded-2xl transition hover:cursor-pointer"
            
          >
            Log Out
          </button>
        </div>
      ) : 
      (
        <button className="flex items-center gap-1 text-1xl text-white font-bold text-1xl bg-purple-600 text-center p-2.5 px-7.5 rounded-2xl   hover:scale-105 transition hover:cursor-pointer"
        onClick={() => setIsTryLogin(true)}>
          <LuLogIn />
          Log In
        </button>
      )}
    </nav>
  );
};

export { Navbar };
