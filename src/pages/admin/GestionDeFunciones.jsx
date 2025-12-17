import { useEffect, useMemo, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FiPlusCircle } from "react-icons/fi";

import Estadisticas from "./components/Estadisticas";

import AdminHeader from "./components/AdminHeader";
import FuncionesTable from "./components/FuncionesTable";
import PeliculasTable from "./components/PeliculasTable";

import Editar from "./components/Editar";
import Eliminar from "./components/Eliminar";
import Agregar from "./components/AgregarFuncion";

import AgregarPelicula from "./components/AgregarPelicula";
import EditarPelicula from "./components/EditarPelicula";
import EliminarPelicula from "./components/EliminarPelicula";

import {
  getAllMovies,
  getShowtimes,
  deleteRoom as deleteRoomApi,
  deleteMovie as deleteMovieApi,
} from "../../api/UserApi";

const GestionDeFunciones = () => {
  const [activeTab, setActiveTab] = useState("funciones");

  const [rooms, setRooms] = useState([]);
  const [isAddingFuncion, setIsAddingFuncion] = useState(false);
  const [editingShowtime, setEditingShowtime] = useState(null);
  const [deletingShowtime, setDeletingShowtime] = useState(null);
  const [loadingShowtimes, setLoadingShowtimes] = useState(false);

  const [movies, setMovies] = useState([]);
  const [searchMovie, setSearchMovie] = useState("");
  const [isAddingPelicula, setIsAddingPelicula] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);
  const [deletingMovie, setDeletingMovie] = useState(null);
  const [loadingMovies, setLoadingMovies] = useState(false);
  const loadShowtimes = () => {
    setLoadingShowtimes(true);
    getShowtimes()
      .then((res) => {
        const data = res.data || [];
        setRooms(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Error al obtener funciones", err);
      })
      .finally(() => setLoadingShowtimes(false));
  };

  const loadMovies = () => {
    setLoadingMovies(true);
    getAllMovies()
      .then((res) => {
        const data = res.data || [];
        setMovies(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Error al obtener películas", err);
      })
      .finally(() => setLoadingMovies(false));
  };

  useEffect(() => {
    loadShowtimes();
    loadMovies();
  }, []);

  const toggleAddingFuncion = () => setIsAddingFuncion((prev) => !prev);

  const handleDeleteShowtime = (id) => {
    deleteRoomApi(id)
      .then(() => {
        setRooms((prev) => prev.filter((room) => room.id !== id));
        setDeletingShowtime(null);
      })
      .catch((err) => {
        console.error("Error al eliminar función", err);
      });
  };

  const toggleAddingPelicula = () =>
    setIsAddingPelicula((prev) => !prev);

  const handleDeleteMovie = (id) => {
    deleteMovieApi(id)
      .then(() => {
        setMovies((prev) => prev.filter((m) => m.id !== id));
        setDeletingMovie(null);
      })
      .catch((err) => {
        console.error("Error al eliminar película", err);
      });
  };

  const filteredMovies = useMemo(() => {
    if (!searchMovie.trim()) return movies;

    const term = searchMovie.toLowerCase();
    return movies.filter((m) => {
      const title = m.title?.toLowerCase() ?? "";
      const genre = m.genre?.toLowerCase() ?? "";
      const language = m.language?.toLowerCase() ?? "";
      return (
        title.includes(term) ||
        genre.includes(term) ||
        language.includes(term)
      );
    });
  }, [movies, searchMovie]);

  return (
    <main className="max-w-[900px] mx-auto flex-1 px-8 pt-6 pb-10">
      {editingShowtime && (
        <Editar
          showtime={editingShowtime}
          onCancel={() => setEditingShowtime(null)}
          onUpdated={loadShowtimes}
        />
      )}

      {deletingShowtime && (
        <Eliminar
          showtime={deletingShowtime}
          onCancel={() => setDeletingShowtime(null)}
          onConfirm={() => handleDeleteShowtime(deletingShowtime.id)}
        />
      )}

      {isAddingFuncion && (
        <Agregar setIsAdding={toggleAddingFuncion} loadingShowtimes={loadShowtimes} />
      )}

      {isAddingPelicula && (
        <AgregarPelicula
          onCancel={() => setIsAddingPelicula(false)}
          onCreated={loadMovies}
        />
      )}

      {editingMovie && (
        <EditarPelicula
          movie={editingMovie}
          onCancel={() => setEditingMovie(null)}
          onUpdated={loadMovies}
        />
      )}

      {deletingMovie && (
        <EliminarPelicula
          movie={deletingMovie}
          onCancel={() => setDeletingMovie(null)}
          onConfirm={() => handleDeleteMovie(deletingMovie.id)}
        />
      )}

      <AdminHeader setActiveTab={setActiveTab} activeTab={activeTab} />

      {activeTab === "funciones" && (
        <>
          <div className="flex gap-2 mb-6">
            <input
              type="search"
              placeholder="Ej: Batman, Sala 1"
              className="
                w-[85%] rounded-xl p-2 pl-3
                border border-transparent
                bg-gray-100
                focus:outline-none
                focus:border-blue-600
                focus:ring-4 focus:ring-blue-500/60
                focus:ring-offset-0
                focus:shadow-lg
                transition duration-150
              "
            />

            <button className="cursor-pointer w-[15%] rounded-lg bg-emerald-500 text-white flex items-center justify-center gap-1 p-2 hover:bg-emerald-600 text-sm">
              <CiSearch className="text-2xl" />
              Buscar
            </button>
          </div>

          <FuncionesTable
            showtimes={rooms}
            loading={loadingShowtimes}
            onEdit={(showtime) => setEditingShowtime(showtime)}
            onDelete={(showtime) => setDeletingShowtime(showtime)}
          />

          <div className="flex w-full justify-end mb-6">
            <button
              className="
                bg-blue-500 rounded-xl px-4 py-2
                text-white flex items-center gap-2
                text-sm
                transition-colors hover:bg-blue-700 cursor-pointer
              "
              onClick={toggleAddingFuncion}
            >
              <FiPlusCircle />
              Agregar función
            </button>
          </div>

          <Estadisticas />
        </>
      )}

      {activeTab === "peliculas" && (
        <>
          <PeliculasTable
            movies={filteredMovies}
            search={searchMovie}
            onSearchChange={setSearchMovie}
            onEdit={(movie) => setEditingMovie(movie)}
            onDelete={(movie) => setDeletingMovie(movie)}
            onAdd={toggleAddingPelicula}
            loading={loadingMovies}
          />

            <Estadisticas  />
         
        </>
      )}
    </main>
  );
};

export default GestionDeFunciones;
