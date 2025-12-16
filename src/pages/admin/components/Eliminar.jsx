import { useState } from "react";

const Eliminar = ({ onCancel, onConfirm, loading }) => {
  const [submitError, setSubmitError] = useState(null);

  const handleDelete = async () => {
    setSubmitError(null);
    try {
      await onConfirm();
    } catch (error) {
      console.error("Error al intentar eliminar:", error);
      setSubmitError("Hubo un error al intentar eliminar la función. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div className="z-10 top-0 left-0 w-screen h-screen fixed bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-[90%] max-w-md">
        <h2 className="text-2xl font-semibold mb-2">Eliminar Función</h2>
        <p className="text-black/70 mb-4">
          ¿Estás seguro de que deseas eliminar esta función? Esta acción no se
          puede deshacer.
        </p>
        
        {submitError && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-200 mb-4">
            {submitError}
          </div>
        )}

        <div className="flex gap-3 mt-6">
          <button
            className="flex-1 px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition-colors font-semibold cursor-pointer"
            onClick={onCancel}
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            className="
              flex-1 px-4 py-2 bg-red-600 text-white rounded-lg transition-colors font-semibold cursor-pointer
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

export default Eliminar;