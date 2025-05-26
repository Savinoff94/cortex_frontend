import { Label } from "../Label/Label"
import type { LabelProps } from "../Label/Label";
import { Select } from "../Select/Select"
import type { SelectProps } from "../Select/Select";


type SelectFieldProps = {
    labelProps: LabelProps,
    selectProps: SelectProps,
    name: string,
}
export function SelectField({labelProps, selectProps, name}: SelectFieldProps) {
    return (
        <div className="flex gap-2 ">
            <Label
            {...labelProps}
            htmlFor={name}
            />
            <Select
            {...selectProps}
            name={name}
            />
        </div>
    )
}