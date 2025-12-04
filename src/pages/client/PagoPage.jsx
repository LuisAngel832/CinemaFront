import { useState } from "react";
import { Link } from "react-router-dom";
import ModalCompraExitosa from "./componentsClient/ModalCompraExitosa";

export default function PagoPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <main className="flex-1 max-w-[680px] mx-auto pt-4 px-8">
      <div className="w-full">
        
        <Link 
          to="/asientos" 
          className="bg-none border-none text-[0.95rem] mb-5 cursor-pointer p-0 block w-fit text-left"
        >
          ← Volver a asientos
        </Link>

        <h1 className="text-left text-[2em] my-4 mb-6">
          Realizar pago
        </h1>

        <div className="mt-6 p-7 border border-gray-300 bg-white rounded-xl w-full">
          
          <h3 className="mt-0 mb-4 text-[1.25rem] font-semibold">
            Método de pago
          </h3>

          <p className="text-[0.9rem] mb-2">
            Tarjeta de crédito/débito
          </p>

          <div className="flex items-center gap-3 p-3 border-2 border-gray-400 rounded-lg mb-5">
            <div className="w-[14px] h-[14px] rounded-full border-2 border-black" />
            <span>Tarjeta de crédito/débito</span>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[0.85rem] mt-1">Número de tarjeta</label>
            <input 
              className="w-full p-2 border border-gray-300 rounded-md bg-[#fafafa]" 
              placeholder="XXXX XXXX XXXX XXXX" 
            />

            <label className="text-[0.85rem] mt-2">Nombre en la tarjeta</label>
            <input 
              className="w-full p-2 border border-gray-300 rounded-md bg-[#fafafa]" 
              placeholder="Como aparece en la tarjeta" 
            />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[0.85rem]">Fecha expiración</label>
                <input 
                  className="w-full p-2 border border-gray-300 rounded-md bg-[#fafafa]" 
                  placeholder="MM/AA" 
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

          <div className="flex justify-between mt-5 text-[1rem] font-normal">
            <span>Total a pagar:</span>
            <strong>$12</strong>
          </div>
          <button
            className="mt-5 w-full p-3 border border-black rounded-md bg-none cursor-pointer"
            onClick={() => setShowModal(true)}
          >
            Pagar ahora
          </button>
        </div>

        {showModal && (
          <ModalCompraExitosa onClose={() => setShowModal(false)} />
        )}
      </div>
    </main>
  );
}
