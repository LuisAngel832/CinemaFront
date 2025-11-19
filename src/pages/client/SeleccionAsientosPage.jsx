import SeatGrid from "../../components/SeatGrid";
import PurchaseSummary from "../../components/PurchaseSummary";
import { Link } from "react-router-dom";

export default function SeleccionAsientosPage() {
  return (
    <main
      className="
        flex-1
        min-h-[80vh]
        px-[2rem] pt-[1.5rem] pb-[3rem]
        pr-[3rem]      /* page--seats */
      "
    >
      <Link
        to="/funciones"
        className="
          text-[0.95rem]
          mb-[1.2rem]
          cursor-pointer
          p-0
          block
          text-left
          w-fit
        "
      >
        ← Volver a funciones
      </Link>

      <h1
        className="
          text-left
          text-[2em]
          mt-[1rem]
          mb-[1.5rem]
        "
      >
        Selecciona tus asientos
      </h1>

      <div
        className="
          mt-[1.2rem]
          grid
          grid-cols-[1fr_320px]
          gap-[2rem]
          items-start
          w-full
        "
      >
        <SeatGrid />
        <PurchaseSummary />
      </div>
    </main>
  );
}
