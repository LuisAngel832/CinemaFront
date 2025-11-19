import { Link } from "react-router-dom";

export default function ProfilePage() {
  return (
    <main className="max-w-[900px] mx-auto flex-1 px-8 pt-6">

      {/* --- ENCABEZADO DEL PERFIL --- */}
      <div className="flex items-center gap-4 mb-8">

        <div className="w-[90px] h-[90px] rounded-full border-2 border-[#ccc] bg-[#eaeaea]"></div>

        <div className="flex flex-col">
          <h2 className="text-[1.5rem] m-0">Juan Pérez</h2>
        </div>
      </div>

      {/* --- TABS --- */}
      <div className="flex gap-4 mb-4">
        <Link
          to="/perfil"
          className="px-4 py-2 rounded-[20px] border-2 border-[#ccc] bg-transparent"
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
          className="px-4 py-2 rounded-[20px] border border-[#ccc] bg-transparent"
        >
          Pagos
        </Link>
      </div>

      {/* --- FORMULARIO DE INFORMACIÓN PERSONAL --- */}
      <section className="border border-[#ddd] rounded-[12px] bg-white p-6">
        <h3 className="m-0 text-[1.25rem]">Información Personal</h3>
        <p className="mt-[-0.3rem] mb-4 text-[0.9rem] opacity-70 text-left">
          Actualiza tu información de contacto
        </p>

        <div className="flex flex-col gap-3">

          {/* NOMBRE */}
          <label className="text-[0.85rem] mt-2">Nombre completo</label>
          <div className="flex items-center gap-2">
            <span className="opacity-70">👤</span>
            <input
              className="w-full p-2 border border-[#ccc] rounded-[6px] bg-[#fafafa]"
              placeholder="Juan Pérez"
            />
          </div>

          {/* CORREO */}
          <label className="text-[0.85rem] mt-3">Correo electrónico</label>
          <div className="flex items-center gap-2">
            <span className="opacity-70">📧</span>
            <input
              className="w-full p-2 border border-[#ccc] rounded-[6px] bg-[#fafafa]"
              placeholder="juan.perez@email.com"
            />
          </div>

          {/* TELÉFONO */}
          <label className="text-[0.85rem] mt-3">Teléfono</label>
          <div className="flex items-center gap-2">
            <span className="opacity-70">📞</span>
            <input
              className="w-full p-2 border border-[#ccc] rounded-[6px] bg-[#fafafa]"
              placeholder="+52 555 123 4567"
            />
          </div>

          <button className="mt-4 w-full py-3 border border-[#333] rounded-[6px] bg-transparent">
            Guardar cambios
          </button>
        </div>
      </section>
    </main>
  );
}
