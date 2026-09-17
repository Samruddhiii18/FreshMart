'use client'

import { getSocket } from '@/lib/socket'
import React, { useEffect } from 'react'

function GeoUpdate({ userId }: { userId: string }) {

    useEffect(() => {

        if (!userId) return

        const socket = getSocket()

        // Send user identity
        socket.emit("Identity", userId)

        // Check browser support
        if (!navigator.geolocation) {
            console.log("Geolocation is not supported")
            return
        }

        const watcher = navigator.geolocation.watchPosition(
            (pos) => {

                const latitude = pos.coords.latitude
                const longitude = pos.coords.longitude

                console.log("📍 Location:", {
                    latitude,
                    longitude
                })

                socket.emit("Update-Location", {
                    userId,
                    latitude,
                    longitude
                })
            },
            (err) => {
                console.log("❌ Geolocation error:", err)
            },
            {
                enableHighAccuracy: true,
                maximumAge: 0,
                timeout: 10000
            }
        )

        return () => {
            navigator.geolocation.clearWatch(watcher)
        }

    }, [userId])

    return null
}

export default GeoUpdate