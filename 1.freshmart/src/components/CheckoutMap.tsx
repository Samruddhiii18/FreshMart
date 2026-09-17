'use client'

import React, { useEffect } from 'react'
import "leaflet/dist/leaflet.css"
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet'
import L, { LatLngExpression } from 'leaflet'

const markerIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/684/684908.png",
    iconSize: [40,40],
    iconAnchor:[20,40]
})

type props = {
    position: [number, number],
    setPosition: (pos: [number, number]) => void,
    fetchAddress: (pos: [number, number]) => void
}

function DraggableMarker({ 
    position, 
    setPosition,
    fetchAddress
}: {
    position: [number, number],
    setPosition: (pos: [number, number]) => void,
    fetchAddress: (pos: [number, number]) => void
}) {

    const map = useMap()

    useEffect(() => {
        map.setView(position as LatLngExpression, 15, { animate: true })
    }, [position, map])

    return (
        <Marker
            icon={markerIcon}
            position={position as LatLngExpression}
            draggable={true}
            eventHandlers={{
                dragend: (e: L.LeafletEvent) => {

                    const marker = e.target as L.Marker

                    const { lat, lng } = marker.getLatLng()

                    const newPosition: [number, number] = [lat, lng]

                    setPosition(newPosition)

                    fetchAddress(newPosition)
                }
            }}
        />
    )
}

function CheckoutMap({ 
    position, 
    setPosition,
    fetchAddress
}: props) {

    return (
        <MapContainer
            center={position as LatLngExpression}
            zoom={13}
            scrollWheelZoom={true}
            className='w-full h-full'
        >

            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <DraggableMarker
                position={position}
                setPosition={setPosition}
                fetchAddress={fetchAddress}
            />

        </MapContainer>
    )
}

export default CheckoutMap