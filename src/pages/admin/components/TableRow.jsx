import { MdOutlineEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";




const TableRow = ({ children, setIsEditing, setDelete }) => {
    return (
        <tr className="border border-gray-300 hover:bg-gray-100 transition-colors rounded-2xl text-center">
            <th scope="row" className=" px-4 py-3 font-semibold">1</th>
            <td className="px-4 py-3">Inseption</td>
            <td className="px-4 py-3">1</td>
            <td className="px-4 py-3">18:00</td>
            <td className="px-4 py-3">Español</td>
            <td className="px-4 py-3">2D</td>
            <td className=" px-4 py-3 flex justify-around w-full">
                <button className="px-3 py-1 flex items-center rounded cursor-pointer" onClick={setIsEditing}> <MdOutlineEdit />Editar</button>
                <button className="px-3 py-1 flex items-center rounded cursor-pointer" onClick={setDelete}> <MdDeleteOutline />Eliminar</button>
            </td>
            
        </tr>
    );
}

export default TableRow;