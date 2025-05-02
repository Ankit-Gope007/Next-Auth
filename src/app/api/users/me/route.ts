import { getTokenFromData } from "@/helpers/getTokenFromData";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel.js";
import { connect } from "@/app/dbConfig/dbConfig";
import jwt from "jsonwebtoken";


connect()

export async function GET(request: NextRequest) {
    try {
        const userId = await getTokenFromData(request);
        const user = await User.findOne({ _id: userId }).select("-password");

        return NextResponse.json({
            message: "User Found",
            success: true,
            data:user,
        });
        
    } catch (error: any) {
        console.log("Error in getting user data:", error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
        
    }
}