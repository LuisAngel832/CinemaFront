import { Link } from "react-router-dom";

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
      estado: "completado"
    },
    {
      titulo: "Viaje Interestelar",
      sala: "Sala 1",
      fecha: "2025-09-28",
      hora: "16:00",
      asientos: ["D3", "D4", "D5"],
      total: "$36",
      boletos: 3,
      estado: "completado"
    },
    {
      titulo: "El Despertar",
      sala: "Sala 3",
      fecha: "2025-09-15",
      hora: "21:00",
      asientos: ["B2", "B3"],
      total: "$24",
      boletos: 2,
      estado: "completado"
    }
  ];

  return (
    <main className="max-w-[900px] mx-auto flex-1 pt-6 px-8">

      <div className="flex items-center gap-4 mb-8">
        <div className="w-[90px] h-[90px] rounded-full border-2 border-[#ccc] bg-[#eaeaea]" />
        <div>
          <h2 className="m-0 text-[1.5rem] font-semibold">Juan Pérez</h2>
        </div>
      </div>

      <div className="flex gap-4 mb-4">
        <Link 
          to="/perfil" 
          className="px-4 py-2 border border-[#ccc] rounded-[20px] bg-transparent"
        >
          Perfil
        </Link>

        <Link 
          to="/historial" 
          className="px-4 py-2 border-2 border-[#ccc] rounded-[20px] bg-transparent"
        >
          Historial
        </Link>

        <Link 
          to="/pagos" 
          className="px-4 py-2 border border-[#ccc] rounded-[20px] bg-transparent"
        >
          Pagos
        </Link>
      </div>

      <section className="border border-[#ddd] rounded-[12px] bg-white p-6">
        <h3 className="text-[1.25rem] m-0">Historial de Compras</h3>
        <p className="mt-[-0.3rem] mb-4 text-[0.9rem] opacity-70 text-left">
          Tus últimas compras y reservaciones
        </p>

        <div className="flex flex-col gap-4">
          {compras.map((item, i) => (
            <div 
              key={i} 
              className="border border-[#ddd] bg-white rounded-[10px] p-4 px-5 flex justify-between items-center"
            >
              <div className="flex items-start gap-4">
                <div className="w-[35px] h-[35px] rounded-[8px] border border-[#ccc] bg-[#eee] flex items-center justify-center">
                  🎟️
                </div>

                <div>
                  <p className="m-0 font-semibold">{item.titulo}</p>
                  <p className="my-[2px] text-[0.85rem] opacity-80">
                    {item.sala} • {item.fecha} • {item.hora}
                  </p>
                  <p className="my-[2px] text-[0.85rem] opacity-80">
                    Asientos: {item.asientos.join(", ")}
                  </p>
                </div>
              </div>

              {/* Derecha */}
              <div className="text-right">
                <span className="inline-block px-2 py-[0.15rem] border border-[#aaa] rounded-[20px] text-[0.75rem] mb-1">
                  {item.estado}
                </span>
                <p className="m-0 font-semibold">{item.total}</p>
                <p className="m-0 text-[0.8rem] opacity-70">
                  {item.boletos} boleto(s)
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
