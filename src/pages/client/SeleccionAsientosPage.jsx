import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SeatGrid from "./componentsClient/SeatGrid";
import PurchaseSummary from "./componentsClient/PurchaseSummary";
import { getShowtimeDetails } from "../../api/UserApi";

export default function SeleccionAsientosPage() {
  const location = useLocation();
  const {
    idShowtime,
    movieTitle: initTitle,
    hall: initHall,
    time: initTime,
  } = location.state || {};

  const [movieTitle, setMovieTitle] = useState(initTitle || "");
  const [hall, setHall] = useState(initHall || "");
  const [time, setTime] = useState(initTime || "");
  const [occupiedSeats, setOccupiedSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatRows, setSeatRows] = useState([]);
  const [columns, setColumns] = useState(8);
  const [seatPrice, setSeatPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const convertMatrixToCodes = (matrix) => {
    const result = [];
    if (!Array.isArray(matrix)) return result;
    for (let r = 0; r < matrix.length; r++) {
      for (let c = 0; c < matrix[r].length; c++) {
        if (matrix[r][c] !== 0) {
          const rowLetter = String.fromCharCode("A".charCodeAt(0) + r);
          result.push(`${rowLetter}${c + 1}`);
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
        const data = res?.data;

        if (data) {
          setMovieTitle(data.movieTitle ?? data.title ?? movieTitle);
          setHall(data.roomName ?? data.room ?? hall);

          const showtimeDate = data.showtime ?? data.dateTime ?? data.time;
          const date = showtimeDate ? new Date(showtimeDate) : null;
          setTime(
            date
              ? date.toLocaleTimeString("es-MX", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : ""
          );

          const backendPrice = data.priceSeats ?? data.seatPrice ?? data.price ?? 0;
          const numericPrice = Number(backendPrice);
          setSeatPrice(Number.isFinite(numericPrice) ? numericPrice : 0);

          const matrix = Array.isArray(data.seats) ? data.seats : [];
          const rowCount = matrix.length;
          const colCount = matrix[0]?.length || 0;

          setSeatRows(
            Array.from({ length: rowCount }, (_, i) =>
              String.fromCharCode("A".charCodeAt(0) + i)
            )
          );
          setColumns(colCount);

          setOccupiedSeats(convertMatrixToCodes(matrix));
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

  const handleToggleSeat = (code) => {
    if (occupiedSeats.includes(code)) return;
    setSelectedSeats((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  const total = Number(
    (selectedSeats.length * (Number(seatPrice) || 0)).toFixed(2)
  );

  return (
    <main className="flex-1 min-h-[80vh] bg-[#f4f5fb]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10">
        <Link
          to="/funciones"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <span className="mr-1">←</span>Volver a funciones
        </Link>

        <h1 className="text-3xl font-semibold text-gray-900 mb-2">
          Selecciona tus asientos
        </h1>

        {loading && <p className="text-gray-600 text-sm">Cargando asientos...</p>}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {!loading && !error && (
          <div className="mt-4 grid grid-cols-1 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] gap-8 items-start w-full">
            <div className="lg:pl-16 min-w-0">
              <SeatGrid
                seatRows={seatRows}
                occupiedSeats={occupiedSeats}
                selectedSeats={selectedSeats}
                onToggleSeat={handleToggleSeat}
                columns={columns}
              />
            </div>

            <div className="min-w-0">
              <PurchaseSummary
                idShowtime={idShowtime}
                movieTitle={movieTitle}
                hall={hall}
                time={time}
                selectedSeats={selectedSeats}
                seatPrice={seatPrice}
                total={total}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
