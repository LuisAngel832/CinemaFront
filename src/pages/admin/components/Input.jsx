const Input = ({label,setText, data}) => {
return (
    <div className="flex flex-col">
        <label htmlFor="">{label}</label>
        <input type="text" name="" id="" placeholder={data} />
    </div>
)
}

export default Input;