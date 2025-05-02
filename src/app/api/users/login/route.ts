import {connect} from "@/app/dbConfig/dbConfig"
import User from "@/models/userModel.js"
import { NextRequest,NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

connect()

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const {email,password} = reqBody
        console.log(reqBody)
        // Checking if user Already exists or Not
        const user = await User.findOne({email})

        if (!user){
            return NextResponse.json({error:"User Not Found"},{status:400})
        }

        // comparing the password
        const isPasswordCorrect = await bcryptjs.compare(password,user.password)

        if (!isPasswordCorrect){
            return NextResponse.json({error:"Incorrect Password"},{status:400})
        }

        // create token
        const tokenData = {
            id:user._id,
            email:user.email,
            username:user.username
        }
        const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:"1d"})

        // set cookie
        const response = NextResponse.json({
            message:"User Logged In Successfully",
            success:true,
           
        })

        response.cookies.set("token",token,{
            httpOnly:true
        })
        return response


    } catch (error:any) {
        return NextResponse.json(
            {error:error.message},
            {status:500}
        )
    }
}