import { Heading, SubHeading, Warning } from "../components/Heading"
import { Image2 } from "../components/Image"
import { Input } from "../components/Input"
import { Button } from "../components/Button"
import { useState } from "react"
import { signinType } from "@chirag-11/types-common"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const Signin = () => {
    const Navigate = useNavigate()
    const [warning, setWarning] = useState('')
    const [userInputs, setUserInputs] = useState<signinType>({
        email: "",
        password: ""
    })

    const handleSignin = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/signin`, userInputs)
            localStorage.setItem("token", `${response.data.jwt}`)
            Navigate('/feed')
        } catch (err: any) {
            if (err.response.status == 411) {
                setWarning(err.response.data[0].message)
            }
            else{
                setWarning(err.response.data.error)
            }
        }
    }

    return (
        <div>
            <div className="flex flex-row h-screen">
                <div className="hidden md:flex md:justify-center md:items-center md:w-[58%] md:bg-[#8DA348]">
                    <Image2 />
                </div>
                <div className="w-full md:w-[42%]">
                    <div className="text-center text-4xl">
                        <Heading label="Welcome back" />
                    </div>
                    <div className="text-center text-lg">
                        <SubHeading label="new user? " link={"sign up"} to={"/signup"} />
                    </div>
                    <div className="border-[1px] border-[#8DA348]"></div>
                    <div className="h-[82%]">
                        <div className="flex flex-col justify-center h-[75%] items-center">
                            <div className="w-80 font-serif">
                                {/* wrapper divs for Input  */}
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
                                    }} type={"password"} label="Password" placeholder="your password here" />
                                </div>
                            </div>
                        </div>
                        {/* wrapper div for button  */}
                        <div className="flex flex-col justify-center items-center text-white font-normal text-lg">
                            <div onClick={handleSignin} className="flex justify-center items-center mb-3 w-44 h-10" style={{cursor: (userInputs.email.trim().length==0 || userInputs.password.length ==0 || userInputs.password.length > 12) ? 'not-allowed' : 'pointer'}}>
                                <Button label="Sign in" type="green" disabled={userInputs.email.trim().length==0 || userInputs.password.length ==0 || userInputs.password.length > 12} />
                            </div>
                            <Warning label={warning} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}