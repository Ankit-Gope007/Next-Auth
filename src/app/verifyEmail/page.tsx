"use client"

import { useEffect,useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import Link from "next/link"


export default function VerifyEmail() {
    const [token, setToken] = useState("")
    const [isVerified, setIsVerified] = useState(false)
    const [error, setError] = useState(false)

    const router = useRouter()

    const verifyUserEmail = async () => {
        try {
            console.log("Verifying email with token:", token)
            const response = await axios.post("/api/users/verifyEmail", { token })
            setIsVerified(true)
            
        } catch (error:any) {
            console.error("Error verifying email:", error)
            setError(true)
            
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken||"")
    },[])

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }

    }, [token])

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            {isVerified ? (
                <div className="text-green-500">
                    Email verified successfully! You can now <Link href="/login" className="text-blue-500">login</Link>.
                </div>
            ):
            (
                <div className="text-yellow-500 text-6xl">
                    No Token
                </div>
            )}
            {error && (
                <div className="text-red-500">
                    Error verifying email. Please try again later.
                </div>
            )}
        </div>
    )
    
}