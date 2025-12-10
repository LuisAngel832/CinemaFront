import SeatItem from "./SeatItem";

const SeatGrid = ({
  seatRows,
  occupiedSeats,
  selectedSeats,
  onToggleSeat,
  columns = 10,
}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-[520px] flex flex-col items-center mb-4">
        <div className="w-full h-[3px] bg-gray-200 rounded-full mb-2" />
        <div className="text-xs tracking-[0.25em] text-gray-500">
          PANTALLA
        </div>
      </div>

      <div className="w-[520px]">
        {seatRows.map((row) => (
          <div
            key={row}
            className="flex items-center gap-4 mb-5 ml-13"
          >
            <div className="w-6 text-sm text-gray-500 text-right">
              {row}
            </div>

            <div className="flex gap-2 flex-wrap">
              {Array.from({ length: columns }).map((_, index) => {
                const seatCode = `${row}${index + 1}`;

                let status = "disponible";
                if (occupiedSeats.includes(seatCode)) {
                  status = "ocupado";
                } else if (selectedSeats.includes(seatCode)) {
                  status = "seleccionado";
                }

                return (
                  <SeatItem
                    key={seatCode}
                    label={seatCode}
                    status={status}
                    onClick={() => onToggleSeat(seatCode)}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-8 justify-center text-sm">
        <LegendItem colorClass="bg-emerald-500" label="Disponible" />
        <LegendItem colorClass="bg-purple-600" label="Seleccionado" />
        <LegendItem colorClass="bg-red-500" label="Ocupado" />
      </div>
    </div>
  );
};

const LegendItem = ({ colorClass, label }) => (
  <div className="flex items-center gap-2">
    <div className={`w-5 h-5 rounded-md ${colorClass}`} />
    <span className="text-gray-700">{label}</span>
  </div>
);

export default SeatGrid;
