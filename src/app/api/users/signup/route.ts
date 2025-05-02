import { connect } from "@/app/dbConfig/dbConfig"
import User from "@/models/userModel.js"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import { sendEmail } from "@/helpers/mailer"


connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { email, username, password } = reqBody

        console.log(reqBody)

        // Checking if user Already exists or Not
        const user = await User.findOne({ email })

        if (user) {
            return NextResponse.json({ error: "User Already Exists" }, { status: 400 })
        }

        // hashing the password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        // save a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser)

        // sending the verification email
        await sendEmail({
            email,
            emailType: "VERIFY",
            userId: savedUser._id
        })

        return NextResponse.json({
            message: "User was created Successfully",
            success: true,
            savedUser
        })



    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        )
    }
}