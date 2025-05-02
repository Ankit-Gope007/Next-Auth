"use client"
import Link from "next/link"
import React from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { useState,useEffect } from "react"
import toast, { Toaster } from "react-hot-toast"
import { set } from "mongoose"



export default function ProfilePage(){
    const router = useRouter()


    const [user, setUser] = React.useState({
        username: "",
    })
    const userDetails = async () => {
        try {
            const response = await axios.get("/api/users/me")
            console.log("response Success",response.data.data.username)
            setUser({
                username:response.data.data.username,
            })

            router.push(`/profile/${response.data.data.username}`)
        } catch (error:any) {
            console.log(error)
            toast.error(error.message)
            router.push("/login")
        }
    }

    const onLogout = async () => {
        try {
            const response = await axios.get("/api/users/logout")
            console.log("response Success",response.data)
            if (response.data.success){
                toast.success("Logged Out Successfully")
                router.push("/login")

            }
            
        } catch (error:any) {
            console.log(error)
            toast.error(error.message)
            
        }
    }
    return(
        <div className="min-h-screen min-w-screen flex flex-col  justify-center items-center gap-10">
            <Toaster/>
            This is the PRofile PAge
            <div >
                <button 
                onClick={onLogout}
                className="bg-blue-500 text-white px-10 active:bg-blue-700"
                >
                    Logout
                </button>
            </div>
            <div >
                <button 
                onClick={userDetails}
                className="bg-blue-500 text-white px-10 active:bg-blue-700"
                >
                   View Profile
                </button>
            </div>
        </div>
    )
}