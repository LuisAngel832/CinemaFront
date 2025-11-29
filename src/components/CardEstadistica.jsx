const CardEstadistica = ({ title, value }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6 w-1/3">
            <h2 className="text-2xl font-semibold mb-4">{title}</h2>
            <p className="text-3xl">{value}</p>
        </div>
    );
} 

export default CardEstadistica;