const { on } = require('cluster');
const express = require('express');
const http = require('http');
const path = require('path');
const {Server} = require('socket.io');
const PORT = 3000;
const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('A user connected', socket.id);
});
app.use(express.static(path.resolve('./public')));

app.get('/', (req, res) => {
    return res.sendFile(path.resolve('./public/index.html'));
});
server.listen(PORT,() => {
    console.log(`Server is listening on port ${PORT}`);
});