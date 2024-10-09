const express = require("express");
const http = require("http").createServer();
const io = require("socket.io")(http, {
    cors:{
        origin:"*"
    }
});
const cors = require("cors");


const app = express();
const port = 3000;

app.use(cors());

app.get("/",(req, res) => {
    res.send("test")
});

io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on('message',(data) => {
        console.log('Recieved message:',data);
        io.emit('message',data)
    })

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

http.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})