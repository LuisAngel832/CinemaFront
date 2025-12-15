import {TableRow} from "./TableRow";

const FuncionesTable = ({ onDelete, onEdit, showtimes }) => {
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
                        <th className="px-4 py-3 text-center font-semibold text-gray-600 uppercase tracking-wide text-xs">Tipo</th>
                        <th className="px-4 py-3 text-center font-semibold text-gray-600 uppercase tracking-wide text-xs">Acciones</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                    {showtimes && showtimes.length > 0 ? (
                        showtimes.map((showtime) => (
                            <TableRow
                                key={showtime.id}          
                                showtime={showtime}
                                onEdit={() => onEdit(showtime)}
                                onDelete={() => onDelete(showtime)}
                            />
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="px-4 py-3 text-center text-gray-500">
                                No hay funciones disponibles.
                            </td>
                        </tr>
                    )
                    }


                </tbody>
            </table>
        </section>
    );
};

export default FuncionesTable;