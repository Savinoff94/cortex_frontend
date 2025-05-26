import type { SelectHTMLAttributes } from "react";

type Option = {
    label: string;
    value: string;
};

export type SelectProps = {
    options: Option[];
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, "value" | "onChange">;
  
export function Select({
    options,
    value,
    onChange,
    placeholder = "Select an option",
    ...props
}: SelectProps) {
    return (
        <select
        className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-gray-700 transition duration-150"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        {...props}
        >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
            {opt.label}
            </option>
        ))}
        </select>
    );
}