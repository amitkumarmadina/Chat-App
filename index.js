const { on } = require('cluster');
const { log } = require('console');
const express = require('express');
const http = require('http');
const path = require('path');
const {Server} = require('socket.io');
const PORT = 3000;
const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    //console.log('A user connected', socket.id);
    socket.on("user-message", (message) => {
        //console.log("A new user message", message);
        io.emit("message", message);
    })
});
app.use(express.static(path.resolve('./public')));

app.get('/', (req, res) => {
    return res.sendFile(path.resolve('./public/index.html'));
});
server.listen(PORT,() => {
    console.log(`Server is listening on port ${PORT}`);
});