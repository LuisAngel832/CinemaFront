export function formatShowtime(isoString) {
  if (!isoString) return "";

  const date = new Date(isoString); 

  return date.toLocaleString("es-MX", {
    dateStyle: "medium",   
    timeStyle: "short",    
  });
}

export const getInitialTime = (showtime) => {
    if (!showtime?.showtime) return "";
    const d = new Date(showtime.showtime);
    const h = String(d.getHours()).padStart(2, "0");
    const m = String(d.getMinutes()).padStart(2, "0");
    return `${h}:${m}`;
  };
