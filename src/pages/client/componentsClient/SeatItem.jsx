import React from "react";

const SeatItem = ({ label, status, onClick }) => {
  const baseClasses = `
    w-8 h-8 sm:w-[35px] sm:h-[35px]
    rounded-[6px]
    flex justify-center items-center
    text-white text-[0.75rem] sm:text-[0.8rem]
    transition
  `;

  let statusClasses = "";

  if (status === "disponible") {
    statusClasses = "bg-emerald-500 hover:bg-emerald-600 cursor-pointer";
  } else if (status === "seleccionado") {
    statusClasses = "bg-purple-600 hover:bg-purple-700 cursor-pointer";
  } else if (status === "ocupado") {
    statusClasses = "bg-red-500 cursor-not-allowed opacity-80";
  }

  const handleClick = () => {
    if (status === "ocupado") return;
    if (onClick) onClick(label);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${baseClasses} ${statusClasses}`}
    >
      <span>💺</span>
    </button>
  );
};

export default SeatItem;
