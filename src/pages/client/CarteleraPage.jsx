import MovieCard from "./componentsClient/MovieCard";

const mockMovies = [
  {
    id: 1,
    title: "La Última Misión",
    genre: "Acción",
    duration: 142,
    imageUrl: "https://images.pexels.com/photos/799137/pexels-photo-799137.jpeg?auto=compress&cs=tinysrgb&w=1200"
  },
  {
    id: 2,
    title: "Viaje Interestelar",
    genre: "Ciencia Ficción",
    duration: 165,
    imageUrl: "https://images.pexels.com/photos/73910/pexels-photo-73910.jpeg?auto=compress&cs=tinysrgb&w=1200"
  },
  {
    id: 3,
    title: "El Despertar",
    genre: "Terror",
    duration: 118,
    imageUrl: "https://images.pexels.com/photos/799443/pexels-photo-799443.jpeg?auto=compress&cs=tinysrgb&w=1200"
  },
  {
    id: 4,
    title: "Corazones Perdidos",
    genre: "Romance/Drama",
    duration: 128,
    imageUrl: "https://images.pexels.com/photos/3693901/pexels-photo-3693901.jpeg?auto=compress&cs=tinysrgb&w=1200"
  },
  {
    id: 5,
    title: "Risas Sin Fin",
    genre: "Comedia",
    duration: 95,
    imageUrl: "https://images.pexels.com/photos/4009401/pexels-photo-4009401.jpeg?auto=compress&cs=tinysrgb&w=1200"
  },
  {
    id: 6,
    title: "El Tesoro Perdido",
    genre: "Aventura",
    duration: 134,
    imageUrl: "https://images.pexels.com/photos/6898859/pexels-photo-6898859.jpeg?auto=compress&cs=tinysrgb&w=1200"
  }
];

export default function CarteleraPage() {
  return (
    <main className="flex-1 min-h-[80vh] bg-[#f4f5fb]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-semibold text-gray-900 mb-6">
          Cartelera
        </h1>

        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </section>
      </div>
    </main>
  );
}
