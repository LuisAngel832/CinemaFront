import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function ProfileTabs() {
  const location = useLocation();
  const current = location.pathname;

  const baseClasses = "flex-1 text-center text-sm font-medium py-2 px-6 transition";
  const activeClasses = "bg-white border border-purple-600 text-purple-700 shadow-sm rounded-full";
  const inactiveClasses = "text-gray-600 hover:text-gray-800";

  return (
    <div className="mb-6">
      <div className="w-full rounded-full bg-[#f1eff7] overflow-hidden flex">
        <Link
          to="/perfil"
          className={`${baseClasses} ${current === "/perfil" ? activeClasses : inactiveClasses}`}
        >
          Perfil
        </Link>
        <Link
          to="/historial"
          className={`${baseClasses} ${current === "/historial" ? activeClasses : inactiveClasses}`}
        >
          Historial
        </Link>
        <Link
          to="/pagos"
          className={`${baseClasses} ${current === "/pagos" ? activeClasses : inactiveClasses}`}
        >
          Pagos
        </Link>
      </div>
    </div>
  );
}
