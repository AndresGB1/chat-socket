const  express =  require('express');
const app = express();

const PORT = 8080;

const http = require('http').Server(app);
const cors = require('cors');

const socketCallback = require('socket.io');
const socketIO = socketCallback(http, {
    cors: {
        origins: ['http://localhost:3000']
    },
})

app.use(cors());

let users = [];

app.get("/api", (req,res) => {
    res.json({
        message: 'Hello world from API'
    });
});

socketIO.on('connection',(socket) =>{
    console.log("socket start with socket ID: ", socket.id);

    //message handler
    socket.on("message", (data) => {
        socketIO.emit('messageResponse', data);
    });

    //users handler
    socket.on("newUser", (data) =>{
        users.push(data);
        socketIO.emit("newUserResponse",users);
    })

    //remove user
    socket.on("removeUser",(id)=>{
        users.splice(users.findIndex((e) => e.socketID ===id),1);
        socketIO.emit("newUserResponse",users);
    })

    //typing handler 
    socket.on("typing", (data) => {
        socketIO.emit("typingResponse", data);
    })
    
    //receive message from the client
    socket.on("helloFromClient",(...args) => {
        console.log('client args: ', args);

         //send message to the client
        socket.emit("helloFromServer",args);
    });
    
    socket.on('disconnect', () => {
        console.log("User disconneceted");
    })
});

http.listen(PORT, () =>{
    console.log('Server is running at port',PORT);
});
