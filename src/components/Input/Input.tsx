import type { InputHTMLAttributes } from "react"

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {additionalClasses?: string}
export function Input({value, onChange, additionalClasses = '', ...props}: InputProps) {
    return (
        <input
        onChange={onChange}
        value={value}
        className={`w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-200 text-sm text-gray-800 placeholder-gray-400 ${additionalClasses}`}
        {...props}
        />
    )
}