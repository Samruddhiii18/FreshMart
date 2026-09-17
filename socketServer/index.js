import express from 'express'
import http from 'http'
import dotenv from 'dotenv'
import { Server } from 'socket.io'
import axios from 'axios'

dotenv.config()

const app = express()

app.use(express.json())

const server = http.createServer(app)

const port = process.env.PORT || 5000

const io = new Server(server, {
    cors: {
        origin: process.env.NEXT_BASE_URL
    }
})

io.on("connection", (socket) => {

    console.log("🔌 Socket connected:", socket.id)


    // =========================
    // USER IDENTITY
    // =========================

    socket.on("Identity", async (userId) => {

        try {

            console.log("👤 Identity received:", userId)

            await axios.post(
                `${process.env.NEXT_BASE_URL}/api/socket/connect`,
                {
                    userId,
                    socketId: socket.id
                }
            )

            console.log("✅ Socket ID saved")

        } catch (error) {

            console.error(
                "❌ Identity error:",
                error
            )
        }
    })


    // =========================
    // DELIVERY BOY LOCATION
    // =========================

    socket.on(
        "Update-Location",
        async ({
            userId,
            latitude,
            longitude
        }) => {

            try {

                console.log("📍 Location received:", {
                    userId,
                    latitude,
                    longitude
                })

                const location = {
                    type: "Point",
                    coordinates: [
                        longitude,
                        latitude
                    ]
                }


                // Update MongoDB
                await axios.post(
                    `${process.env.NEXT_BASE_URL}/api/socket/update-location`,
                    {
                        userId,
                        location
                    }
                )

                console.log(
                    "✅ Location updated in database"
                )


                // Send location to connected clients
                io.emit(
                    "update-deliveryBoy-location",
                    {
                        userId,
                        location
                    }
                )

                console.log(
                    "🚀 Location emitted to clients"
                )

            } catch (error) {

                console.error(
                    "❌ Location update error:",
                    error
                )
            }
        }
    )

    socket.on("join-room",(roomId) =>{
        console.log("Join room with",roomId)
        socket.join(roomId)
    })

    socket.on("send-message",async (message) => {
        console.log(message)
        await axios.post(`${process.env.NEXT_BASE_URL}/api/chat/save`,message)
        io.to(message.roomId).emit("send-message",message)
    })

    // =========================
    // DISCONNECT
    // =========================

    socket.on("disconnect", () => {

        console.log(
            "🔴 User disconnected:",
            socket.id
        )

    })

})


// =========================
// NOTIFY API
// =========================

app.post("/notify", (req, res) => {

    const {
        event,
        data,
        socketId
    } = req.body

    if (socketId) {

        io.to(socketId).emit(
            event,
            data
        )

    } else {

        io.emit(
            event,
            data
        )
    }

    return res.status(200).json({
        success: true
    })
})


server.listen(port, () => {

    console.log(
        `🚀 Socket server started on port ${port}`
    )

})