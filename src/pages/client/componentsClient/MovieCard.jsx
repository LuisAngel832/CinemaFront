import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const { title, genre, duration, imageUrl } = movie;

  return (
    <article className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col">
      {/* Imagen */}
      <div className="h-56 w-full overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Contenido */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-gray-900">
          {title}
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          {genre}
        </p>

        <div className="flex items-center gap-2 text-sm text-gray-500 mt-3">
          <span className="text-base">⏱</span>
          <span>{duration} min</span>
        </div>

        {/* Botón */}
        <Link
          to="/funciones"
          className="
            mt-5 w-full
            rounded-full
            bg-purple-600
            text-white
            text-sm font-medium
            py-2
            text-center
            hover:bg-purple-700
            focus:outline-none
            focus:ring-2
            focus:ring-purple-400
            focus:ring-offset-2
            focus:ring-offset-white
            transition
          "
        >
          Ver funciones
        </Link>
      </div>
    </article>
  );
};

export default MovieCard;
