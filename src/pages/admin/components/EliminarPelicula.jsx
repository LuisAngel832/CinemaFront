import { useState } from "react";

const EliminarPelicula = ({ movie, onCancel, onConfirm, loading }) => {
  if (!movie) return null;
  
  const [submitError, setSubmitError] = useState(null);

  const handleDelete = async () => {
    setSubmitError(null);
    try {
      await onConfirm();
    } catch (error) {
      console.error("Error al intentar eliminar la película:", error);
      setSubmitError("Hubo un error al intentar eliminar la película. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div className="z-10 top-0 left-0 w-screen h-screen fixed bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl border border-black/10 p-6 w-[90%] max-w-sm">
        <h2 className="text-xl font-semibold mb-2 text-red-600">
          Eliminar película
        </h2>
        <p className="text-sm text-black/80 mb-3">
          ¿Estás seguro de que quieres eliminar la siguiente película?
        </p>

        <div className="mb-4 p-3 rounded-xl bg-gray-50 border border-gray-200">
          <p className="text-sm font-semibold">
            {movie.title || "Película sin título"}
          </p>
          {movie.genre && (
            <p className="text-xs text-gray-600 mt-1">
              Género: <span className="font-medium">{movie.genre}</span>
            </p>
          )}
          {movie.duration && (
            <p className="text-xs text-gray-600">
              Duración: <span className="font-medium">{movie.duration} min</span>
            </p>
          )}
        </div>

        {submitError && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-200 mb-4">
              {submitError}
            </div>
        )}

        <p className="text-xs text-gray-500 mb-4">
          Esta acción eliminará la película del catálogo. Revísalo antes de
          confirmar.
        </p>

        <div className="flex gap-3">
          <button
            type="button"
            className="flex-1 px-4 py-2 bg-gray-200 text-black rounded-lg hover:bg-gray-300 transition-colors text-sm font-semibold cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            onClick={onCancel}
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="
              flex-1 px-4 py-2 bg-red-600 text-white rounded-lg transition-colors text-sm font-semibold cursor-pointer
              hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed
            "
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Eliminando..." : "Eliminar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EliminarPelicula;