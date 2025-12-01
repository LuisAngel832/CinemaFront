import { Link } from "react-router-dom";

const PurchaseSummary = ({
  movieTitle,
  hall,
  time,
  selectedSeats,
  seatPrice,
  total,
}) => {
  const count = selectedSeats.length;
  const seatsText = count === 0 ? "Ninguno" : selectedSeats.join(", ");
  const disabled = count === 0;

  return (
    <aside className="bg-white border border-gray-200 rounded-2xl shadow-md py-5 px-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 rounded-full border border-emerald-500 flex items-center justify-center text-emerald-500 text-sm">
          ✔
        </div>
        <h3 className="m-0 text-[1rem] font-semibold text-gray-900">
          Resumen de compra
        </h3>
      </div>

      <hr className="border-gray-200 mb-4" />

      {/* Detalles */}
      <div className="space-y-3 text-sm text-gray-700">
        <div>
          <p className="font-semibold mb-0.5">Película</p>
          <p className="text-gray-600">{movieTitle}</p>
        </div>

        <div className="grid grid-cols-[70px_1fr] gap-y-1">
          <p className="font-semibold">Sala</p>
          <p className="text-gray-600">{hall}</p>

          <p className="font-semibold">Hora</p>
          <p className="text-gray-600">{time}</p>
        </div>

        <div>
          <p className="font-semibold mb-0.5">
            Asientos seleccionados
          </p>
          <p className="text-gray-600 text-sm">
            {seatsText}
          </p>
        </div>
      </div>

      {/* Totales */}
      <div className="flex justify-between items-center mt-6 mb-4 text-sm font-medium text-gray-700">
        <span>
          {count} × ${seatPrice}
        </span>
        <span className="text-lg font-semibold text-gray-900">
          ${total}
        </span>
      </div>

      {/* Botón */}
      <Link
        to={disabled ? "#" : "/pago"}
        state={
          disabled
            ? null
            : {
                total,
                seatPrice,
                selectedSeats,
                movieTitle,
                hall,
                time,
              }
        }
        className={`
          w-full block text-center py-2.5 rounded-lg text-sm font-medium
          ${disabled
            ? "bg-purple-300 cursor-not-allowed text-white"
            : "bg-purple-600 hover:bg-purple-700 text-white"}
        `}
        onClick={(e) => {
          if (disabled) e.preventDefault();
        }}
      >
        Confirmar compra
      </Link>
    </aside>
  );
};

export default PurchaseSummary;
