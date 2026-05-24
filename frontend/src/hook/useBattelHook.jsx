import { useEffect, useRef } from "react"
import { Client } from "@stomp/stompjs"
import SockJS from "sockjs-client";

export function useBattleSocket(roomCode, onMessageReceived,onRoomUpdate) {
    // useRef stores the STOMP client without causing re-renders
    const clientRef = useRef(null)
    const WS_URL = import.meta.env.VITE_WS_URL || "http://localhost:8080/ws"


    useEffect(() => {
        // Step 1 — Create STOMP client
        const client = new Client({
            // Step 2 — Use SockJS to connect to our backend
            webSocketFactory: () => new SockJS(WS_URL),

            // Step 3 — Heartbeat settings match our backend
            heartbeatIncoming: 10000,
            heartbeatOutgoing: 10000,

            // Step 4 — When connected, subscribe to the room topic
            onConnect: () => {
                console.log("WebSocket connected to room:", roomCode)

                client.subscribe(`/topic/battle/${roomCode}`, (message) => {
                    // Step 5 — When message arrives, parse it and call callback
                    const result = JSON.parse(message.body)
                    onMessageReceived(result)
                })
                 client.subscribe(`/topic/room/${roomCode}`, (message) => {
                    console.log("Room update received:", message.body)
                    const update = JSON.parse(message.body)
                    if (onRoomUpdate) onRoomUpdate(update)
                })
            },

            // Step 6 — Log any errors
            onStompError: (frame) => {
                console.error("WebSocket error:", frame)
            },

            onDisconnect: () => {
                console.log("WebSocket disconnected")
            }
        })

        // Step 7 — Start the connection
        client.activate()

        // Step 8 — Save client reference so we can use it later
        clientRef.current = client

        // Step 9 — Cleanup when component unmounts
        // This disconnects WebSocket when user leaves the page
        return () => {
            if (client.active) {
                client.deactivate()
            }
        }

    }, [roomCode]) // re-run if roomCode changes

    // Step 10 — Return a function to SEND messages
    const sendSubmission = (code, language, email) => {
    console.log("Sending submission via WebSocket...")
    if (clientRef.current && clientRef.current.active) {
        clientRef.current.publish({
            destination: `/app/battle/${roomCode}/submit`,
            body: JSON.stringify({
                code: code,
                language: language.toUpperCase(),
                submitterEmail: email
            })
        })
    }
}

    return { sendSubmission }
}