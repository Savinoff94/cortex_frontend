import { Link } from "react-router-dom"
import { useState } from "react"
import { Form } from "../../components/Form/Form"
import { InputField } from "../../components/InputField/InputField"
import { Button } from "../../components/Button/Button"
import { SelectField } from "../../components/SelectField/SelectField"
import type { Role } from "../../types/types"
import { roles } from "../../types/types"
import { useAuth } from "../../Context/AuthContext/AuthContext"
import { FullScreenSpinner } from "../../components/Spinner/Spinner"

export function Registration() {
    const {register} = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [role, setRole] = useState<Role>('admin')
    const [loading, setLoading] = useState(false)

    const onSubmitCallback = async () => {
        if(!email || !password || !repeatPassword) {
            alert("all fields must be filled")
            return 
        }

        if(password !== repeatPassword) {
            alert("passwords must be equal")
            return
        }

        if(!role || !roles.includes(role)) {
            alert("Invalid role")
            return 
        }
        
        setLoading(true)
        try {
            await register({email, password, role})
        } catch (error) {
            console.log(error)
            throw error
        }
        finally {
            setLoading(false)
        }
    }

    const reset = () => {
        setEmail('')
        setPassword('')
        setRepeatPassword('')
    }
    return (
        <div className="entranceBg w-svw h-svh flex justify-center items-center">
            <Form 
                onSubmitCallback={onSubmitCallback}
            >
                <InputField
                    labelProps={{
                        children: "Email",
                        additionalClasses: "w-1/5"
                    }}
                    inputProps={{
                        value: email,
                        onChange: e => setEmail(e.target.value),
                        type: "email",
                    }}
                    name="email"
                />
                <InputField
                    labelProps={{
                        children: "Password",
                        additionalClasses: "w-1/5"
                    }}
                    inputProps={{
                        value: password, 
                        onChange: e => setPassword(e.target.value),
                        type:"password",
                    }}
                    name="password"
                />
                <InputField
                    labelProps={{
                        children: "Repeat password",
                        additionalClasses: "w-1/5"
                    }}
                    inputProps={{
                        value: repeatPassword, 
                        onChange: e => setRepeatPassword(e.target.value),
                        type:"password",
                    }}
                    name="repeatPassword"
                />
                <SelectField
                    labelProps={{
                        children: "Select role",
                        additionalClasses: "w-1/5"
                    }}
                    selectProps={{
                        placeholder: "Select user role",
                        value: role,
                        onChange: (val) => {
                            if (val === 'admin' || val === 'viewer') {
                              setRole(val);
                            }
                        },
                        options: [
                            {value: "admin", label: "admin"},
                            {value: "viewer", label: "viewer"}
                        ]
                    }}
                    name="role"
                />
                <div
                    className="flex justify-evenly items-center"
                >
                    <Button
                        isPrimary={true}
                        disabled={!email || !password || !repeatPassword}
                    >
                        Submit
                    </Button>
                    <Button
                        onClick={reset}
                        isPrimary={false}
                    >
                        Reset
                    </Button>
                </div>
                <Link to="/login">Already have account? Sign In</Link>
            </Form>
            {loading && <FullScreenSpinner/>}
        </div>
    )
}