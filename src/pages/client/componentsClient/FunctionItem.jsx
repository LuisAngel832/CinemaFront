import { Link } from "react-router-dom";

const FunctionItem = ({ idShowtime, sala, hora, movieTitle }) => {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-xl px-5 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 shadow-sm">
      <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-base">📍</span>
          <span className="font-medium">{sala}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-base">⏱</span>
          <span>{hora}</span>
        </div>
      </div>

      <Link
        to="/asientos"
        state={{
          idShowtime,
          movieTitle,
          hall: sala,
          time: hora,
        }}
        className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-white"
      >
        Seleccionar
      </Link>
    </div>
  );
};

export default FunctionItem;
