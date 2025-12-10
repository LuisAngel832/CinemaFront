import { useEffect, useState } from "react";
import MovieCard from "./componentsClient/MovieCard";
import { getMovies } from "../../api/UserApi.js";

export default function CarteleraPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await getMovies();
        const data = res.data || [];
        const adapted = data.map((m) => ({
          ...m,
          imageUrl: m.posterPath,
        }));
        setMovies(adapted);
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar la cartelera.");
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  return (
    <main className="flex-1 min-h-[80vh] bg-[#f4f5fb]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-semibold text-gray-900 mb-6">
          Cartelera
        </h1>
        {loading && <p className="text-center text-gray-600">Cargando cartelera...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && (
          <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
