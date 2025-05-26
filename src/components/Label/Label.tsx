import type { LabelHTMLAttributes } from "react"

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {additionalClasses?: string}

export function Label({children, additionalClasses = '', ...props}: LabelProps) {
    return (
        <label
        className={`flex justify-center items-center mb-2 text-sm font-medium text-gray-700 ${additionalClasses}`}
        {...props}
        >
            {children}
        </label>
    )
}