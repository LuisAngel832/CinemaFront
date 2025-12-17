import { CiEdit, CiTrash } from "react-icons/ci";

// Función auxiliar para formatear la hora
const formatTime = (isoString) => {
  if (!isoString) return "--:--";
  const date = new Date(isoString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const FuncionesTable = ({ onDelete, onEdit, showtimes, loading }) => {
  return (
    <section className="w-full overflow-hidden rounded-2xl shadow-md border border-gray-200 bg-white mb-6">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-center font-semibold text-gray-600 uppercase tracking-wide text-xs">#</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wide text-xs">Película</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wide text-xs">Sala</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wide text-xs">Hora</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wide text-xs">Idioma</th>
            <th className="px-4 py-3 text-center font-semibold text-gray-600 uppercase tracking-wide text-xs">Acciones</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {loading ? (
            <tr>
              <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                <div className="flex justify-center items-center gap-2">
                   <div className="w-4 h-4 border-2 border-gray-300 border-t-black rounded-full animate-spin"></div>
                   Cargando funciones...
                </div>
              </td>
            </tr>
          ) : showtimes && showtimes.length > 0 ? (
            showtimes.map((showtime, index) => (
              <tr key={showtime.id || index} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-center text-gray-500 font-medium">
                  {index + 1}
                </td>
                <td className="px-4 py-3 text-gray-800 font-medium">
                  {showtime.movie?.title || "Sin título"}
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {showtime.room?.name || "Sin Sala"}
                </td>
                <td className="px-4 py-3 text-gray-600">
                  <span className="bg-gray-100 px-2 py-1 rounded text-xs font-semibold">
                    {formatTime(showtime.showtime)}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {showtime.languaje || showtime.language || "-"}
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex justify-center items-center gap-2">
                    <button
                      onClick={() => onEdit(showtime)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                      title="Editar"
                    >
                      <CiEdit className="text-xl" />
                    </button>
                    <button
                      onClick={() => onDelete(showtime)}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="Eliminar"
                    >
                      <CiTrash className="text-xl" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                No se encontraron funciones disponibles.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
};

export default FuncionesTable;