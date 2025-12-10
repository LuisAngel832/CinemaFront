import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ModalCompraExitosa from "./componentsClient/ModalCompraExitosa";
import {
  getCards,
  saveCard,
  createPurchase,
} from "../../api/UserApi.js";

export default function PagoPage() {
  const [showModal, setShowModal] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [saveCardFlag, setSaveCardFlag] = useState(false);
  const [errors, setErrors] = useState({});
  const [savedCards, setSavedCards] = useState([]);
  const [suggestedCard, setSuggestedCard] = useState(null);

  const location = useLocation();
  const {
    idShowtime,
    total = 0,
    seatPrice = 0,
    selectedSeats = [],
    movieTitle = "Película",
    hall = "",
    time = "",
  } = location.state || {};

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await getCards();
        setSavedCards(res.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCards();
  }, []);

  const formatCardNumber = (digits) => {
    return digits.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim();
  };

  const handleCardNumberChange = (e) => {
    const value = e.target.value;
    setCardNumber(value);
    const clean = value.replace(/\D/g, "");
    if (clean.length >= 4) {
      const found = savedCards.find((card) =>
        card.cardNumber.startsWith(clean)
      );
      setSuggestedCard(found || null);
    } else {
      setSuggestedCard(null);
    }
  };

  const handleApplySuggestedCard = () => {
    if (!suggestedCard) return;
    setCardNumber(formatCardNumber(suggestedCard.cardNumber));
    setCardName(suggestedCard.cardOwner);
    setExpiry(suggestedCard.expirationDate);
    setSuggestedCard(null);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!cardName.trim()) {
      newErrors.cardName = "Ingresa el nombre tal como aparece en la tarjeta.";
    }
    const cleanNumber = cardNumber.replace(/\D/g, "");
    if (!/^\d{16}$/.test(cleanNumber)) {
      newErrors.cardNumber = "El número de tarjeta debe tener 16 dígitos.";
    }
    if (!/^\d{3}$/.test(cvv)) {
      newErrors.cvv = "El CVV debe tener 3 dígitos.";
    }
    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      newErrors.expiry = "Usa el formato MM/AA.";
    } else {
      const [mmStr, yyStr] = expiry.split("/");
      const mm = Number(mmStr);
      const yy = Number(yyStr);
      if (Number.isNaN(mm) || Number.isNaN(yy) || mm < 1 || mm > 12) {
        newErrors.expiry = "La fecha de expiración no es válida.";
      } else {
        const now = new Date();
        const currentYear = now.getFullYear() % 100;
        const currentMonth = now.getMonth() + 1;
        if (yy < currentYear || (yy === currentYear && mm < currentMonth)) {
          newErrors.expiry = "La tarjeta ya está vencida.";
        }
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    const cleanNumber = cardNumber.replace(/\D/g, "");
    try {
      if (saveCardFlag) {
        await saveCard({
          cardNumber: cleanNumber,
          cardOwner: cardName.trim(),
          expirationDate: expiry,
        });
      }
      const seatsConverted = selectedSeats.map((code) => {
        const row = code.charCodeAt(0) - "A".charCodeAt(0);
        const col = parseInt(code.slice(1)) - 1;
        return [row, col];
      });
      await createPurchase({ idShowtime, seats: seatsConverted });
      setShowModal(true);
    } catch (err) {
      console.error(err);
      setErrors((prev) => ({ ...prev, submit: "No se pudo procesar tu pago." }));
    }
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
        <h1 className="text-3xl font-semibold text-gray-900 mb-4">Realizar pago</h1>
        <form
          onSubmit={handleSubmit}
          className="mt-2 w-full bg-white border border-gray-200 rounded-2xl shadow-sm px-8 py-7"
        >
          <h3 className="text-[1.05rem] font-semibold text-gray-900 mb-4">Método de pago</h3>
          <p className="text-sm text-gray-500 mb-3">Selecciona un método</p>
          <div className="flex items-center justify-between w-full mb-6 rounded-lg border border-purple-500 bg-purple-50 px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="w-3.5 h-3.5 rounded-full border border-purple-500 bg-purple-500" />
              <span className="text-sm text-gray-900">Tarjeta de crédito/débito</span>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Número de tarjeta</label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-[#fafafa] text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-400"
                placeholder="XXXX XXXX XXXX XXXX"
                value={cardNumber}
                onChange={handleCardNumberChange}
              />
              {errors.cardNumber && <p className="mt-1 text-xs text-red-500">{errors.cardNumber}</p>}
              {suggestedCard && (
                <div className="mt-2 flex items-center justify-between rounded-md bg-purple-50 px-3 py-2">
                  <p className="m-0 text-[0.75rem] text-gray-700">¿Usar tarjeta terminada en {suggestedCard.cardNumber.slice(-4)}?</p>
                  <button
                    type="button"
                    className="ml-3 text-[0.75rem] font-medium text-purple-600 hover:text-purple-700"
                    onClick={handleApplySuggestedCard}
                  >
                    Usar
                  </button>
                </div>
              )}
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Nombre en la tarjeta</label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-[#fafafa] text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-400"
                placeholder="Como aparece en la tarjeta"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
              />
              {errors.cardName && <p className="mt-1 text-xs text-red-500">{errors.cardName}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Fecha de expiración</label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-[#fafafa] text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-400"
                  placeholder="MM/AA"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                />
                {errors.expiry && <p className="mt-1 text-xs text-red-500">{errors.expiry}</p>}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">CVV</label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-[#fafafa] text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-400"
                  placeholder="***"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                />
                {errors.cvv && <p className="mt-1 text-xs text-red-500">{errors.cvv}</p>}
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <input
              id="save-card"
              type="checkbox"
              className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              checked={saveCardFlag}
              onChange={(e) => setSaveCardFlag(e.target.checked)}
            />
            <label htmlFor="save-card" className="text-xs text-gray-600 select-none">
              Guardar esta tarjeta para futuros pagos
            </label>
          </div>
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200 text-sm text-gray-800">
            <span>Total a pagar:</span>
            <strong className="text-base">${total}</strong>
          </div>
          <button
            type="submit"
            className="mt-5 w-full py-3 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-1 focus:ring-offset-white"
          >
            Pagar ahora
          </button>
        </form>
        {errors.submit && (
          <p className="mt-2 text-xs text-red-500">{errors.submit}</p>
        )}
        {showModal && (
          <ModalCompraExitosa
            onClose={() => setShowModal(false)}
            movieTitle={movieTitle}
            hall={hall}
            seats={selectedSeats}
            folio={""}
            total={total}
          />
        )}
      </div>
    </main>
  );
}
