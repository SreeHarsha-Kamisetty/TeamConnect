const express = require("express")
const path = require('path');
const cors = require("cors")
const morgan = require("morgan");
const { DBConnection } = require("./db");
const { UserRouter } = require("./routes/user.routes");
const PORT = process.env.PORT || 8080

const app = express();
app.use(express.json())
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.use("/users",UserRouter)

app.get("/",(req,res)=>{
    res.send("Home")
})


const server=app.listen(PORT,async()=>{
    try {
        await DBConnection
        console.log("Connected to DB")
        console.log(`Server running at http://localhost:${PORT}`)
    } catch (error) {
        console.log(err);
    }
    
})
const io = require('socket.io')(server, {
    cors: {
        origin: ['http://127.0.0.1:5500'],
        methods: ['GET', 'POST'],
        credentials: true
    },
});

app.use(express.static(path.join(__dirname, 'view/index.html')));

io.on('connection', onConnected);

let socketsConnected = new Set();

function onConnected(socket) {
    console.log(socket.id);
    socketsConnected.add(socket.id);

    io.emit('clients-total', socketsConnected.size);

    socket.on('join room', (room) => {
        socket.join(room);
        console.log(`User joined room: ${room}`);
    
        // Listen for chat messages in the specific room
        socket.on('chat message', (msg) => {
          io.to(room).emit('chat message', msg); // Broadcast the message to all users in the room
        });
    
        // Handle disconnection
        socket.on('disconnect', () => {
          console.log('User disconnected');
        });
      });
    socket.on('disconnect', () => {
        console.log('Socket disconnected', socket.id);
        socketsConnected.delete(socket.id);
        io.emit('clients-total', socketsConnected.size);
    });

    socket.on('message', (data) => {
        console.log(data);
        socket.broadcast.emit('chat-group-mesg', data);
    });

    socket.on('feedback', (data) => {
        socket.broadcast.emit('feedback', data);
    });
}