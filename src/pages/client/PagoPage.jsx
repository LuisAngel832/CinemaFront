import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ModalCompraExitosa from "./componentsClient/ModalCompraExitosa";

export default function PagoPage() {
  const [showModal, setShowModal] = useState(false);

  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  // 👇 Datos que vienen desde PurchaseSummary (selección de asientos)
  const location = useLocation();
  const {
    total = 0,
    seatPrice = 0,
    selectedSeats = [],
    movieTitle = "Película",
    hall = "",
    time = "",
  } = location.state || {};

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔧 Aquí luego integras tu API de pagos, por ejemplo:
    // await fetch("/api/pagos", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     total,
    //     seatPrice,
    //     seats: selectedSeats,
    //     movieTitle,
    //     hall,
    //     time,
    //     cardNumber,
    //     cardName,
    //     expiry,
    //     cvv,
    //   }),
    // });

    setShowModal(true);
  };

  return (
    <main className="flex-1 min-h-[80vh] bg-[#f4f5fb]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10">
        <Link
          to="/asientos"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <span className="mr-1">←</span>
          Volver a asientos
        </Link>

        <h1 className="text-3xl font-semibold text-gray-900 mb-4">
          Realizar pago
        </h1>

        <form
          onSubmit={handleSubmit}
          className="mt-2 w-full bg-white border border-gray-200 rounded-2xl shadow-sm px-8 py-7"
        >
          {/* Header */}
          <h3 className="text-[1.05rem] font-semibold text-gray-900 mb-4">
            Método de pago
          </h3>

          <p className="text-sm text-gray-500 mb-3">
            Selecciona un método
          </p>

          {/* Opción tarjeta (única funcional) */}
          <div
            className="
              flex items-center justify-between
              w-full mb-6
              rounded-lg border border-purple-500
              bg-purple-50
              px-4 py-3
            "
          >
            <div className="flex items-center gap-3">
              <span
                className="
                  w-3.5 h-3.5 rounded-full
                  border border-purple-500 bg-purple-500
                "
              />
              <span className="text-sm text-gray-900">
                Tarjeta de crédito/débito
              </span>
            </div>
          </div>

          {/* FORMULARIO TARJETA */}
          <div className="space-y-4">
            {/* Número de tarjeta */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Número de tarjeta
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-[#fafafa] text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-400"
                placeholder="XXXX XXXX XXXX XXXX"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
            </div>

            {/* Nombre en la tarjeta */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Nombre en la tarjeta
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-[#fafafa] text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-400"
                placeholder="Como aparece en la tarjeta"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
              />
            </div>

            {/* Fecha / CVV */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Fecha de expiración
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-[#fafafa] text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-400"
                  placeholder="MM/AA"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  CVV
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-[#fafafa] text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-400"
                  placeholder="***"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* TOTAL */}
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200 text-sm text-gray-800">
            <span>Total a pagar:</span>
            <strong className="text-base">${total}</strong>
          </div>

          {/* BOTÓN PAGAR */}
          <button
            type="submit"
            className="
              mt-5 w-full py-3
              rounded-lg
              bg-purple-600
              text-white text-sm font-medium
              hover:bg-purple-700
              transition
              focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-1 focus:ring-offset-white
            "
          >
            Pagar ahora
          </button>
        </form>

        {showModal && (
          <ModalCompraExitosa onClose={() => setShowModal(false)} />
        )}
      </div>
    </main>
  );
}
