import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import FunctionItem from "./componentsClient/FunctionItem";
import { getShowtimesByMovie } from "../../api/UserApi.js";

export default function FuncionesPage() {
  const location = useLocation();
  const { movieId, movieTitle } = location.state || {};

  const [showtimes, setShowtimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!movieId) return;
    const fetchShowtimes = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await getShowtimesByMovie(movieId);
        const data = res.data || [];
        const adapted = data.map((st) => {
          const date = new Date(st.showtime);
          const hora = date.toLocaleTimeString("es-MX", {
            hour: "2-digit",
            minute: "2-digit",
          });
          return {
            idShowtime: st.id,
            sala: st.roomName,
            hora,
          };
        });
        setShowtimes(adapted);
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar las funciones.");
      } finally {
        setLoading(false);
      }
    };
    fetchShowtimes();
  }, [movieId]);

  return (
    <main className="flex-1 min-h-[80vh] bg-[#f4f5fb]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/cartelera"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <span className="mr-1">←</span>
          Volver a cartelera
        </Link>
        <h1 className="text-3xl font-semibold text-gray-900 mb-1">
          {movieTitle || "Película"}
        </h1>
        <p className="text-sm text-gray-500 mb-6">Selecciona una función</p>
        {loading && (
          <p className="text-gray-600 text-sm">Cargando funciones...</p>
        )}
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {!loading && !error && (
          <section className="space-y-3">
            {showtimes.map((f) => (
              <FunctionItem
                key={f.idShowtime}
                idShowtime={f.idShowtime}
                sala={f.sala}
                hora={f.hora}
                movieTitle={movieTitle || ""}
              />
            ))}
            {showtimes.length === 0 && (
              <p className="text-sm text-gray-500">No hay funciones disponibles.</p>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
