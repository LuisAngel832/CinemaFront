import { useState } from "react";
import UserHeader from "./componentsClient/UserHeader";
import ProfileTabs from "./componentsClient/ProfileTabs";

export default function ProfilePage() {
  const [fullName, setFullName] = useState("Juan Pérez");
  const [email, setEmail] = useState("juan.perez@email.com");
  const [phone, setPhone] = useState("+52 555 123 4567");
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Guardando cambios...", { fullName, email, phone });
    setIsEditing(false);
  };

  return (
    <main className="flex-1">
      <div className="max-w-4xl mx-auto px-8 pt-10 pb-6">
        <UserHeader fullName={fullName} email={email} />
        <ProfileTabs />
        <section className="bg-white border border-gray-200 rounded-2xl shadow-sm px-10 py-7">
          <div className="flex items-start justify-between mb-5">
            <div>
              <h3 className="m-0 text-[1.15rem] font-semibold text-gray-900">
                Información Personal
              </h3>
              <p className="mt-1 text-[0.9rem] text-gray-500">
                Actualiza tu información de contacto
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsEditing((prev) => !prev)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 text-[0.8rem] font-medium text-gray-700 hover:border-purple-500 hover:text-purple-600 transition"
            >
              <span className="text-sm">✏️</span>
              {isEditing ? "Cancelar" : "Editar"}
            </button>
          </div>
          <form onSubmit={handleSave} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-[0.9rem] font-medium text-gray-600">Nombre completo</label>
              <div className="flex items-center gap-2.5">
                <span className="text-gray-400 text-[1.1rem]">👤</span>
                {isEditing ? (
                  <input
                    className="flex-1 px-3.5 py-2.5 border border-gray-300 rounded-md bg-white text-[0.95rem] outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-400"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                ) : (
                  <p className="flex-1 text-[0.95rem] text-gray-800 py-1.5">{fullName}</p>
                )}
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[0.9rem] font-medium text-gray-600">Correo electrónico</label>
              <div className="flex items-center gap-2.5">
                <span className="text-gray-400 text-[1.1rem]">📧</span>
                {isEditing ? (
                  <input
                    className="flex-1 px-3.5 py-2.5 border border-gray-300 rounded-md bg-white text-[0.95rem] outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-400"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                ) : (
                  <p className="flex-1 text-[0.95rem] text-gray-800 py-1.5">{email}</p>
                )}
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[0.9rem] font-medium text-gray-600">Teléfono</label>
              <div className="flex items-center gap-2.5">
                <span className="text-gray-400 text-[1.1rem]">📞</span>
                {isEditing ? (
                  <input
                    className="flex-1 px-3.5 py-2.5 border border-gray-300 rounded-md bg-white text-[0.95rem] outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-400"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                ) : (
                  <p className="flex-1 text-[0.95rem] text-gray-800 py-1.5">{phone}</p>
                )}
              </div>
            </div>
            {isEditing && (
              <button
                type="submit"
                className="mt-4 w-full py-3.5 rounded-md bg-purple-600 text-white text-[0.95rem] font-medium hover:bg-purple-700 transition"
              >
                Guardar cambios
              </button>
            )}
          </form>
        </section>
      </div>
    </main>
  );
}

