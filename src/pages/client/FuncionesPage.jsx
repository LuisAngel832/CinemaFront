import { Link } from "react-router-dom";
import FunctionItem from "./componentsClient/FunctionItem";

const funcionesMock = [
  {
    id: 1,
    sala: "Sala 1",
    hora: "15:00",
    idioma: "Español",
    asientosDisponibles: 45,
  },
  {
    id: 2,
    sala: "Sala 2",
    hora: "18:30",
    idioma: "Inglés (Subtitulada)",
    asientosDisponibles: 60,
  },
  {
    id: 3,
    sala: "Sala 3",
    hora: "21:00",
    idioma: "Español",
    asientosDisponibles: 32,
  },
];

const movieTitle = "La Última Misión";

export default function FuncionesPage() {
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
          {movieTitle}
        </h1>

        <p className="text-sm text-gray-500 mb-6">
          Selecciona una función
        </p>

        <section className="space-y-3">
          {funcionesMock.map((f) => (
            <FunctionItem
              key={f.id}
              sala={f.sala}
              hora={f.hora}
              idioma={f.idioma}
              asientosDisponibles={f.asientosDisponibles}
            />
          ))}
        </section>
      </div>
    </main>
  );
}
