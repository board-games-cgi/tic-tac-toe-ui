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
let roomParticipants = {};
let gameStates = {};

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

            roomParticipants[roomId] = [challenger, socket.id]
            
            socket.join(roomId)
            io.sockets.sockets.get(challenger).join(roomId)
            io.to(roomId).emit("playerJoined", { playerId: socket.id });
            io.to(roomId).emit("playerJoined", { playerId: challenger });

            const clients = io.sockets.adapter.rooms.get(roomId)
            console.log(clients)
            console.log("roomId: ",roomId)
            io.sockets.in(roomId).emit("redirect", `game/${roomId}`)
        }
    })
    
    socket.on("checkRoomAccess", (roomId) => {
        const allowedParticipants = roomParticipants[roomId];
        const isAllowed = allowedParticipants && allowedParticipants.includes(socket.id);
        
        socket.emit("roomAccessResult", {isAllowed, allowedParticipants});
    });
    
    socket.on("makeMove", ({ roomId, cellIndex, player }) => {
        if (!gameStates[roomId]) {
            gameStates[roomId] = Array(9).fill(null); 
        }
        if (!gameStates[roomId][cellIndex]) {
            gameStates[roomId][cellIndex] = player;
            io.to(roomId).emit("updateBoard", { board: gameStates[roomId], nextPlayer: player === 'X' ? 'O' : 'X' });
        }
    });

    socket.on("closeGame", (roomId) => {
        io.in(roomId).emit('redirect', '/');
        io.in(roomId).socketsLeave(roomId);
    })
})

http.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})
