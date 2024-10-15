const express = require("express");
const http = require("http").createServer();
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());

let clients = {};

io.on("connection", (socket) => {
    console.log("New client " + socket.id + " connected");

    socket.on("setUsername", (username) => {
        clients[socket.id] = {username, socketId: socket.id}; 
        io.emit("clients", Object.values(clients));
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected: " + socket.id);
        delete clients[socket.id]; 
        io.emit("clients", Object.values(clients));
    });

    socket.on("challengePlayer", (challengedSocketId) => {
        const challenger = clients[socket.id]; 
        if (challenger && challengedSocketId) {
            io.to(challengedSocketId).emit("receiveChallenge", challenger.username);
        }
    });

    socket.on("challengeAccepted", (roomId) => {
        socket.join(roomId)
        console.log(`Client ${clients[socket.id].username} joined room: ${roomId}`)
        io.to(roomId).emit("message", `Client ${clients[socket.id].username} joined the room: ${roomId}`)
    })
});

http.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})