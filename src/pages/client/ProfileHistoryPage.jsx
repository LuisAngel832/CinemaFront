import UserHeader from "./componentsClient/UserHeader";
import ProfileTabs from "./componentsClient/ProfileTabs";

export default function ProfileHistoryPage() {
  const compras = [
    {
      titulo: "La Última Misión",
      sala: "Sala 2",
      fecha: "2025-10-05",
      hora: "18:30",
      asientos: ["C5", "C6"],
      total: "$24",
      boletos: 2,
      estado: "completado",
    },
    {
      titulo: "Viaje Interestelar",
      sala: "Sala 1",
      fecha: "2025-09-28",
      hora: "16:00",
      asientos: ["D3", "D4", "D5"],
      total: "$36",
      boletos: 3,
      estado: "completado",
    },
    {
      titulo: "El Despertar",
      sala: "Sala 3",
      fecha: "2025-09-15",
      hora: "21:00",
      asientos: ["B2", "B3"],
      total: "$24",
      boletos: 2,
      estado: "completado",
    },
  ];

  return (
    <main className="flex-1">
      <div className="max-w-4xl mx-auto px-8 pt-10 pb-10">
        <UserHeader fullName="Juan Pérez" email="juan.perez@email.com" />
        <ProfileTabs />
        <section className="w-full bg-white border border-gray-200 rounded-2xl shadow-sm px-8 py-6">
          <h3 className="text-[1rem] font-semibold text-gray-900 m-0">Historial de Compras</h3>
          <p className="mt-1 mb-5 text-[0.85rem] text-gray-500">
            Tus últimas compras y reservaciones
          </p>
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
                    <p className="m-0 font-semibold text-gray-900">{item.titulo}</p>
                    <p className="m-0 text-[0.8rem] text-gray-500">
                      {item.sala} • {item.fecha} • {item.hora}
                    </p>
                    <p className="m-0 text-[0.8rem] text-gray-500">
                      Asientos: <span className="font-medium text-gray-800">{item.asientos.join(", ")}</span>
                    </p>
                  </div>
                </div>
                <div className="text-right text-xs">
                  <span className="inline-block px-3 py-1 rounded-full bg-purple-50 text-[0.7rem] font-medium text-purple-600 mb-1 capitalize">
                    {item.estado}
                  </span>
                  <p className="m-0 text-base font-semibold text-gray-900">{item.total}</p>
                  <p className="m-0 text-[0.75rem] text-gray-500">
                    {item.boletos} boleto(s)
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
