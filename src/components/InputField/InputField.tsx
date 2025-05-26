import { Label } from "../Label/Label"
import type { LabelProps } from "../Label/Label";
import { Input } from "../Input/Input"
import type { InputProps } from "../Input/Input";


type InputFieldProps = {
    labelProps: LabelProps,
    inputProps: InputProps,
    name: string
}
export function InputField({labelProps, inputProps, name}: InputFieldProps) {
    return (
        <div className="flex gap-2 w-full">
            <Label
            {...labelProps}
            htmlFor={name}
            />
            <Input
            {...inputProps}
            name={name}
            />
        </div>
    )
}