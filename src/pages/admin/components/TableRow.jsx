import { MdOutlineEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { formatShowtime } from "../../../utils/dataFormat.js";



export const TableRow = ({ showtime, onEdit, onDelete }) => {

    return (
        <tr className="border border-gray-300 hover:bg-gray-100 transition-colors rounded-2xl text-center">
            <th scope="row" className=" px-4 py-3 font-semibold">{showtime.id}</th>
            <td className="px-4 py-3">{showtime.movieTitle}</td>
            <td className="px-4 py-3">{showtime.roomName}</td>
            <td className="px-4 py-3">{formatShowtime(showtime.showtime)}</td>
            <td className="px-4 py-3">{showtime.movieLanguage}</td>
            <td className="px-4 py-3">{showtime.roomType}</td>
            <td className=" px-4 py-3 flex justify-around w-full">
                <button className="px-3 py-1 flex items-center rounded cursor-pointer" onClick={onEdit}> <MdOutlineEdit />Editar</button>
                <button className="px-3 py-1 flex items-center rounded cursor-pointer" onClick={onDelete}> <MdDeleteOutline />Eliminar</button>
            </td>

        </tr>
    );
}



export const PeliculaRow = ({ movie, onEdit, onDelete }) => {
    const formatDuration = (minutes) => {
        if (!minutes && minutes !== 0) return "-";
        const h = Math.floor(minutes / 60);
        const m = minutes % 60;
        if (h === 0) return `${m} min`;
        return `${h}h ${m}min`;
    };

    return (
        <tr className="hover:bg-gray-50 transition-colors">
            <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                    {movie.posterPath && (
                        <img
                            src={movie.posterPath}
                            alt={movie.title}
                            className="w-10 h-14 object-cover rounded-md border border-gray-200"
                        />
                    )}
                    <div className="flex flex-col">
                        <span className="font-medium text-sm">{movie.title}</span>
                    </div>
                </div>
            </td>
            <td className="px-4 py-3 text-sm text-gray-700">{movie.genre}</td>
            <td className="px-4 py-3 text-sm text-gray-700">
                {formatDuration(movie.duration)}
            </td>
            <td className="px-4 py-3 text-sm text-gray-700">
                {movie.active ? "Activo" : "Inactivo"}
            </td>
            <td className="px-4 py-3 text-center">
                <button
                    className="text-xs px-3 py-1 rounded-full border border-gray-300 hover:bg-gray-100 mr-2"
                    onClick={onEdit}
                >
                    Editar
                </button>
                <button
                    className="text-xs px-3 py-1 rounded-full border border-red-300 text-red-600 hover:bg-red-50"
                    onClick={onDelete}
                >
                    Eliminar
                </button>
            </td>
        </tr>
    );
};




