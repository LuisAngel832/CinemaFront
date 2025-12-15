import { useEffect, useState } from "react";
import { getInitialTime } from "../../../utils/dataFormat";
import { updateRoom, getAllMovies, getAllRooms } from "../../../api/UserApi";

const Editar = ({ showtime, onCancel, onUpdated }) => {
  const [movies, setMovies] = useState([]);
  const [rooms, setRooms] = useState([]);

  const [formData, setFormData] = useState({
    movieId: showtime?.movie?.id ?? "",
    roomId: showtime?.room?.idRoom ?? "",
    time: getInitialTime(showtime) || "",
    language: showtime?.languaje || showtime?.language || "", // nuevo
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllMovies()
      .then((res) => {
        const data = res.data || res || [];
        const safe = Array.isArray(data) ? data : [];
        setMovies(safe);
      })
      .catch((err) => {
        console.error("Error al cargar películas", err);
      });

    getAllRooms()
      .then((res) => {
        const data = res.data || res || [];
        const safe = Array.isArray(data) ? data : [];
        setRooms(safe);
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
    const baseDate = showtime?.showtime
      ? new Date(showtime.showtime)
      : new Date();

    if (formData.time) {
      const [hours, minutes] = formData.time.split(":");
      baseDate.setHours(Number(hours), Number(minutes), 0, 0);
    }

    return {
      room: Number(formData.roomId),
      movie: Number(formData.movieId),
      showtime: baseDate.toISOString(),
      // 👇 va al final, como pediste, con la llave que dijiste
      language  : formData.language || null,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const payload = buildPayload();

      await updateRoom(showtime.id, payload);

      if (onUpdated) onUpdated();
      onCancel();
    } catch (err) {
      console.error("Error al actualizar función", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="z-10 top-0 left-0 w-screen h-screen fixed bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl border border-black/10 p-8 w-[90%] max-w-md">
        <h2 className="text-2xl font-semibold mb-2">Editar función</h2>
        <p className="text-black/70 mb-4">
          Modifica los datos de la función seleccionada.
        </p>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Película */}
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
            >
              <option value="">Selecciona una película</option>
              {movies.map((movie) => (
                <option key={movie.id} value={movie.id}>
                  {movie.title}
                </option>
              ))}
            </select>
          </div>

          {/* Sala */}
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
            >
              <option value="">Selecciona una sala</option>
              {rooms.map((room) => (
                <option key={room.idRoom} value={room.idRoom}>
                  {room.name}
                </option>
              ))}
            </select>
          </div>

          {/* Hora */}
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
            />
          </div>

          {/* Idioma / Lenguaje */}
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
            >
              <option value="">Selecciona un idioma</option>
              <option value="ESPAÑOL_LAT">Español LAT</option>
              <option value="ESPAÑOL_SUB">Español SUB</option>
              <option value="INGLES_SUB">Inglés SUB</option>
              <option value="INGLES_LAT">Inglés LAT</option>
            </select>
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
              {loading ? "Actualizando..." : "Actualizar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Editar;
