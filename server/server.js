const express = require("express")
const http = require("http").createServer()
const io = require("socket.io")(http, {
    cors: {
        origin: "*",
    },
})
const cors = require("cors")

const app = express()
const port = 3000

app.use(cors())

let clients = {}
let challenges = {}
let clientColors = {}; 

io.on("connection", (socket) => {
    console.log("New client " + socket.id + " connected")

    socket.on("setUsername", (username) => {
        clients[socket.id] = {username, socketId: socket.id}; 
        io.emit("clients", Object.values(clients));
    });

    socket.on("setColor", ({ username, color }) => {
        clientColors[username] = color;
        io.emit("colorChange", { username, color }); 
    });
    
    socket.on("disconnect", () => {
        console.log("Client disconnected: " + socket.id);
        const username = clients[socket.id];
        delete clients[socket.id]; 
        delete clientColors[username]; 
        io.emit("clients", Object.values(clients));
    });   

    socket.on("challengePlayer", (challengedSocketId) => {
        const challenger = clients[socket.id]
        if (challenger && challengedSocketId) {
            challenges[challengedSocketId] = challenger.socketId
            io.to(challengedSocketId).emit("receiveChallenge", challenger.username)
        }
    })

    socket.on("challengeAccepted", () => {
        const challenger = challenges[socket.id]
        
        if (challenger) {
            const roomId = `${challenger}_${socket.id}`
            socket.join(roomId)
            io.sockets.sockets.get(challenger).join(roomId)

            const clients = io.sockets.adapter.rooms.get(roomId)
            console.log(clients)

            io.sockets.in(roomId).emit("redirect", "/game")
        }
    })
})

http.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})
