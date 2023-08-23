const express = require("express")
const cors = require('cors')
const mogoose = require("mongoose")
const config  = require("config")
const authRouter = require("./routes/authorization")
const http = require('http');
const { Server } = require("socket.io");



const app = express()
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        allowedHeaders:'*'
    }
});

let sesstions = 0;
io.on("connection", (socket) => {
    sesstions++
    socket.broadcast.emit('sesstionCountUpdate', sesstions);
    socket.on("disconnect", () => {
        sesstions--
        socket.broadcast.emit('sesstionCountUpdate', sesstions);
    })
})

// прослойка для передачи запросов на все домены
app.use(cors({
    origin: '*',
    allowedHeaders:'*'
}));

app.use(express.json())

//маршуты

app.use('/api/auth', authRouter)
// app.use('/api/files', fileRouter)



const PORT = process.env.PORT || config.get("ServerPort")
const serverStart = async () => {
    try {
        // подключение к БД monoose
        mogoose.connect(config.get("DataBaseURL"))
        mogoose.set('strictQuery', false)

        // для запуска сервера (по порту с соответствующим действием)
        server.listen(PORT, () => {
            console.log(`Server was started on ${PORT}`);
        })
        
        
    } catch (e) {
        
    }
}
serverStart()