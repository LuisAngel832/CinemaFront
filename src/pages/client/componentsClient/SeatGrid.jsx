import React from "react";
import SeatItem from "./SeatItem";

const seatRows = ["A", "B", "C", "D", "E", "F", "G", "H"];
const ocupadoDemo = ["A3", "C5", "E4"];

const SeatGrid = () => {
  return (
    <div>
      <div className="text-center py-2 mb-2 border-t-2 border-[#ccc] text-[0.9rem] opacity-80">
        PANTALLA
      </div>

      {seatRows.map((row) => (
        <div
          key={row}
          className="flex items-center gap-[0.8rem] mb-[1.2rem]"
        >
          <div className="w-[180px] text-[0.9rem] opacity-80 text-right pr-2">{row}</div>

          {Array.from({ length: 10 }).map((_, index) => {
            const seatCode = `${row}${index + 1}`;
            const status = ocupadoDemo.includes(seatCode)
              ? "ocupado"
              : "disponible";

            return (
              <SeatItem key={seatCode} label={seatCode} status={status} />
            );
          })}
        </div>
      ))}

      <div className="mt-[1.8rem] flex gap-8 justify-center">
        <div className="flex items-center gap-[0.4rem]">
          <div className="w-[20px] h-[20px] rounded-[4px] border border-[#ccc] bg-[#eaeaea]" />
          <span>Disponible</span>
        </div>

        <div className="flex items-center gap-[0.4rem]">
          <div className="w-[20px] h-[20px] rounded-[4px] border border-[#ccc] bg-[#dcdcdc]" />
          <span>Seleccionado</span>
        </div>

        <div className="flex items-center gap-[0.4rem]">
          <div className="w-[20px] h-[20px] rounded-[4px] border border-[#ccc] bg-[#bbbbbb]" />
          <span>Ocupado</span>
        </div>
      </div>
    </div>
  );
};

export default SeatGrid;
