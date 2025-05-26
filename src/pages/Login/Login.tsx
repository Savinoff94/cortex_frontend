import { useState } from "react"
import { Form } from "../../components/Form/Form"
import { InputField } from "../../components/InputField/InputField"
import { Button } from "../../components/Button/Button"
import { useAuth } from "../../Context/AuthContext/AuthContext"

export function Login() {
    const { login } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmitCallback = async () => {

        if(!email || !password) {
            alert("all fields must be filled")
            return 
        }

        await login({email, password})

    }

    return (
        <div className="entranceBg w-svw h-svh flex justify-center items-center">
            <Form 
                onSubmitCallback={onSubmitCallback}
            >
                <InputField
                    labelProps={{children: "Email"}}
                    inputProps={{
                        value: email,
                        onChange: e => setEmail(e.target.value),
                        type: "email",
                        additionalClasses: "w-2/3"
                    }}
                    name="email"
                />
                <InputField
                    labelProps={{children: "Password"}}
                    inputProps={{
                        value: password, 
                        onChange: e => setPassword(e.target.value),
                        type:"password",
                        additionalClasses: "w-2/3"
                    }}
                    name="password"
                />
                <div
                    className="flex justify-evenly items-center"
                >
                    <Button
                        isPrimary={true}
                        disabled={!email || !password}
                    >
                        Login
                    </Button>
                </div>
            </Form>
        </div>
    )
}