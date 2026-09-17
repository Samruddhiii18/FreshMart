import connectDb from "@/lib/db";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    try {

        await connectDb()

        const { userId, location } = await req.json()

        if (!userId || !location) {
            return NextResponse.json(
                {
                    message: "Missing userId or Location"
                },
                {
                    status: 400
                }
            )
        }

        const user = await User.findByIdAndUpdate(
            userId,
            {
                location
            },
            {
                new: true
            }
        )

        if (!user) {
            return NextResponse.json(
                {
                    message: "User not found"
                },
                {
                    status: 404
                }
            )
        }

        return NextResponse.json(
            {
                message: "Location Updated",
                location: user.location
            },
            {
                status: 200
            }
        )

    } catch (error) {

        console.error("Update location error:", error)

        return NextResponse.json(
            {
                message: "Update location error"
            },
            {
                status: 500
            }
        )
    }
}