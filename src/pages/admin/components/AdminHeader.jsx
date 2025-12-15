import { useState } from "react";

const AdminHeader = ({activeTab,setActiveTab}) => {

    return (
        <header className="mb-6">
            <h1 className="text-[1.8rem] font-semibold mb-1">Panel de administración</h1>
            <p className="text-sm text-black/70">Gestiona las funciones y el catálogo de películas del cine.</p>

            <div className="flex gap-3 mt-4">
                <button
                    type="button"
                    onClick={() => setActiveTab("funciones")}
                    className={`px-4 py-2 rounded-[20px] border text-sm transition-colors ${
                        activeTab === "funciones"
                            ? "bg-black text-white border-black"
                            : "bg-transparent border-[#ccc] text-gray-700 hover:bg-gray-100"
                    }`}
                >
                    Gestión de funciones
                </button>

                <button
                    type="button"
                    onClick={() => setActiveTab("peliculas")}
                    className={`px-4 py-2 rounded-[20px] border text-sm transition-colors ${
                        activeTab === "peliculas"
                            ? "bg-black text-white border-black"
                            : "bg-transparent border-[#ccc] text-gray-700 hover:bg-gray-100"
                    }`}
                >
                    Gestión de películas
                </button>
            </div>
        </header>
    );
};

export default AdminHeader;