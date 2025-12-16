import { useEffect, useState } from "react";
import { getAllMovies, getAllRooms, createShowtime } from "../../../api/UserApi";

const Agregar = ({ setIsAdding, onCreated, loadingShowtimes }) => {
  const [movies, setMovies] = useState([]);
  const [rooms, setRooms] = useState([]);

  const [formData, setFormData] = useState({
    movieId: "",
    roomId: "",
    time: "",
    language: "",
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllMovies()
      .then((res) => {
        const data = res.data || res || [];
        setMovies(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error(err));

    getAllRooms()
      .then((res) => {
        const data = res.data || res || [];
        setRooms(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error(err));
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!formData.movieId) newErrors.movieId = "La película es obligatoria.";
    if (!formData.roomId) newErrors.roomId = "La sala es obligatoria.";
    if (!formData.time) newErrors.time = "La hora es obligatoria.";
    if (!formData.language) newErrors.language = "El idioma es obligatorio.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
    if (apiError) setApiError(null);
  };

  const buildPayload = () => {
    const baseDate = new Date();
    if (formData.time) {
      const [hours, minutes] = formData.time.split(":");
      baseDate.setHours(Number(hours), Number(minutes), 0, 0);
    }

    return {
      room: Number(formData.roomId),
      movie: Number(formData.movieId),
      showtime: baseDate.toISOString(),
      language: formData.language || null,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);
    
    if (!validate()) return;

    try {
      setLoading(true);
      const payload = buildPayload();
      await createShowtime(payload);

      onCreated && onCreated();
      loadingShowtimes();
      setIsAdding();
    } catch (err) {
      console.error(err);
      const message = err.response?.data?.message || "Ocurrió un error al guardar la función. Inténtalo de nuevo.";
      setApiError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsAdding();
  };

  return (
    <div className="z-10 top-0 left-0 w-screen h-screen fixed bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl border border-black/10 p-8 w-[90%] max-w-md">
        <h2 className="text-2xl font-semibold mb-2">Agregar función</h2>
        <p className="text-black/70 mb-4">
          Agrega una nueva función al calendario de proyecciones.
        </p>

        {apiError && (
          <div className="mb-4 p-3 rounded-lg bg-red-100 border border-red-200 text-red-700 text-sm">
            {apiError}
          </div>
        )}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Película
            </label>
            <select
              name="movieId"
              value={formData.movieId}
              onChange={handleChange}
              className={`
                w-full rounded-xl p-2.5 px-3
                border ${errors.movieId ? "border-red-500" : "border-gray-300"}
                bg-gray-50
                focus:outline-none
                focus:border-blue-600
                focus:ring-2 focus:ring-blue-500/50
                transition
              `}
            >
              <option value="">Selecciona una película</option>
              {movies.map((movie) => (
                <option key={movie.id} value={movie.id}>
                  {movie.title}
                </option>
              ))}
            </select>
            {errors.movieId && <p className="text-red-500 text-xs mt-1">{errors.movieId}</p>}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Sala
            </label>
            <select
              name="roomId"
              value={formData.roomId}
              onChange={handleChange}
              className={`
                w-full rounded-xl p-2.5 px-3
                border ${errors.roomId ? "border-red-500" : "border-gray-300"}
                bg-gray-50
                focus:outline-none
                focus:border-blue-600
                focus:ring-2 focus:ring-blue-500/50
                transition
              `}
            >
              <option value="">Selecciona una sala</option>
              {rooms.map((room) => (
                <option key={room.idRoom} value={room.idRoom}>
                  {room.name}
                </option>
              ))}
            </select>
            {errors.roomId && <p className="text-red-500 text-xs mt-1">{errors.roomId}</p>}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Hora
            </label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className={`
                w-full rounded-xl p-2.5 px-3
                border ${errors.time ? "border-red-500" : "border-gray-300"}
                bg-gray-50
                focus:outline-none
                focus:border-blue-600
                focus:ring-2 focus:ring-blue-500/50
                transition
              `}
            />
            {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Idioma
            </label>
            <select
              name="language"
              value={formData.language}
              onChange={handleChange}
              className={`
                w-full rounded-xl p-2.5 px-3
                border ${errors.language ? "border-red-500" : "border-gray-300"}
                bg-gray-50
                focus:outline-none
                focus:border-blue-600
                focus:ring-2 focus:ring-blue-500/50
                transition
              `}
            >
              <option value="">Selecciona un idioma</option>
              <option value="ESPAÑOL_LAT">Español LAT</option>
              <option value="ESPAÑOL_SUB">Español SUB</option>
              <option value="INGLES_SUB">Inglés SUB</option>
              <option value="INGLES_LAT">Inglés LAT</option>
            </select>
            {errors.language && <p className="text-red-500 text-xs mt-1">{errors.language}</p>}
          </div>

          <div className="flex gap-3 mt-6">
            <button
              type="button"
              className="flex-1 px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition-colors font-semibold cursor-pointer"
              onClick={handleCancel}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="
                flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg
                hover:bg-blue-600 transition-colors font-semibold cursor-pointer
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

export default Agregar;