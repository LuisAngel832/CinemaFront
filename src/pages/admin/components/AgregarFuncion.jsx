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

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllMovies()
      .then((res) => {
        const data = res.data || res || [];
        setMovies(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Error al cargar películas", err);
      });

    getAllRooms()
      .then((res) => {
        const data = res.data || res || [];
        setRooms(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Error al cargar salas", err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
    try {
      setLoading(true);

      const payload = buildPayload();
      await createShowtime(payload);

      onCreated && onCreated(); 
      loadingShowtimes()
      setIsAdding();            
    } catch (err) {
      console.error("Error al crear función", err);
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

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
         
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Película
            </label>
            <select
              name="movieId"
              value={formData.movieId}
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
            >
              <option value="">Selecciona una película</option>
              {movies.map((movie) => (
                <option key={movie.id} value={movie.id}>
                  {movie.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Sala
            </label>
            <select
              name="roomId"
              value={formData.roomId}
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
            >
              <option value="">Selecciona una sala</option>
              {rooms.map((room) => (
                <option key={room.idRoom} value={room.idRoom}>
                  {room.name} {/* Ej: SALA 1 */}
                </option>
              ))}
            </select>
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

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Idioma
            </label>
            <select
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
              required
            >
              <option value="">Selecciona un idioma</option>
              <option value="ESPAÑOL_LAT">Español LAT</option>
              <option value="ESPAÑOL_SUB">Español SUB</option>
              <option value="INGLES_SUB">Inglés SUB</option>
              <option value="INGLES_LAT">Inglés LAT</option>
            </select>
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
