import { ChangeEvent } from "react"

interface inputFields {
    label:string,
    placeholder:string,
    onChange:(e : ChangeEvent<HTMLInputElement>) => void,
    type?:string
}
const InputFields = ({label, placeholder, onChange, type}:inputFields) => {
    return(
    <div>
        <label className="block mb-2 text-lg font-semibold text-gray-900 dark:text-white">{label}</label>
        <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 mb-2 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
    </div>
    )
}

export default InputFields