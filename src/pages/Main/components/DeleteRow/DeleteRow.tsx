import Dialog from "../../../../components/Dialog/Dialog";
import { useTrafficData } from "../../../../Context/TrafficDataContext/TrafficDataContext";
import { Button } from "../../../../components/Button/Button";

export function DeleteRowDialog() {
    const {deleteRow, setRowIdToDelete, rowIdToDelete} = useTrafficData()
    return(
        <Dialog
            isOpen={Boolean(rowIdToDelete)}
            closeDialogCallback={() => setRowIdToDelete(null)}
        >
            <h1 className="text-xl font-semibold mb-4 text-center">Do you want to delete this row?</h1>
            <div className="flex justify-center gap-5">
                <Button
                    isPrimary={true}
                    onClick={deleteRow}
                >
                    Submit
                </Button>
            </div>
        </Dialog>
    )
} 