const Input = ({label,setText, data}) => {
return (
    <div className="flex flex-col">
        <label htmlFor="" className="mb-1 text-sm font-medium text-gray-700">{label}</label>
        <input
            type="text"
            name=""
            id=""
            placeholder={data}
            className="bg-black/5 rounded-lg p-2 border border-transparent focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-900/30 transition duration-150"
        />
    </div>
)
}

export default Input;