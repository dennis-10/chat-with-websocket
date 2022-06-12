const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server, { cors: { origin: "*"}})
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'html')

app.get('/', (req, res) => {
    res.render('index.html')
})

server.listen(3000, () => {
    console.log("Server running...")
})

let messages = []

io.on('connection', (socket) => {
    console.log("User connected: " + socket.id)

    socket.emit("previousMessages", messages);

    socket.on("sendMessage", (data) => {
        messages.push(data)
        socket.broadcast.emit('receivedMessage', data)
        socket.emit('receivedMessage', data)
    })
})