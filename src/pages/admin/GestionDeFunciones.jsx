import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FiPlusCircle } from "react-icons/fi";

import TableRow from "./components/TableRow";
import CardEstadistica from "../../components/CardEstadistica";
import Editar from "./components/Editar";
import Eliminar from "./components/Eliminar";
import Agregar from "./components/AgregarFuncion";
import AgregarPelicula from "./components/AgregarPelicula";

const GestionDeFunciones = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isAddingPelicula, setIsAddingPelicula] = useState(false);

  const [activeTab, setActiveTab] = useState("funciones"); 

  const isDeletingFunc = () => setIsDeleting(!isDeleting);
  const isEditingFunc = () => setIsEditing(!isEditing);
  const isAddingFunc = () => setIsAdding(!isAdding);
  const isAddingPeliculaFunc = () => setIsAddingPelicula(!isAddingPelicula);


  return (
    <main className="max-w-[900px] mx-auto flex-1 px-8 pt-6 pb-10">
      {isEditing && <Editar setIsEditing={isEditingFunc} />}
      {isDeleting && <Eliminar setDelete={isDeletingFunc} />}
      {isAdding && <Agregar setIsAdding={isAddingFunc} />}
      {isAddingPelicula && <AgregarPelicula setIsAdding={isAddingPeliculaFunc} />}

      <header className="mb-6">
        <h1 className="text-[1.8rem] font-semibold mb-1">
          Panel de administración
        </h1>
        <p className="text-sm text-black/70">
          Gestiona las funciones y el catálogo de películas del cine.
        </p>

        <div className="flex gap-3 mt-4">
          <button
            type="button"
            onClick={() => setActiveTab("funciones")}
            className={`px-4 py-2 rounded-[20px] border text-sm transition-colors
              ${
                activeTab === "funciones"
                  ? "bg-black text-white border-black"
                  : "bg-transparent border-[#ccc] text-gray-700 hover:bg-gray-100"
              }
            `}
          >
            Gestión de funciones
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("peliculas")}
            className={`px-4 py-2 rounded-[20px] border text-sm transition-colors
              ${
                activeTab === "peliculas"
                  ? "bg-black text-white border-black"
                  : "bg-transparent border-[#ccc] text-gray-700 hover:bg-gray-100"
              }
            `}
          >
            Gestión de películas
          </button>
        </div>
      </header>

      {activeTab === "funciones" && (
        <>
          <div className="flex gap-2 mb-6">
            <input
              type="search"
              placeholder="Ej: Batman, Sala 1"
              className="
                w-[85%] rounded-xl p-2 pl-3
                border border-transparent
                bg-gray-100
                focus:outline-none
                focus:border-blue-600
                focus:ring-4 focus:ring-blue-500/60
                focus:ring-offset-0
                focus:shadow-lg
                transition duration-150
              "
            />

            <button className="cursor-pointer w-[15%] rounded-lg bg-emerald-500 text-white flex items-center justify-center gap-1 p-2 hover:bg-emerald-600 text-sm">
              <CiSearch className="text-2xl" />
              Buscar
            </button>
          </div>

          <section className="w-full overflow-hidden rounded-2xl shadow-md border border-gray-200 bg-white mb-6">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-center font-semibold text-gray-600 uppercase tracking-wide text-xs">
                    #
                  </th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-600 uppercase tracking-wide text-xs">
                    Película
                  </th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-600 uppercase tracking-wide text-xs">
                    Sala
                  </th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-600 uppercase tracking-wide text-xs">
                    Hora
                  </th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-600 uppercase tracking-wide text-xs">
                    Idioma
                  </th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-600 uppercase tracking-wide text-xs">
                    Tipo
                  </th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-600 uppercase tracking-wide text-xs">
                    Acciones
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                <TableRow setIsEditing={isEditingFunc} setDelete={isDeletingFunc} />
                <TableRow setIsEditing={isEditingFunc} setDelete={isDeletingFunc} />
                <TableRow setIsEditing={isEditingFunc} setDelete={isDeletingFunc} />
                <TableRow setIsEditing={isEditingFunc} setDelete={isDeletingFunc} />
              </tbody>
            </table>
          </section>

          <div className="flex w-full justify-end mb-6">
            <button
              className="
                bg-blue-500 rounded-xl px-4 py-2
                text-white flex items-center gap-2
                text-sm
                transition-colors hover:bg-blue-700 cursor-pointer
              "
              onClick={isAddingFunc}
            >
              <FiPlusCircle />
              Agregar función
            </button>
          </div>

          <div className="flex justify-between gap-4">
            <CardEstadistica title="Total funciones" value="25" />
            <CardEstadistica title="Salas activas" value="8" />
            <CardEstadistica title="Películas únicas" value="12" />
          </div>
        </>
      )}

      {activeTab === "peliculas" && (
        <section className="border border-[#ddd] rounded-[12px] bg-white p-6">
          <h3 className="m-0 text-[1.25rem] mb-1">Gestión de películas</h3>
          <p className="mt-[-0.2rem] mb-4 text-[0.9rem] opacity-70">
            Administra el catálogo de películas disponibles en el cine.
          </p>

          <div className="flex gap-2 mb-4">
            <input
              type="search"
              placeholder="Ej: Batman, terror, +13"
              className="
                w-[80%] rounded-xl p-2 pl-3
                border border-transparent
                bg-gray-100
                focus:outline-none
                focus:border-blue-600
                focus:ring-4 focus:ring-blue-500/60
                focus:ring-offset-0
                focus:shadow-lg
                transition duration-150
              "
            />
            <button className="cursor-pointer w-[20%] rounded-lg bg-emerald-500 text-white flex items-center justify-center gap-1 p-2 hover:bg-emerald-600 text-sm">
              <CiSearch className="text-2xl" />
              Buscar
            </button>
          </div>

          <div className="w-full overflow-hidden rounded-2xl shadow-sm border border-gray-200 bg-white">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wide text-xs">
                    Película
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wide text-xs">
                    Género
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wide text-xs">
                    Clasificación
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wide text-xs">
                    Duración
                  </th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-600 uppercase tracking-wide text-xs">
                    Estado
                  </th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-600 uppercase tracking-wide text-xs">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">Batman: El caballero de la noche</td>
                  <td className="px-4 py-3">Acción</td>
                  <td className="px-4 py-3">B15</td>
                  <td className="px-4 py-3">2h 32m</td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Activa
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button className="text-xs px-3 py-1 rounded-full border border-gray-300 hover:bg-gray-100 mr-2">
                      Editar
                    </button>
                    <button className="text-xs px-3 py-1 rounded-full border border-red-300 text-red-600 hover:bg-red-50">
                      Eliminar
                    </button>
                  </td>
                </tr>

                
              </tbody>
            </table>
          </div>

          <div className="flex w-full justify-end mt-4">
            <button
              className="
                bg-blue-500 rounded-xl px-4 py-2
                text-white flex items-center gap-2
                text-sm
                transition-colors hover:bg-blue-700 cursor-pointer
              "
              onClick={isAddingPeliculaFunc}
            >
              <FiPlusCircle />
              Agregar película
            </button>
          </div>
        </section>
      )}
    </main>
  );
};

export default GestionDeFunciones;
