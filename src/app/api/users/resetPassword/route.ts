import {connect} from "@/app/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel.js";
import bcryptjs from "bcryptjs";


connect()

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json()
        const {token,newPassword} = reqBody
        console.log(token)

        const user = await User.findOne(
            {
                forgotPasswordToken:token,
                forgotPasswordTokenExpiry:{$gt:Date.now()}
            }
        )

        if (!user){
            return NextResponse.json({message:"Invalid or Expired Token"},{status:400})
        }

        
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(newPassword, salt)

        user.password = hashedPassword
        user.forgotPasswordToken = undefined
        user.forgotPasswordTokenExpiry = undefined
        await user.save()

        return NextResponse.json({
            message:"Email Verified Successfully",
            success:true
        })

    } catch (error:any) {
        return NextResponse.json({message:"Something went wrong"}, {status:500})
        
    }
}