import { useEffect, useState } from "react";
import UserHeader from "./componentsClient/UserHeader";
import ProfileTabs from "./componentsClient/ProfileTabs";
import {
  getUserProfile,
  updateUserProfile,
} from "../api/userApi";

export default function ProfilePage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setError("");
        const res = await getUserProfile();
        const data = res.data;
        if (data) {
          setFullName(data.fullName || "");
          setEmail(data.email || "");
        }
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar tu perfil.");
      }
    };
    fetchProfile();
  }, []);

  const validateEmail = (emailValue) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
    return re.test(String(emailValue).toLowerCase());
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    if (!fullName.trim()) {
      setError("El nombre completo no puede estar vacío.");
      return;
    }
    if (!validateEmail(email)) {
      setError("El correo electrónico no es válido.");
      return;
    }
    try {
      await updateUserProfile({ fullName: fullName.trim(), email: email.trim() });
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      setError("No se pudo guardar tu perfil.");
    }
  };

  return (
    <main className="flex-1">
      <div className="max-w-4xl mx-auto px-8 pt-10 pb-6">
        <UserHeader fullName={fullName} email={email} />
        <ProfileTabs />
        <section className="bg-white border border-gray-200 rounded-2xl shadow-sm px-10 py-7">
          <div className="flex items-start justify-between mb-5">
            <div>
              <h3 className="m-0 text-[1.15rem] font-semibold text-gray-900">Información Personal</h3>
              <p className="mt-1 text-[0.9rem] text-gray-500">Actualiza tu información de contacto</p>
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
            {isEditing && (
              <button
                type="submit"
                className="mt-4 w-full py-3.5 rounded-md bg-purple-600 text-white text-[0.95rem] font-medium hover:bg-purple-700 transition"
              >
                Guardar cambios
              </button>
            )}
            {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
          </form>
        </section>
      </div>
    </main>
  );
}
