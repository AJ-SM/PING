import { WebSocketServer, WebSocket } from "ws";

interface User {
    socket: WebSocket,
    name:string
    id:number,
    room: string
};

let allSocket: User[] = [];
const ws = new WebSocketServer({ host: '0.0.0.0', port: 3000 });

let connect = 0 
ws.on("connection", (socket) => {
    connect +=1
    console.log(`Total Connections ${connect}`)
    console.log(`Total Socket/Users ${allSocket.length}`)
    socket.on("message", (message) => {
        //@ts-ignore
        const MessageParsed = JSON.parse(message);
        if (MessageParsed.type == "join") {
            allSocket.push({
                socket,
                name:MessageParsed.payload.name,
                id:MessageParsed.payload.id,
                room: MessageParsed.payload.roomId
            })
            
        }
        if (MessageParsed.type == "chat") {
            let currentUserRoom = null;
            for (let i = 0; i < allSocket.length; i++) {
                if (allSocket[i].socket == socket) {
                    currentUserRoom = allSocket[i].room
                }
            }
            for (let i = 0; i < allSocket.length; i++) {
                if (allSocket[i].room == currentUserRoom) {
                    allSocket[i].socket.send(JSON.stringify({"name":MessageParsed.payload.name,"message":MessageParsed.payload.message,"id":MessageParsed.payload.id}))
                }
            }

        }

    }

)



})
