import React, { useState } from "react";

export default function AddCardModal({ onClose, onSave }) {
  const [holder, setHolder] = useState("");
  const [number, setNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!holder.trim()) {
      newErrors.holder = "Ingresa el nombre tal como aparece en la tarjeta.";
    }

    const cleanNumber = number.replace(/\D/g, "");
    if (!/^\d{16}$/.test(cleanNumber)) {
      newErrors.number = "El número de tarjeta debe tener 16 dígitos.";
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const cleanNumber = number.replace(/\D/g, "");

    onSave({
      holder: holder.trim(),
      number: cleanNumber,
      expiry,
      cvv,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h2 className="m-0 text-lg font-semibold text-gray-900">
              Agregar nueva tarjeta
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              Completa los datos de tu tarjeta para guardarla como método de pago.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">
              Nombre en la tarjeta
            </label>
            <input
              className="
                w-full rounded-md border border-gray-300
                bg-[#fafafa] px-3 py-2 text-sm
                outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-400
              "
              placeholder="Como aparece en la tarjeta"
              value={holder}
              onChange={(e) => setHolder(e.target.value)}
            />
            {errors.holder && (
              <p className="mt-1 text-xs text-red-500">
                {errors.holder}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">
              Número de tarjeta
            </label>
            <input
              className="
                w-full rounded-md border border-gray-300
                bg-[#fafafa] px-3 py-2 text-sm
                outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-400
              "
              placeholder="XXXX XXXX XXXX XXXX"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
            {errors.number && (
              <p className="mt-1 text-xs text-red-500">
                {errors.number}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-600">
                Fecha de expiración
              </label>
              <input
                className="
                  w-full rounded-md border border-gray-300
                  bg-[#fafafa] px-3 py-2 text-sm
                  outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-400
                "
                placeholder="MM/AA"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
              />
              {errors.expiry && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.expiry}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-600">
                CVV
              </label>
              <input
                className="
                  w-full rounded-md border border-gray-300
                  bg-[#fafafa] px-3 py-2 text-sm
                  outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-400
                "
                placeholder="***"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
              />
              {errors.cvv && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.cvv}
                </p>
              )}
            </div>
          </div>

          <div className="mt-3 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="
                rounded-md border border-gray-300
                px-4 py-2 text-xs font-medium text-gray-700
                hover:bg-gray-50
              "
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="
                rounded-md bg-purple-600
                px-4 py-2 text-xs font-medium text-white
                hover:bg-purple-700
              "
            >
              Guardar tarjeta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
