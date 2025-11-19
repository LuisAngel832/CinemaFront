import TableRow from "./components/TableRow";
import CardEstadistica from "../../components/CardEstadistica";  
import Editar from "./components/Editar";
import Eliminar from "./components/Eliminar";
import { useState } from "react";

const GestionDeFunciones = ({}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);


    const isDeletingFunc = () => {  
        setIsDeleting(!isDeleting);
    }
    const isEditingFunc = () => {
        setIsEditing(!isEditing);
    }
    return (
        <section className="w-full h-full py-5 px-12">
            {isEditing && <Editar setIsEditing={isEditingFunc}/>}
            {isDeleting && <Eliminar setDelete={isDeletingFunc}/>}

            <div className="mb-8">
                <h1 className="text-4xl font-semibold">Gestión de Funciones</h1>
                <p className="text-black/80">Administra las funciones de cine: crea, edita y elimina horarios</p>
            </div>

            <div className="flex gap-2 mb-8" >
                <input className="w-[90%] border rounded p-1" type="search" placeholder="Ej: Batman, Sala 1" />
                <button className="cursor-pointer w-[10%] rounded-lg bg-black text-white">Buscar</button>
            </div>

            <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden mb-8">
                <thead className="bg-black text-white">
                    <tr className="">
                        <th scope="col" className=" px-4 py-3 text-center font-semibold">#</th>
                        <th scope="col" className=" px-4 py-3 text-center font-semibold">Pelicula</th>
                        <th scope="col" className=" px-4 py-3 text-center font-semibold">Sala</th>
                        <th scope="col" className=" px-4 py-3 text-center font-semibold">Hora</th>
                        <th scope="col" className=" px-4 py-3 text-center font-semibold">Idioma</th>
                        <th scope="col" className=" px-4 py-3 text-center font-semibold">Tipo</th>
                        <th scope="col" className=" px-4 py-3 text-center font-semibold">Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    <TableRow setIsEditing={isEditingFunc} setDelete={isDeletingFunc}/>
                    <TableRow setIsEditing={isEditingFunc} setDelete={isDeletingFunc}/>
                    <TableRow setIsEditing={isEditingFunc} setDelete={isDeletingFunc}/>
                    <TableRow setIsEditing={isEditingFunc} setDelete={isDeletingFunc}/>
                </tbody>
            </table>

            

            <div className="flex w-full justify-end mb-8">
                <button className=" bg-black rounded p-3 text-white" >Agregar Funcion</button>
            </div>

            <div className="flex justify-around gap-10">
                <CardEstadistica title="Total Funciones" value="25" />
                <CardEstadistica title="Salas Activas" value="8" />
                <CardEstadistica title="Peliculas Unicas" value="12" />
            </div>
        </section>
    );
}
export default GestionDeFunciones;