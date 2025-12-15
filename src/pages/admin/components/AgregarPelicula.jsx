import { useState } from "react";
import { createMovie } from "../../../api/UserApi";

const AgregarPelicula = ({ onCancel, onCreated }) => {
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    durationTime: "", // "HH:mm"
    price: "",
    language: "",
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price"
          ? (value === "" ? "" : Number(value))
          : value,
    }));
  };

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    setFile(f || null);
  };

  const buildMovieBody = () => {
    let duration = null;

    if (formData.durationTime) {
      duration = `${formData.durationTime}:00`; // LocalTime "HH:mm:ss"
    }

    return {
      title: formData.title,
      genre: formData.genre,
      duration,
      price: Number(formData.price || 0),
      language: formData.language,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const movieBody = buildMovieBody();
      await createMovie(movieBody, file);

      onCreated && onCreated();
      onCancel();
    } catch (err) {
      console.error("Error al crear película", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="z-10 top-0 left-0 w-screen h-screen fixed bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl border border-black/10 p-8 w-[90%] max-w-md">
        <h2 className="text-2xl font-semibold mb-2">Agregar película</h2>
        <p className="text-black/70 mb-4">
          Registra una nueva película en el catálogo.
        </p>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Título */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Título
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="
                w-full rounded-xl p-2.5 px-3
                border border-gray-300
                bg-gray-50
                focus:outline-none
                focus:border-blue-600
                focus:ring-2 focus:ring-blue-500/50
                transition
              "
              placeholder="Ej: Capitán America, el primer vengador"
              required
            />
          </div>

          {/* Género */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Género
            </label>
            <input
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className="
                w-full rounded-xl p-2.5 px-3
                border border-gray-300
                bg-gray-50
                focus:outline-none
                focus:border-blue-600
                focus:ring-2 focus:ring-blue-500/50
                transition
              "
              placeholder="Ej: Acción, Terror, Comedia"
              required
            />
          </div>

          {/* Duración */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Duración (HH:mm)
            </label>
            <input
              type="text"
              name="durationTime"
              value={formData.durationTime}
              onChange={handleChange}
              className="
                w-full rounded-xl p-2.5 px-3
                border border-gray-300
                bg-gray-50
                focus:outline-none
                focus:border-blue-600
                focus:ring-2 focus:ring-blue-500/50
                transition
              "
              required
            />
          </div>

          {/* Precio */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Precio
            </label>
            <input
              type="number"
              name="price"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              className="
                w-full rounded-xl p-2.5 px-3
                border border-gray-300
                bg-gray-50
                focus:outline-none
                focus:border-blue-600
                focus:ring-2 focus:ring-blue-500/50
                transition
              "
              placeholder="Ej: 75.00"
              required
            />
          </div>

          {/* Idioma */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Idioma
            </label>
            <input
              type="text"
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="
                w-full rounded-xl p-2.5 px-3
                border border-gray-300
                bg-gray-50
                focus:outline-none
                focus:border-blue-600
                focus:ring-2 focus:ring-blue-500/50
                transition
              "
              placeholder="Ej: Español LAT"
              required
            />
          </div>

          {/* Póster */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1 ">
              Póster (opcional)
            </label>
            <input
              
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-xs text-blue-600 cursor-pointer "
            />
          </div>

          <div className="flex gap-3 mt-4">
            <button
              type="button"
              className="flex-1 px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition-colors font-semibold cursor-pointer"
              onClick={onCancel}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="
                flex-1 px-4 py-2 bg-black text-white rounded-lg
                hover:bg-gray-800 transition-colors font-semibold cursor-pointer
                disabled:opacity-60 disabled:cursor-not-allowed
              "
            >
              {loading ? "Guardando..." : "Agregar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgregarPelicula;
