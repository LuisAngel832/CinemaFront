import Input from "./Input";

const Agregar = ({ setIsAdding }) => {
    return (
        <div className="z-10 top-0 left-0 w-screen h-screen fixed bg-black/50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-8 w-[90%] max-w-md">
                <h2 className="text-2xl font-semibold mb-2">Agregar Función</h2>
                <p className="text-black/70 mb-4">Agrega una nueva función para la película seleccionada.</p>

                <form className="flex flex-col gap-4">
                    <Input label="Pelicula" data="" />
                    <Input label="Sala" data="" />
                    <Input label="Hora" data="" />
                    <Input label="Idioma" data="" />
                    <Input label="Tipo" data="" />
                </form>

                <div className="flex gap-3 mt-6">
                    <button
                        className="flex-1 px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition-colors font-semibold cursor-pointer"
                        onClick={setIsAdding}
                    >
                        Cancelar
                    </button>
                    <button className="flex-1 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold cursor-pointer">
                        Agregar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Agregar;
