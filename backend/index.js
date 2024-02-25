const express = require("express")
const path = require('path');
const cors = require("cors")
const morgan = require("morgan");
const { DBConnection } = require("./db");
const { UserRouter } = require("./routes/user.routes");
require('dotenv').config();
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

app.use(express.static(path.join(__dirname, '../frontend/view/chatbox.html')));

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


    ////<---------------------------- webRTC code------------------->
    
  socket.on("join", function (roomname) {
    var rooms = io.sockets.adapter.rooms; //create default room.

    var room = rooms.get(roomname); //get room from client.
    // console.log(room);

    //if client has not pass any room.so only one user joined the room
    if (room == undefined) {
      socket.join(roomname); // create a room
      socket.emit("created");
      console.log("Room Joined");
    } else if (room.size == 1) {
      //I want 2 user chat so if room size is only one then another user can join the room.
      socket.join(roomname);
      socket.emit("joined");
    } else {
      socket.emit("full");
      console.log("Room full for now"); //not more than 2 user joined the room.
    }
    // console.log(rooms);
  });

  //1st step ready for join
  socket.on("ready", function (roomName) {
    console.log("Ready");
    socket.broadcast.to(roomName).emit("ready");
  });
  //second step==>candidate in both side. first getting the candidate on server side then sending the candidate in client side.
  socket.on("candidate", function (candidate, roomName) {
    // console.log("candidate");
    // console.log(candidate);
    socket.broadcast.to(roomName).emit("candidate", candidate);
  });

  //create an offer==>create on both side. so getting the offer on server side and sending to the clinet side.
  socket.on("offer", function (offer, roomName) {
    console.log("offer");
    // console.log(offer);
    socket.broadcast.to(roomName).emit("offer", offer);
  });

  //answer step. either cut the call or pick up.
  socket.on("answer", function (answer, roomName) {
    console.log("answer");
    socket.broadcast.to(roomName).emit("answer", answer); //sending ans to the client .
  });

  //leave room code.
  socket.on("leave", function (roomName) {
    socket.leave(roomName);
    socket.broadcast.to(roomName).emit("leave");
  });

}