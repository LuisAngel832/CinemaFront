import React from "react";
import { useNavigate } from "react-router-dom";

const ModalCompraExitosa = ({
  onClose,
  movieTitle = "La Última Misión",
  hall = "1",
  seats = ["E9"],
  folio = "CP - 2025 - 0856",
  total = 12,
}) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    if (onClose) onClose();   
    navigate("/");            
  };

  return (
    <div
      className="
        fixed inset-0 bg-[rgba(0,0,0,0.35)]
        flex items-center justify-center
        z-50
      "
    >
      <div
        className="
          w-[380px] bg-white
          rounded-[16px] border border-[#ddd]
          shadow-xl
          relative
          overflow-hidden
        "
      >
        <div className="h-1.5 w-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-emerald-400" />

        <button
          onClick={onClose}
          className="
            absolute right-4 top-4
            text-gray-400 hover:text-gray-600
            text-lg
          "
        >
          ✕
        </button>

        <div className="p-6 pb-5">
          <div className="flex justify-center mb-4">
            <div
              className="
                w-[60px] h-[60px]
                rounded-full
                bg-emerald-50
                border border-emerald-400
                flex items-center justify-center
                text-[1.7rem] text-emerald-500
              "
            >
              ✔
            </div>
          </div>

          <h2 className="text-center m-0 text-[1.25rem] font-semibold text-gray-900">
            ¡Compra exitosa!
          </h2>

          <p className="text-center text-[0.9rem] text-gray-600 mt-1 mb-4">
            Tu compra ha sido confirmada correctamente.
          </p>

          <hr className="my-3" />

          <div className="mb-3 text-[0.9rem] space-y-1.5">
            <p className="my-[0.15rem]">
              <strong className="text-gray-800">Película:</strong>{" "}
              <span className="text-gray-700">{movieTitle}</span>
            </p>
            <p className="my-[0.15rem] flex items-center gap-1.5">
              <strong className="text-gray-800">Sala:</strong>
              <span className="inline-flex items-center px-2 py-[0.1rem] rounded-full bg-gray-100 text-gray-700 text-[0.8rem]">
                {hall}
              </span>
            </p>
            <p className="my-[0.15rem]">
              <strong className="text-gray-800">Asientos:</strong>{" "}
              <span className="text-gray-700">
                {Array.isArray(seats) ? seats.join(", ") : seats}
              </span>
            </p>
            <p className="my-[0.15rem]">
              <strong className="text-gray-800">Folio:</strong>{" "}
              <span className="text-gray-700">{folio}</span>
            </p>
          </div>

          <div className="mt-2 mb-4">
            <div
              className="
                flex items-center justify-between
                px-3 py-2.5
                rounded-[10px]
                bg-purple-50
              "
            >
              <span className="text-[0.9rem] text-gray-700">
                Total pagado
              </span>
              <span className="text-[1.1rem] font-semibold text-purple-700">
                ${total}
              </span>
            </div>
          </div>

          <p className="text-center text-[0.85rem] mb-[1.2rem] text-gray-500">
            El boleto ha sido enviado a tu correo electrónico.
          </p>

          <div className="flex flex-col gap-2">
            <button
              onClick={handleGoHome}
              className="
                w-full py-[0.55rem]
                border border-gray-300
                rounded-[8px]
                bg-white
                text-[0.9rem] text-gray-800
                hover:bg-gray-50
                transition
              "
            >
              Volver a cartelera
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCompraExitosa;