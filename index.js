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
  console.log(socket)
  users.push(socket)
})

app.listen("3000", () => {
  console.log("work")
})
