import { Link } from "react-router-dom";

const FunctionItem = ({ sala, hora, idioma, asientosDisponibles }) => {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-xl px-5 py-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-6 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-base">📍</span>
          <span className="font-medium">{sala}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-base">⏱</span>
          <span>{hora}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-base">🌐</span>
          <span>{idioma}</span>
        </div>

      </div>

      <Link
        to="/asientos"
        className="inline-flex items-center justify-center px-5 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-white"
      >
        Seleccionar
      </Link>
    </div>
  );
};

export default FunctionItem;
