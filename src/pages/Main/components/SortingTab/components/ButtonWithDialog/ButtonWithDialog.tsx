import { useState } from "react";
import { Portal } from "../../../../../../HOC/Portal/Portal";
import { CreateRowDialog } from "../../../CreateRow/CreateRow";
export function ButtonWithDialog() {
    const [isOpen, setIsOpen] = useState(false)

    return (
    <>
        <button
            className="bg-green-700 hover:bg-emerald-600 text-white font-semibold py-2 px-4 rounded-lg shadow transition"
            onClick = {() => setIsOpen((prev) => !prev)}
        >
            Create data
        </button>
        {isOpen && <Portal><CreateRowDialog isOpen={isOpen} setIsOpen={setIsOpen} /></Portal>}
        
    </>
    )
}