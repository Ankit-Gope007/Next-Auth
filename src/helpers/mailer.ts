import nodemailer from 'nodemailer';
import User from "@/models/userModel.js";
import { connect } from "@/app/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";


export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        // creating a hashed token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        // defining the type of email that we are sending
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000
            } // 1 hour
            )
        }
        else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000
            } // 1 hour
            )
        }

        // creating a transporter
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        });

        // defining the mail options
        const mailOptions = {
            from: process.env.MAIL_FROM,
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: emailType === "VERIFY" ? `<h1>Click on the link to verify your email</h1>
            <a href="${process.env.DOMAIN}/verifyEmail?token=${hashedToken}">Click Here</a>` :
                `<h1>Click on the link to reset your password</h1>
            <a href="${process.env.DOMAIN}/resetPassword?token=${hashedToken}">Click Here</a>`,
            text: emailType === "VERIFY" ? `Click on the link to verify your email
            ${process.env.DOMAIN}/verifyEmail?token=${hashedToken}` :
                `Click on the link to reset your password
            ${process.env.DOMAIN}/resetPassword?token=${hashedToken}`,

        };


        const mailResponse = await transport.sendMail(mailOptions);

        return mailResponse;


    } catch (error: any) {
        console.log("Error in sending email:", error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );

    }
}