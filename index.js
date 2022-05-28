const express = require("express")
const app = express()
const server = require("http").Server(app)
const io = require("socket.io")(server)

const users = []

app.use(express.static(__dirname + "/public"))

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html")
})

io.on("connection", (socket) => {
  socket.on("login", (data) => {
    if (users.includes(data)) {
      io.sockets.emit("login", { status: "FAILED" })
    } else {
      users.push(data)
      io.sockets.emit("login", { status: "OK" })
    }
  })
})

server.listen("3000", () => {})
