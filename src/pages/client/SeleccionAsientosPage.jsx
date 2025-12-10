import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SeatGrid from "./componentsClient/SeatGrid";
import PurchaseSummary from "./componentsClient/PurchaseSummary";
import { getShowtimeDetails } from "../../api/UserApi.js";

const SEAT_ROWS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const SEAT_PRICE = 12;

export default function SeleccionAsientosPage() {
  const location = useLocation();
  const {
    idShowtime,
    movieTitle: initialMovieTitle,
    hall: initialHall,
    time: initialTime,
  } = location.state || {};

  const [movieTitle, setMovieTitle] = useState(initialMovieTitle || "");
  const [hall, setHall] = useState(initialHall || "");
  const [time, setTime] = useState(initialTime || "");
  const [occupiedSeats, setOccupiedSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const convertMatrixToSeats = (matrix) => {
    const result = [];
    for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
      for (let colIndex = 0; colIndex < matrix[rowIndex].length; colIndex++) {
        if (matrix[rowIndex][colIndex] !== 0) {
          const rowLetter = String.fromCharCode("A".charCodeAt(0) + rowIndex);
          const colNumber = colIndex + 1;
          result.push(`${rowLetter}${colNumber}`);
        }
      }
    }
    return result;
  };

  useEffect(() => {
    if (!idShowtime) return;
    const fetchDetails = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await getShowtimeDetails(idShowtime);
        const data = res.data;
        if (data) {
          setMovieTitle(data.movieTitle);
          setHall(data.roomName);
          const date = new Date(data.showtime);
          const formatted = date.toLocaleTimeString("es-MX", {
            hour: "2-digit",
            minute: "2-digit",
          });
          setTime(formatted);
          setOccupiedSeats(convertMatrixToSeats(data.seats));
        }
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar los asientos.");
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [idShowtime]);

  const handleToggleSeat = (seatCode) => {
    if (occupiedSeats.includes(seatCode)) return;
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
        <Link
          to="/funciones"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <span className="mr-1">←</span>
          Volver a funciones
        </Link>
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">
          Selecciona tus asientos
        </h1>
        {loading && <p className="text-gray-600 text-sm">Cargando asientos...</p>}
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {!loading && !error && (
          <div className="mt-4 grid grid-cols-1 lg:grid-cols-[1.7fr_1fr] gap-8 items-start w-full">
            <div className="lg:pl-16">
              <SeatGrid
                seatRows={SEAT_ROWS}
                occupiedSeats={occupiedSeats}
                selectedSeats={selectedSeats}
                onToggleSeat={handleToggleSeat}
                columns={8}
              />
            </div>
            <PurchaseSummary
              idShowtime={idShowtime}
              movieTitle={movieTitle}
              hall={hall}
              time={time}
              selectedSeats={selectedSeats}
              seatPrice={SEAT_PRICE}
              total={total}
            />
          </div>
        )}
      </div>
    </main>
  );
}
