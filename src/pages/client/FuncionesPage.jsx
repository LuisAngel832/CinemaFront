import { Link } from "react-router-dom";
import FunctionItem from "../../components/FunctionItem";

const funcionesMock = [
  { sala: "Sala 1", hora: "15:00", idioma: "Español" },
  { sala: "Sala 2", hora: "18:30", idioma: "Inglés (Subtitulada)" },
  { sala: "Sala 3", hora: "21:00", idioma: "Español" }
];

export default function FuncionesPage() {
  return (
    <main
      className="
        flex-1 min-h-[80vh]
        py-[1.5rem] px-[2rem] pb-[3rem]
      "
    >
      <div className="max-w-[1200px] w-full mx-auto px-[2rem]">

        <Link
          to="/"
          className="
            bg-none border-none text-[0.95rem]
            mb-[1.2rem] cursor-pointer
            p-0 text-left block w-fit ml-0
          "
        >
          ← Volver a cartelera
        </Link>

        <h1
          className="
            mt-[1rem] mb-[1.5rem]
            text-left text-[2em]
          "
        >
          La Última Misión
        </h1>

        <p
          className="
            text-[0.9rem] mb-[1.5rem]
            opacity-80 text-left
          "
        >
          Selecciona una función
        </p>

        <section
          className="
            w-[95%] flex flex-col gap-[1rem]
          "
        >
          {funcionesMock.map((f, i) => (
            <FunctionItem key={i} {...f} />
          ))}
        </section>
      </div>
    </main>
  );
}
