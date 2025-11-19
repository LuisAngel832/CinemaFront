import React from "react";

const ModalCompraExitosa = ({ onClose }) => {
  return (
    <div
      className="
        fixed inset-0 bg-[rgba(0,0,0,0.25)]
        flex items-center justify-center
      "
    >
      <div
        className="
          w-[360px] bg-white
          p-[1.5rem] px-[1.7rem]
          rounded-[12px] border border-[#ccc]
          relative
        "
      >
        <button
          onClick={onClose}
          className="
            absolute right-4 top-4
            bg-none border-none
            cursor-pointer
          "
        >
          ✕
        </button>

        <div
          className="
            w-[55px] h-[55px]
            rounded-full border-2 border-[#222]
            flex items-center justify-center
            mx-auto mb-4
            text-[1.5rem]
          "
        >
          ✔
        </div>

        <h2 className="text-center m-0">¡Compra Exitosa!</h2>

        <p className="text-center text-[0.9rem] opacity-80 mb-4">
          Tu compra ha sido confirmada correctamente.
        </p>

        <hr className="my-4" />

        <div className="mb-4">
          <p className="text-[0.9rem] my-[0.3rem]">
            <strong>Película:</strong> La Última Misión
          </p>
          <p className="text-[0.9rem] my-[0.3rem]">
            <strong>Sala:</strong> 1
          </p>
          <p className="text-[0.9rem] my-[0.3rem]">
            <strong>Asiento:</strong> E9
          </p>
          <p className="text-[0.9rem] my-[0.3rem]">
            <strong>Folio:</strong> CP - 2025 - 0856
          </p>
          <p className="text-[0.9rem] my-[0.3rem]">
            <strong>Total:</strong> $12
          </p>
        </div>

        <div
          className="
            w-[120px] h-[120px]
            border border-dashed border-[#999]
            mx-auto
            flex items-center justify-center
            text-[0.7rem]
            my-4
          "
        >
          ███ █ ███ █ ▒▒▒
        </div>

        <p className="text-center text-[0.85rem] mb-[1.4rem] opacity-80">
          El boleto ha sido enviado a tu correo
        </p>

        <button
          onClick={onClose}
          className="
            w-full py-[0.6rem]
            border border-[#222]
            rounded-[6px]
            bg-none cursor-pointer
          "
        >
          Volver al inicio
        </button>

      </div>
    </div>
  );
};

export default ModalCompraExitosa;
