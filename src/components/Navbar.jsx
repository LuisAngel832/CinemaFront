const Navbar = ({logedIn=true}) => {
  return (
    <nav className="bg-black/90 p-4 text-white flex justify-between items-center">
      
      <div className="flex gap-10 items-center ml-10">
        <div className="text-whitek font-bold px-3 py-1 rounded hover:cursor-pointer">
          CinePlus
        </div>

        <button className=" text-white font-bold px-3 py-1 rounded hover:cursor-pointer">
          Cartelera
        </button>

        {
          logedIn && (
            <button className=" text-white font-bold px-3 py-1 rounded hover:cursor-pointer">
              Mi cuenta
            </button>
          )
        }
      </div>

      {
        logedIn ? (
        <div className="flex gap-5">
          <button className="text-black font-bold text-1xl bg-white text-center p-2.5 px-7.5 rounded-2xl  hover:cursor-pointer">
        Administrar
          </button>

           <button className="text-black font-bold text-1xl bg-white text-center p-2.5 px-7.5 rounded-2xl transition hover:cursor-pointer">
        Log Out
      </button>
        </div>
      ) : 
      (
        <button className="text-black font-bold text-1xl bg-white text-center p-2.5 px-7.5 rounded-2xl hover:text-yellow-400 transition hover:cursor-pointer">
          Log In
        </button>
      )
      }

    </nav>
  );
};

export { Navbar };
