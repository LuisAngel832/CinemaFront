import { useState } from "react";
import { Link } from "react-router-dom";
import SeatGrid from "./componentsClient/SeatGrid";
import PurchaseSummary from "./componentsClient/PurchaseSummary";

// 🔧 Estos datos luego vendrán del API
const SEAT_ROWS = ["A", "B", "C", "D", "E", "F", "G", "H"];
const OCCUPIED_SEATS = ["A3", "A4", "A5", "C5", "C6", "C7", "D4", "E4", "H9"]; // demo
const MOVIE_INFO = {
  title: "La Última Misión",
  hall: "Sala 1",
  time: "15:00",
};
const SEAT_PRICE = 12;

export default function SeleccionAsientosPage() {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleToggleSeat = (seatCode) => {
    // No permitir seleccionar asientos ocupados
    if (OCCUPIED_SEATS.includes(seatCode)) return;

    setSelectedSeats((prev) =>
      prev.includes(seatCode)
        ? prev.filter((s) => s !== seatCode)
        : [...prev, seatCode]
    );
  };

  const total = selectedSeats.length * SEAT_PRICE;

  return (
    <main className="flex-1 min-h-[80vh] bg-[#f4f5fb]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10">
        {/* Volver */}
        <Link
          to="/funciones"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <span className="mr-1">←</span>
          Volver a funciones
        </Link>

        {/* Título */}
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">
          Selecciona tus asientos
        </h1>

        <div className="mt-4 grid grid-cols-1 lg:grid-cols-[1.7fr_1fr] gap-8 items-start w-full">
          <div className="lg:pl-16">
            <SeatGrid
              seatRows={SEAT_ROWS}
              occupiedSeats={OCCUPIED_SEATS}
              selectedSeats={selectedSeats}
              onToggleSeat={handleToggleSeat}
            />
          </div>

          <PurchaseSummary
            movieTitle={MOVIE_INFO.title}
            hall={MOVIE_INFO.hall}
            time={MOVIE_INFO.time}
            selectedSeats={selectedSeats}
            seatPrice={SEAT_PRICE}
            total={total}
          />
        </div>


      </div>
    </main>
  );
}

