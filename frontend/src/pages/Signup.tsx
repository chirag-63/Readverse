import { Heading, SubHeading, Warning } from "../components/Heading"
import { Image1 } from "../components/Image"
import { Input } from '../components/Input'
import { Button } from "../components/Button"
import { useState } from "react"
import { signupType } from '@chirag-11/types-common'
import { useNavigate } from "react-router";
import axios from "axios"

export const Signup = () => {
    const Navigate = useNavigate()
    const [warning, setWarning] = useState('')
    const [userInputs, setUserInputs] = useState<signupType>({
        name: "",
        email: "",
        password: ""
    })

    const handleSignup = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/signup`, userInputs)
            localStorage.setItem("token", `${response.data.jwt}`)
            Navigate('/feed')
        } catch (err: any) {
            if (err.response.status == 411) {
                setWarning(err.response.data[0].message)
                if (err.response.data.length == 2) setWarning(err.response.data[1].message)
            }
            else setWarning(err.response.data.error)
        }
    }

    return (
        <div>
            <div className="flex flex-row h-screen">
                <div className="w-full md:w-[42%]">
                    <div className="text-center text-4xl">
                        <Heading label="Create an account" />
                    </div>
                    <div className="text-center text-lg">
                        <SubHeading label="already have account? " link={"sign in"} to={"/signin"} />
                    </div>
                    <div className="border-[1px] border-[#bb86fc]"></div>
                    <div className="h-[82%]">
                        <div className="flex flex-col justify-center h-[75%] items-center">
                            <div className="w-80 font-serif">
                                {/* wrapper divs for Input  */}
                                <div className="my-7">
                                    <Input onchange={e => {
                                        setUserInputs({
                                            ...userInputs,
                                            name: e.target.value
                                        })
                                    }} label="Name" placeholder="John Doe" />
                                </div>
                                <div className="my-7">
                                    <Input onchange={e => {
                                        setUserInputs({
                                            ...userInputs,
                                            email: e.target.value
                                        })
                                        setWarning('')
                                    }} label="Email" placeholder="example@xyz.com" />
                                </div>
                                <div className="my-7">
                                    <Input onchange={e => {
                                        setUserInputs({
                                            ...userInputs,
                                            password: e.target.value
                                        })
                                        setWarning('')
                                    }} type={"password"} label="Create new password" placeholder="" />
                                </div>
                            </div>
                        </div>
                        {/* wrapper div for button  */}
                        <div className="flex flex-col justify-center items-center text-white font-normal text-lg">
                            <div className="flex justify-center items-center mb-3 w-44 h-10" style={{cursor: (userInputs.name.trim().length == 0 || userInputs.email.trim().length == 0 || userInputs.password.length==0 || userInputs.password.length > 12) ? 'not-allowed' : 'pointer'}}>
                                <Button onClick={handleSignup} label="Sign up" type="purple" disabled={userInputs.name.trim().length == 0 || userInputs.email.trim().length == 0 || userInputs.password.length==0 || userInputs.password.length > 12} />
                            </div>
                            <Warning label={warning} />
                        </div>
                    </div>
                </div>
                <div className="hidden md:flex md:justify-center md:items-center md:w-[58%] md:bg-[#bb86fc] ">
                    <Image1 />
                </div>
            </div>
        </div>
    )
}