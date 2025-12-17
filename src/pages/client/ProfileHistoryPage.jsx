import { useEffect, useState } from "react";
import UserHeader from "./componentsClient/UserHeader";
import ProfileTabs from "./componentsClient/ProfileTabs";
import { getMyPurchases, getUserProfile } from "../../api/UserApi";
import { useAuth } from "../../context/AuthContext.jsx";

export default function ProfileHistoryPage() {
  const { user } = useAuth();

  const [fullName, setFullName] = useState(user?.fullName || "");
  const [email, setEmail] = useState(user?.email || "");

  const [compras, setCompras] = useState([]);
  const [loading, setLoading] = useState(true);
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
    const fetchHistory = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await getMyPurchases();
        const raw = res?.data;
        const list = Array.isArray(raw) ? raw : raw?.data || raw?.content || [];

        const adapted = list.map((p) => ({
          pelicula: p.movieTitle ?? p.title ?? "",
          sala: p.roomName ?? p.room ?? "",
          asientos: p.seats ? String(p.seats).split(", ").filter((s) => s) : [],
          folio: p.folio ?? p.idPurchase ?? p.id ?? "",
        }));

        setCompras(adapted);
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar tu historial.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <main className="flex-1">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 pt-10 pb-10">
        <UserHeader fullName={fullName} email={email} />
        <ProfileTabs />

        <section className="w-full bg-white border border-gray-200 rounded-2xl shadow-sm px-8 py-6">
          <h3 className="text-[1rem] font-semibold text-gray-900 m-0">
            Historial de Compras
          </h3>
          <p className="mt-1 mb-5 text-[0.85rem] text-gray-500">
            Tus últimas compras y reservaciones
          </p>

          {loading && <p className="text-sm text-gray-600">Cargando historial...</p>}
          {error && <p className="text-sm text-red-500">{error}</p>}

          {!loading && !error && (
            <div className="space-y-4">
              {compras.map((item, i) => (
                <article
                  key={i}
                  className="flex items-center justify-between px-5 py-4 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-lg bg-pink-50 border border-pink-200 flex items-center justify-center text-pink-500 text-lg">
                      🎟️
                    </div>
                    <div className="space-y-1 text-sm">
                      <p className="m-0 font-semibold text-gray-900">{item.pelicula}</p>
                      <p className="m-0 text-[0.8rem] text-gray-500">
                        Sala:{" "}
                        <span className="font-medium text-gray-800">{item.sala}</span>
                      </p>
                      <p className="m-0 text-[0.8rem] text-gray-500">
                        Asientos:{" "}
                        <span className="font-medium text-gray-800">
                          {item.asientos.join(", ")}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="text-right text-xs">
                    <span className="inline-block px-3 py-1 rounded-full bg-purple-50 text-[0.7rem] font-medium text-purple-600 mb-1">
                      Folio: {item.folio}
                    </span>
                  </div>
                </article>
              ))}

              {compras.length === 0 && (
                <p className="text-sm text-gray-600">No tienes compras registradas.</p>
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
