import type { HTMLAttributes } from "react"

type NavBarProps = HTMLAttributes<HTMLElement>

export function NavBar({children, ...props} : NavBarProps) {
    return (
        <nav
            className="flex justify-between items-center px-6 py-2 bg-white shadow-sm border-b border-gray-200"
            {...props}
        >
            {children}
        </nav>
    )
}