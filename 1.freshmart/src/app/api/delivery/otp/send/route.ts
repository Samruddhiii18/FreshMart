import connectDb from "@/lib/db";
import { sendMail } from "@/lib/mailer";
import Order from "@/models/order.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    try {
        await connectDb()
        const {orderId} = await req.json()
        const order = await Order.findById(orderId).populate("user")
        if(!order){
            return NextResponse.json(
                {message:"Order not found"},
                {status:400}
            )
        }
        const otp = Math.floor(1000 + Math.random() * 9000).toString()
        order.deliveryOtp = otp
        await order.save()
        await sendMail(
    order.user.email,
    "Your FreshMart Delivery OTP",
    `
    <div style="
        font-family: Arial, sans-serif;
        background-color: #f4f7f4;
        padding: 40px 20px;
    ">
        <div style="
            max-width: 500px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            padding: 30px;
            text-align: center;
            box-shadow: 0 4px 15px rgba(0,0,0,0.08);
        ">
            
            <h1 style="
                color: #16a34a;
                margin-bottom: 10px;
            ">
                FreshMart
            </h1>

            <h2 style="
                color: #222222;
                margin-bottom: 10px;
            ">
                Delivery Verification
            </h2>

            <p style="
                color: #666666;
                font-size: 15px;
                line-height: 1.6;
            ">
                Your delivery OTP is:
            </p>

            <div style="
                display: inline-block;
                background-color: #f0fdf4;
                border: 2px dashed #22c55e;
                border-radius: 10px;
                padding: 15px 30px;
                margin: 15px 0;
            ">
                <span style="
                    font-size: 32px;
                    font-weight: bold;
                    letter-spacing: 8px;
                    color: #15803d;
                ">
                    ${otp}
                </span>
            </div>

            <p style="
                color: #777777;
                font-size: 14px;
            ">
                Please share this OTP with the delivery partner
                to confirm your order delivery.
            </p>

            <hr style="
                border: none;
                border-top: 1px solid #eeeeee;
                margin: 25px 0;
            ">

            <p style="
                color: #999999;
                font-size: 12px;
            ">
                If you did not request this OTP, please ignore this email.
            </p>

            <p style="
                color: #16a34a;
                font-weight: bold;
                font-size: 13px;
            ">
                Thank you for using FreshMart!
            </p>

        </div>
    </div>
    `
)
        return NextResponse.json(
            {message:"OTP send successfully"},
            {status:200}
        )
    } catch (error) {
        return NextResponse.json(
            {message:`OTP error ${error}`},
            {status:500}
        )
    }
}