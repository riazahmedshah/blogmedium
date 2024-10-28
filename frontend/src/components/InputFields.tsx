import { ChangeEvent } from "react";

interface InputFieldsProps {
    label: string;
    type?: string; // Optional type
    placeholder: string;
    value: string; // Accepts the value
    onChange: (e: ChangeEvent<HTMLInputElement>) => void; // Function to handle change
}

const InputFields = ({ label, placeholder, onChange, type, value }: InputFieldsProps) => {
    return (
        <div>
            <label className="block mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                {label}
            </label>
            <input
                onChange={onChange}
                type={type || "text"} // Default to "text" if no type provided
                value={value} // Bind the value here
                className="bg-gray-50 border border-gray-300 text-gray-900 mb-2 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={placeholder}
                required
            />
        </div>
    );
};

export default InputFields;
