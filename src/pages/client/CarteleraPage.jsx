import MovieCard from "../../components/MovieCard";

const mockMovies = [
  { id: 1, title: "La Última Misión", genre: "Acción", duration: 142 },
  { id: 2, title: "Viaje Interestelar", genre: "Ciencia Ficción", duration: 165 },
  { id: 3, title: "El Despertar", genre: "Terror", duration: 118 },
  { id: 4, title: "Corazones Perdidos", genre: "Romance/Drama", duration: 128 },
  { id: 5, title: "Risas Sin Fin", genre: "Comedia", duration: 95 },
  { id: 6, title: "El Tesoro Perdido", genre: "Aventura", duration: 134 }
];

export default function CarteleraPage() {
  return (
    <main
      className="
        flex-1 min-h-[80vh]
        py-[1.5rem] px-[2rem] pb-[3rem]
      "
    >
      <div
        className="
          max-w-[1200px] w-full mx-auto px-[2rem]
        "
      >
        <h1
          className="
            mt-[1rem] mb-[1.5rem]
            text-left text-[2em]
          "
        >
          Cartelera
        </h1>

        <section
          className="
            grid gap-[1.5rem]
            grid-cols-[repeat(auto-fill,minmax(260px,1fr))]
          "
        >
          {mockMovies.map(movie => (
            <MovieCard key={movie.id} {...movie} />
          ))}
        </section>
      </div>
    </main>
  );
}
