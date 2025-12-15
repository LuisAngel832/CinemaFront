import { CiSearch } from "react-icons/ci";
import { FiPlusCircle } from "react-icons/fi";
import { PeliculaRow } from "./TableRow";

const PeliculasTable = ({
  movies,
  onEdit,
  onDelete,
  onAdd,
  search,
  onSearchChange,
  loading,
}) => {

  return (
    <section className="border border-[#ddd] rounded-[12px] bg-white p-6 mb-20">
      <h3 className="m-0 text-[1.25rem] mb-1">Catálogo de películas</h3>
      <p className="mt-[-0.2rem] mb-4 text-[0.9rem] opacity-70">
        Consulta y administra la información de las películas.
      </p>

      
      <div className="flex gap-2 mb-4">
        <input
          type="search"
          placeholder="Ej: Batman, terror, Español"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
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
        <button
          type="button"
          className="cursor-pointer w-[20%] rounded-lg bg-emerald-500 text-white flex items-center justify-center gap-1 p-2 hover:bg-emerald-600 text-sm"
        >
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
                Duracion
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wide text-xs">
                Estado
              </th>
              <th className="px-4 py-3 text-center font-semibold text-gray-600 uppercase tracking-wide text-xs">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-6 text-center text-gray-500 text-sm"
                >
                  Cargando películas...
                </td>
              </tr>
            ) : movies && movies.length > 0 ? (
              movies.map((movie) => (
                <PeliculaRow
                  key={movie.id}
                  movie={movie}
                  onEdit={() => onEdit(movie)}
                  onDelete={() => onDelete(movie)}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-6 text-center text-gray-500 text-sm"
                >
                  No hay películas disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Botón agregar */}
      <div className="flex w-full justify-end mt-4">
        <button
          className="
            bg-blue-500 rounded-xl px-4 py-2
            text-white flex items-center gap-2
            text-sm
            transition-colors hover:bg-blue-700 cursor-pointer
          "
          onClick={onAdd}
        >
          <FiPlusCircle />
          Agregar película
        </button>
      </div>
    </section>
  );
};

export default PeliculasTable;
