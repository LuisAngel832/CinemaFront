import React from "react";
import { Link } from "react-router-dom";

const PurchaseSummary = () => {
  return (
    <div className="border border-[#ddd] bg-white rounded-[10px] py-4 px-5">
      <h3 className="mt-0 mb-4 text-[1.1rem] font-semibold">
        Resumen de compra
      </h3>

      <div className="mb-4">
        <p><strong>Película</strong></p>
        <p>La Última Misión</p>
      </div>

      <div className="mb-4 grid grid-cols-[70px_1fr] gap-y-[0.3rem]">
        <p><strong>Sala</strong></p>
        <p>Sala 1</p>

        <p><strong>Hora</strong></p>
        <p>15:00</p>
      </div>

      <div className="mb-4">
        <p><strong>Asientos seleccionados</strong></p>
        <p>Ninguno</p>
      </div>

      <div className="flex justify-between mt-4 mb-4 font-semibold">
        <span>0 × $12</span>
        <span className="total-amount">$0</span>
      </div>

      <Link
        to="/pago"
        className="w-full block text-center py-[0.6rem] rounded-[6px] border border-[#333] bg-transparent"
      >
        Confirmar Compra
      </Link>
    </div>
  );
};

export default PurchaseSummary;
