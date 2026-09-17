import { io, Socket } from "socket.io-client"

let socket:Socket | null = null

export const getSocket = () =>{
    if(!socket){
        socket = io(process.env.NEXT_PUBLIC_SOCKET_SERVER)
        socket.on("connect", () => console.log("✅ connected:", socket?.id))
        socket.on("connect_error", (err) => console.log("❌ connect error:", err.message))
    }
    return socket
}