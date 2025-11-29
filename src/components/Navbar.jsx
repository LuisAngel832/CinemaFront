import { LuTicket } from "react-icons/lu";
import { LuLogIn } from "react-icons/lu";


const Navbar = ({logedIn}) => {
  return (
    <nav className="bg-black/90 p-4 text-white flex justify-between items-center">
      
      <div className="flex gap-10 items-center ml-10">
        <div className="group flex items-center text-white font-bold px-3 py-1 rounded cursor-pointer">
          <LuTicket className="text-4xl transform rotate-90 transition-transform transition-colors duration-200 ease-out origin-center group-hover:text-purple-600 group-hover:scale-105" />
          <p className="ml-3 text-2xl font-semibold transition-transform transition-colors duration-200 ease-out origin-center group-hover:text-purple-600 group-hover:scale-105">Cine Plus</p>
        </div>

        <button className="text-white font-semibold text-2xl px-3 py-1 rounded transition-transform transition-colors duration-200 ease-out origin-center hover:text-purple-600 hover:scale-105 cursor-pointer">
          Cartelera
        </button>

        {
          logedIn && (
            <button className="text-white font-bold px-3 py-1 rounded transition-transform transition-colors duration-200 ease-out origin-center hover:text-purple-600 hover:scale-105 cursor-pointer">
              Mi cuenta
            </button>
          )
        }
      </div>

      {
        logedIn ? (
        <div className="flex gap-5">
          <button className="text-black font-bold  bg-white text-center p-2.5 px-7.5 rounded-2xl  hover:cursor-pointer">
        Administrar
          </button>

           <button className="text-black font-bold text-1xl bg-white text-center p-2.5 px-7.5 rounded-2xl transition hover:cursor-pointer">
        Log Out
      </button>
        </div>
      ) : 
      (
        <button className="flex items-center gap-1 text-1xl text-white font-bold text-1xl bg-purple-600 text-center p-2.5 px-7.5 rounded-2xl   hover:scale-105 transition hover:cursor-pointer">
          <LuLogIn />
          Log In
        </button>
      )
      }

    </nav>
  );
};

export { Navbar };
