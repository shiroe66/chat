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
    const found = users.find((nickname) => nickname === data)

    if (!found) {
      users.push(data)
      socket.nickname = data
      io.sockets.emit("login", { status: "OK" })
      io.sockets.emit("users", { users })
    } else {
      io.sockets.emit("login", { status: "FAILED" })
    }
  })

  socket.on("message", (data) => {
    io.sockets.emit("new message", {
      nickname: socket.nickname,
      message: data,
      time: new Date().toDateString(),
    })
  })

  socket.on("disconnect", () => {
    const indexByUser = users.findIndex((user) => user === socket.nickname)
    users.splice(indexByUser, 1)

    io.sockets.emit("users", { users })
  })
})

server.listen("3000", () => {})
