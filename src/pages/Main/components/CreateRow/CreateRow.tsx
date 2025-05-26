import Dialog from "../../../../components/Dialog/Dialog";
import { useTrafficData } from "../../../../Context/TrafficDataContext/TrafficDataContext";
import { Button } from "../../../../components/Button/Button";
import { useState } from "react";
import { InputField } from "../../../../components/InputField/InputField";

type CreateRowDialogProps = {
    isOpen: boolean,
    setIsOpen: (val: boolean) => void
}

export function CreateRowDialog({isOpen, setIsOpen} : CreateRowDialogProps) {
    const {createRow} = useTrafficData()
    const [visits, setVisits] = useState<string>('');
    const [date, setDate] = useState<string>('')

    return(
        <Dialog
            isOpen={isOpen}
            closeDialogCallback={() => setIsOpen(false)}
        >
            <h1 className="text-xl font-semibold mb-4">Create row</h1>
            <div className="flex flex-col gap-4 mb-6">
                <InputField
                    name="rowDate"
                    labelProps={{
                        children: "Date"
                    }}
                    inputProps={{
                        type: "date",
                        placeholder: "YYYY-MM-DD",
                        onChange: (e) => setDate(e.target.value),
                        value: date ? date : ''
                    }}
                />
                <InputField
                    labelProps={{children: "Visits"}}
                    inputProps={{
                        value: visits ? visits : '',
                        onChange: e => setVisits(e.target.value),
                        type: "number"
                    }}
                    name="visits"
                />
            </div>
            <div className="flex justify-center gap-5">
                <Button
                    isPrimary={true}
                    onClick={() => {
                        createRow({visits, date, callbackOnSuccess: () => setIsOpen(false)})
                    }}
                >
                    Yes
                </Button>
                <Button
                    isPrimary={false}
                    onClick={() => {
                        setIsOpen(false)
                    }}
                >
                    No
                </Button>
            </div>
        </Dialog>
    )
}