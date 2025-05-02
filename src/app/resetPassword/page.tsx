"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import Link from "next/link"
import toast from "react-hot-toast"
import { Toaster } from "react-hot-toast"

export default function ForgotPassword(){

    const [newPassword, setNewPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [token, setToken] = useState("")

    const router = useRouter()


    useEffect(() => {
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken||"")
    },[])

    useEffect(() => {
        if (token.length > 0 && newPassword.length > 0) {
            handleNewPassword();
        }

    }, [token])

    const handleNewPassword = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/resetPassword", { newPassword, token })
            console.log("response Success", response.data)
            if (response.data.success) {
                toast.success("Password Reset Successfully")
                router.push("/login")
            }
        } catch (error: any) {
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
                <h1>Enter your new Password</h1>
                <input
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="border"
                    type="password"
                    placeholder="New Password"
                />
                <button
                    className="bg-blue-500 text-white px-7 active:bg-blue-600 py-2 rounded-md"
                    onClick={handleNewPassword}
                >
                    {loading ? "Sending..." : "Reset Password"}
                </button>
            </div>
        </div>
    )
}