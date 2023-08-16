const express = require("express")
const cors = require('cors')
const mogoose = require("mongoose")
const config  = require("config")
const authRouter = require("./routes/authorization")
const path = require("path")
const expressWs = require('express-ws')

const app = express()
expressWs((ws, req) => {
    ws.on('message', (msg) => {
        msg = JSON.parse(msg)
        switch (msg.method) {
            case "connection":
                connectionHandler(ws, msg)
                break
            case "draw":
                broadcastConnection(ws, msg)
                break
        }
    })
})

// web Sockets


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


        // для запуска сервера (по порту с соответствующим действием)
        app.listen(PORT, () => {
            console.log(`Server was started on ${PORT}`);
        })
        
        
    } catch (e) {
        
    }
}
serverStart()