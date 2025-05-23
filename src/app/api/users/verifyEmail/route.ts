import {connect} from "@/app/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel.js";


connect()

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json()
        const {token} = reqBody
        console.log(token)

        const user = await User.findOne({verifyToken:token,verifyTokenExpiry:{$gt:Date.now()}})

        if (!user){
            return NextResponse.json({message:"Invalid or Expired Token"},{status:400})
        }

        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined
        await user.save()

        return NextResponse.json({
            message:"Email Verified Successfully",
            success:true
        })

    } catch (error:any) {
        return NextResponse.json({message:"Something went wrong"}, {status:500})
        
    }
}