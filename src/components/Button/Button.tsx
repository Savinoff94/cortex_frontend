import type { ButtonHTMLAttributes } from "react"

type ButtonProps = {
    isPrimary: boolean,
    additionalClasses?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export function Button({isPrimary, children, additionalClasses = '', ...props} : ButtonProps) {
    return (
        <button
        className={`
            inline-flex items-center justify-center
            px-5 py-2 rounded-md font-medium transition-colors duration-200
            ${isPrimary 
                ? "bg-sky-600 text-white hover:bg-sky-700 focus:ring-2 focus:ring-sky-400" 
                : "bg-gray-300 text-gray-800 hover:bg-gray-400 focus:ring-2 focus:ring-gray-200"} 
                px-5 py-2 rounded-sm ${additionalClasses}`
            }
        {...props}
        >
            {children}
        </button>
    )
}