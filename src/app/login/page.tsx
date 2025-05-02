"use client"
import Link from "next/link"
import React from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { useState,useEffect } from "react"
import toast, { Toaster } from "react-hot-toast"

export default function LoginPage() {
    const router = useRouter()
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })

    const [buttonDisable,setButtonDisable]= useState(false)
    const [loading,setLoading]=useState(false)

    useEffect(() => {
      if ( user.password.length>0 && user.email.length>0){
            setButtonDisable(false)
      }else{
        setButtonDisable(true)
      }
    }, [user])
    

    const onLogin = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/login",user)
            console.log("response Success",response.data)
            if (response.data.success){
                toast.success("Logged In Successfully")
                router.push("/profile")

            }
        } catch (error:any) {
            console.log(error)
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }

    return (
        <div className="min-w-screen min-h-screen flex items-center justify-center  ">
            <Toaster/>
            <div className=" h-2/6 border flex flex-col items-center justify-center p-10 gap-5">
                <div className="text-2xl white font-bold text-center">{
                    loading? "Processing":"Login"
                    }</div>
                <div className="w-full flex flex-col gap-5 ">
                    <input
                    value={user.email}
                    onChange={(e)=>setUser({...user,email:e.target.value})}
                     className="border" 
                     type="username" 
                     placeholder="Email"/>
                    <input
                    value={user.password}
                    onChange={(e)=>setUser({...user,password:e.target.value})}
                     className="border"
                       type="password" 
                       placeholder="Passowrd"/>
                   
                </div>
                <div>
                    <button
                    onClick={onLogin}
                     className="bg-blue-500 text-white px-10 active:bg-blue-700">{
                        buttonDisable? "Enter All Fields":"Login"
                     }</button>
                </div>
                <Link className="text-blue-500" href="/signup">Visit Sign up Page</Link>
                <Link className="text-blue-500" href="/forgotPassword">Forgot Password</Link>
            </div>
        </div>
    )
}