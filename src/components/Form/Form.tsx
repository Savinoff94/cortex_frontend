import type { ReactNode } from "react"
import type { FormEvent } from "react"

export type FormProps = {
    onSubmitCallback: () => void,
    children: ReactNode
}

export function Form({onSubmitCallback, children} : FormProps) {
    const submitHandle = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmitCallback()
    }
    return (
        <form 
        className="flex flex-col gap-6 p-6 bg-gray-50 shadow-md rounded-xl border border-gray-300 max-w-md mx-auto"
        onSubmit={submitHandle}>
            {children}
        </form>
    )
}

