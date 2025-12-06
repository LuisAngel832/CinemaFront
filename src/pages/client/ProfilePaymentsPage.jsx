import { useState } from "react";
import UserHeader from "./componentsClient/UserHeader";
import ProfileTabs from "./componentsClient/ProfileTabs";
import AddCardModal from "./componentsClient/AddCardModal";

export default function ProfilePaymentsPage() {
  const [metodos, setMetodos] = useState([
    {
      id: 1,
      tipo: "Visa",
      terminacion: "4532",
      vence: "12/26",
      principal: true,
      color: "bg-indigo-600",
    },
    {
      id: 2,
      tipo: "Mastercard",
      terminacion: "8765",
      vence: "08/27",
      principal: false,
      color: "bg-red-500",
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);

  const handleSetPrimary = (id) => {
    setMetodos((prev) => prev.map((m) => ({ ...m, principal: m.id === id })));
  };

  const handleDelete = (id) => {
    setMetodos((prev) => prev.filter((m) => m.id !== id));
  };

  const handleAddCard = () => {
    setShowAddModal(true);
  };

  const handleSaveNewCard = (cardData) => {
    setMetodos((prev) => {
      const newId = Date.now();

      const newMetodo = {
        id: newId,
        tipo: cardData.brand,
        terminacion: cardData.number.slice(-4),
        vence: cardData.expiry,
        principal: prev.length === 0, 
        color:
          cardData.brand === "Visa"
            ? "bg-indigo-600"
            : cardData.brand === "Mastercard"
            ? "bg-red-500"
            : "bg-gray-700",
      };



      return [...prev, newMetodo];
    });

    setShowAddModal(false);
  };

  return (
    <main className="flex-1">
      <div className="max-w-4xl mx-auto px-8 pt-10 pb-10">
        <UserHeader fullName="Juan Pérez" email="juan.perez@email.com" />
        <ProfileTabs />

        <section className="bg-white border border-gray-200 rounded-2xl shadow-sm px-6 py-5">
          <h3 className="text-[1rem] font-semibold text-gray-900 m-0">
            Métodos de Pago
          </h3>
          <p className="mt-1 mb-4 text-[0.85rem] text-gray-500">
            Administra tus tarjetas y métodos de pago
          </p>

          <div className="flex flex-col gap-3">
            {metodos.map((t) => (
              <div
                key={t.id}
                className="flex items-center justify-between w-full px-4 py-3 rounded-xl border border-gray-200 bg-white"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`${t.color} w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg`}
                  >
                    ▢
                  </div>
                  <div className="text-sm">
                    <p className="m-0 font-semibold text-gray-900">
                      •••• •••• •••• {t.terminacion}
                    </p>
                    <p className="m-0 text-xs text-gray-500">
                      {t.tipo} - Vence {t.vence}
                    </p>
                  </div>
                </div>

                <div className="text-right text-xs">
                  {t.principal ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full border border-gray-300 text-[0.7rem] text-gray-700">
                      Principal
                    </span>
                  ) : (
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleSetPrimary(t.id)}
                        className="text-[0.7rem] text-purple-600 hover:text-purple-700"
                      >
                        Hacer principal
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(t.id)}
                        className="text-[0.7rem] text-red-500 hover:text-red-600"
                      >
                        Eliminar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddCard}
              className="mt-2 w-full text-xs sm:text-sm py-2 rounded-lg border border-gray-200 bg-[#f7f7fb] text-gray-600 hover:bg-gray-100 transition"
            >
              + Agregar nueva tarjeta
            </button>
          </div>
        </section>
      </div>

      {showAddModal && (
        <AddCardModal
          onClose={() => setShowAddModal(false)}
          onSave={handleSaveNewCard}
        />
      )}
    </main>
  );
}
