import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header
      className="
        flex items-center justify-between
        py-3 px-8
        border-b border-[#ddd]
        bg-white
      "
    >
      {/* LEFT */}
      <div className="flex items-center gap-2">
        <div className="w-[28px] h-[28px] rounded-[4px] border border-[#aaa]" />
        <span className="font-semibold text-[1.8em]">CinePlus</span>
      </div>

      {/* LINKS */}
      <nav className="flex gap-4">
        <Link
          to="/"
          className="
            bg-transparent border-none py-1 px-2 cursor-pointer
            border-b-2 border-[#333]
          "
        >
          Cartelera
        </Link>

        <Link
          to="/perfil"
          className="bg-transparent border-none py-1 px-2 cursor-pointer"
        >
          Mi cuenta
        </Link>
      </nav>

      {/* RIGHT */}
      <div className="flex items-center">
        <button
          className="
            py-[0.35rem] px-[0.9rem]
            rounded-full border border-[#333]
            bg-transparent cursor-pointer
          "
        >
          Login
        </button>
      </div>
    </header>
  );
};

export default Navbar;
