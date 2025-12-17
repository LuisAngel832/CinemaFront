import CardEstadistica from "../../../components/CardEstadistica";
import { getStats } from "../../../api/UserApi";
import { useEffect, useState } from "react";

const Estadisticas = () => {
  const [stats, setStats] = useState(null); // antes era undefined

  useEffect(() => {
    getStats()
      .then((res) => {
        const data = res.data || res || {};
        setStats(data);
      })
      .catch((err) => {
        console.error("Error al obtener estadísticas", err);
      });
  }, []);

  if (!stats) {
    return (
      <div className="flex justify-between gap-4">
        <CardEstadistica title="Total funciones" value="-" />
        <CardEstadistica title="Películas únicas" value="-" />
      </div>
    );
  }

  return (
    <div className="flex justify-between gap-4">
      <CardEstadistica
        title="Total funciones"
        value={stats.allShowtimes ?? 0} 
      />
      <CardEstadistica title="Salas activas" value={stats.allActiveRooms} />

      <CardEstadistica title="Películas únicas" value={stats.allMovies} />
    </div>
  );
};

export default Estadisticas;
