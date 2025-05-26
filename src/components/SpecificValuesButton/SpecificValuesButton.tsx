import { useEffect, useState } from "react"
import { Button } from "../Button/Button";

type SpecificValuesButtonProps<T> = {
    defaultVal: T;
    values: readonly T[]; 
    onClick: (val:T) =>void;
    format?: (val: T) => React.ReactNode;
}

export function SpecificValuesButton<T>({values, onClick, defaultVal, format } : SpecificValuesButtonProps<T>) {
    const [val,setVal] = useState<T>(defaultVal)

    useEffect(() => {
        setVal(defaultVal)
    }, [defaultVal, setVal])

    function handleClick() {
        const currentIndex = values.findIndex((v) => v === val);
        const nextIndex = (currentIndex + 1) % values.length;
        const nextValue = values[nextIndex];
    
        setVal(nextValue);
        onClick(nextValue);
      }

    return (
        <Button
            isPrimary={false}
            onClick={handleClick}
        >
            {format ? format(val) : String(val)}
        </Button>
    )
}