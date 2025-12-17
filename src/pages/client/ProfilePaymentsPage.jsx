import { useEffect, useState } from "react";
import UserHeader from "./componentsClient/UserHeader";
import ProfileTabs from "./componentsClient/ProfileTabs";
import AddCardModal from "./componentsClient/AddCardModal";
import { getCards, saveCard, deleteCard, getUserProfile } from "../../api/UserApi";
import { useAuth } from "../../context/AuthContext.jsx";

export default function ProfilePaymentsPage() {
  const { user } = useAuth();

  const [fullName, setFullName] = useState(user?.fullName || "");
  const [email, setEmail] = useState(user?.email || "");

  const [metodos, setMetodos] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user?.fullName) setFullName(user.fullName);
    if (user?.email) setEmail(user.email);
  }, [user]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user?.fullName && user?.email) return;
      try {
        const res = await getUserProfile();
        const data = res?.data;
        if (data) {
          setFullName(data.fullName || "");
          setEmail(data.email || "");
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setError("");
        const res = await getCards();
        const raw = res?.data;
        const list = Array.isArray(raw) ? raw : raw?.data || raw?.content || [];

        const adapted = list.map((c) => ({
          id: c.idCard ?? c.id_card ?? c.id,
          terminacion: String(c.cardNumber || "").slice(-4),
          vence: c.expirationDate ?? c.expiry ?? "",
        }));

        setMetodos(adapted);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar tus tarjetas.");
      }
    };

    fetchCards();
  }, []);

  const handleDelete = (id) => {
    deleteCard(id)
      .then(() => setMetodos((prev) => prev.filter((m) => m.id !== id)))
      .catch((err) => {
        console.error(err);
        setError("No se pudo eliminar la tarjeta.");
      });
  };

  const handleSaveNewCard = (cardData) => {
    saveCard({
      cardNumber: cardData.number,
      cardOwner: cardData.holder,
      expirationDate: cardData.expiry,
    })
      .then(() => getCards())
      .then((res) => {
        const raw = res?.data;
        const list = Array.isArray(raw) ? raw : raw?.data || raw?.content || [];

        const adapted = list.map((c) => ({
          id: c.idCard ?? c.id_card ?? c.id,
          terminacion: String(c.cardNumber || "").slice(-4),
          vence: c.expirationDate ?? c.expiry ?? "",
        }));

        setMetodos(adapted);
        setShowAddModal(false);
      })
      .catch((err) => {
        console.error(err);
        setError("No se pudo guardar la tarjeta.");
      });
  };

  const getColorClass = (index) => {
    const colors = ["bg-indigo-600", "bg-gray-700", "bg-purple-600", "bg-slate-500"];
    return colors[index % colors.length];
  };

  return (
    <main className="flex-1">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 pt-10 pb-10">
        <UserHeader fullName={fullName} email={email} />
        <ProfileTabs />

        <section className="bg-white border border-gray-200 rounded-2xl shadow-sm px-6 py-5">
          <h3 className="text-[1rem] font-semibold text-gray-900 m-0">Métodos de Pago</h3>
          <p className="mt-1 mb-4 text-[0.85rem] text-gray-500">
            Administra tus tarjetas y métodos de pago
          </p>

          <div className="flex flex-col gap-3">
            {metodos.map((t, index) => (
              <div
                key={t.id}
                className="flex items-center justify-between w-full px-4 py-3 rounded-xl border border-gray-200 bg-white"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`${getColorClass(index)} w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg`}
                  >
                    ▢
                  </div>
                  <div className="text-sm">
                    <p className="m-0 font-semibold text-gray-900">
                      •••• •••• •••• {t.terminacion}
                    </p>
                    <p className="m-0 text-xs text-gray-500">Vence {t.vence}</p>
                  </div>
                </div>

                <div className="text-right text-xs">
                  <button
                    type="button"
                    onClick={() => handleDelete(t.id)}
                    className="text-[0.7rem] text-red-500 hover:text-red-600"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="mt-2 w-full text-xs sm:text-sm py-2 rounded-lg border border-gray-200 bg-[#f7f7fb] text-gray-600 hover:bg-gray-100 transition"
            >
              + Agregar nueva tarjeta
            </button>

            {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
          </div>
        </section>
      </div>

      {showAddModal && (
        <AddCardModal onClose={() => setShowAddModal(false)} onSave={handleSaveNewCard} />
      )}
    </main>
  );
}
