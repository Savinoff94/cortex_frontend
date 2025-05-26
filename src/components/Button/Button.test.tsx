import { Button } from "./Button";
import {render} from "@testing-library/react"

describe('First test', () => {
    it("Should render component", () => {
        render(
            <Button
                isPrimary={true}
            >
                Button
            </Button>
        )
        expect(true).toBeTruthy()
    })
}

)