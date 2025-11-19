import React from "react";

const SeatItem = ({ label, status }) => {
  const statusColors = {
    disponible: "bg-[#eaeaea]",
    seleccionado: "bg-[#dcdcdc]",
    ocupado: "bg-[#bbbbbb]"
  };

  return (
    <div
      className={`
        w-[28px] h-[28px]
        rounded-[6px] border border-[#ccc]
        flex justify-center items-center
        ${statusColors[status]}
      `}
    >
      <span className="text-[0.8rem]">💺</span>
    </div>
  );
};

export default SeatItem;
