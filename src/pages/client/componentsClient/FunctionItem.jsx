import React from "react";
import { Link } from "react-router-dom";

const FunctionItem = ({ sala, hora, idioma }) => {
  return (
    <div
      className="
        w-full bg-white
        border border-[#ddd] rounded-[10px]
        px-4 py-[0.9rem]
        flex justify-between items-center
      "
    >
      <div className="flex items-center gap-[0.6rem]">
        <div className="text-[0.95rem] opacity-70">📍</div>
        <span className="text-[0.9rem]">{sala}</span>

        <div className="text-[0.95rem] opacity-70">⏱</div>
        <span className="text-[0.9rem]">{hora}</span>

        <div className="text-[0.95rem] opacity-70">🌐</div>
        <span className="text-[0.9rem]">{idioma}</span>
      </div>

      <Link
        to="/asientos"
        className="
          py-[0.45rem] px-[0.9rem]
          border border-[#333]
          rounded-[6px]
          bg-transparent
          cursor-pointer
          no-underline text-inherit
        "
      >
        Seleccionar
      </Link>
    </div>
  );
};

export default FunctionItem;
