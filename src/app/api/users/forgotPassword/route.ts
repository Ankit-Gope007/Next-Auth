import { sendEmail } from "@/helpers/mailer"
import {connect} from "@/app/dbConfig/dbConfig"
import User from "@/models/userModel.js"
import { NextRequest,NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

connect()

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const {email} = reqBody
        console.log('This is the email',email)
        // Checking if user Already exists or Not
        const user = await User.findOne(
            {email:email}
        )

        if (!user){
            return NextResponse.json({error:"User Not Found hehe"},{status:400})
        }

        // sending the reset password email
        await sendEmail({
            email,
            emailType:"RESET",
            userId:user._id
        })

        return NextResponse.json({
            message:"Reset Password Email Sent Successfully",
            success:true
        })


    } catch (error:any) {
        return NextResponse.json(
            {error:error.message},
            {status:500}
        )
    }
}