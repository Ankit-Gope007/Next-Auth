"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import Link from "next/link"
import { Toaster } from "react-hot-toast"
import toast from "react-hot-toast"

export default function ForgotPassword(){

    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    const handleForgotPassword = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/forgotPassword", { email })
            console.log("response Success", response.data)
            if (response.data.success) {
               toast.success("Reset Link Sent Successfully Check your Email")
            }
        } catch (error:any) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }


    return(
        <div className="min-h-screen min-w-screen flex items-center justify-center ">
            <Toaster/>
            <div className=" flex flex-col items-center justify-center border p-10 gap-5 shadow-2xl">
                <h1>Enter your Email to reset your Password through mail</h1>
                <input 
                className="border"
                 type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                 placeholder="Email" />
                <button
                className="bg-blue-500 text-white px-7 active:bg-blue-600 py-2 rounded-md"
                onClick={handleForgotPassword}
                >
                    {loading ? "Sending..." : "Send Reset Link"}
                </button>
            </div>
        </div>
    )
}