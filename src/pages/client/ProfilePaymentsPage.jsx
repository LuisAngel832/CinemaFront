import { Link } from "react-router-dom";

export default function ProfilePaymentsPage() {
  const tarjetas = [
    {
      id: 1,
      tipo: "Visa",
      terminacion: "4532",
      vence: "12/26",
      principal: true
    },
    {
      id: 2,
      tipo: "Mastercard",
      terminacion: "8765",
      vence: "08/27",
      principal: false
    }
  ];

  return (
    <main className="max-w-[900px] mx-auto px-8 pt-6">

      {/* ---------------- HEADER ---------------- */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-[90px] h-[90px] rounded-full border-2 border-[#ccc] bg-[#eaeaea]"></div>

        <div>
          <h2 className="text-[1.5rem] m-0">Juan Pérez</h2>
        </div>
      </div>

      {/* ---------------- TABS ---------------- */}
      <div className="flex gap-4 mb-4">
        <Link
          to="/perfil"
          className="px-4 py-2 rounded-[20px] border border-[#ccc] bg-transparent"
        >
          Perfil
        </Link>

        <Link
          to="/historial"
          className="px-4 py-2 rounded-[20px] border border-[#ccc] bg-transparent"
        >
          Historial
        </Link>

        <Link
          to="/pagos"
          className="px-4 py-2 rounded-[20px] border-2 border-[#ccc] bg-transparent"
        >
          Pagos
        </Link>
      </div>

      {/* ---------------- LISTA DE TARJETAS ---------------- */}
      <section className="border border-[#ddd] rounded-[12px] bg-white p-6">
        <h3 className="text-[1.1rem] font-semibold m-0">Métodos de Pago</h3>

        <p className="mt-[-0.3rem] mb-4 text-[0.9rem] opacity-70 text-left">
          Administra tus tarjetas y métodos de pago
        </p>

        <div className="flex flex-col gap-4">

          {tarjetas.map((t) => (
            <div
              className="border border-[#ddd] rounded-[10px] bg-white px-4 py-4 flex items-center justify-between"
              key={t.id}
            >
              {/* Icono tarjeta */}
              <div className="w-[38px] h-[38px] rounded-[8px] border border-[#ccc] bg-[#eee] flex items-center justify-center mr-3">
                💳
              </div>

              {/* Info tarjeta */}
              <div className="flex-1">
                <p className="m-0 font-semibold">
                  •••• •••• •••• {t.terminacion}
                </p>
                <p className="m-0 opacity-75 text-[0.85rem]">
                  {t.tipo} – Vence {t.vence}
                </p>
              </div>

              {/* Acción */}
              <div className="text-right">
                {t.principal ? (
                  <span className="px-3 py-[0.2rem] border border-[#aaa] rounded-[16px] text-[0.75rem] inline-block">
                    Principal
                  </span>
                ) : (
                  <button className="bg-transparent border-none cursor-pointer underline text-[0.85rem]">
                    Eliminar
                  </button>
                )}
              </div>
            </div>
          ))}

        </div>

        {/* Agregar nueva tarjeta */}
        <button className="mt-4 w-full px-4 py-[0.7rem] border border-[#aaa] rounded-[8px] bg-transparent text-[0.9rem] cursor-pointer">
          + Agregar nueva tarjeta
        </button>

      </section>
    </main>
  );
}
