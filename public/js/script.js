window.addEventListener("DOMContentLoaded", () => {
  const socket = io.connect()

  const nickname = document.querySelector(".login-form #nickname")
  const loginForm = document.querySelector(".login-form")

  const userLogined = document.querySelectorAll(".logined")

  const messageForm = document.querySelector(".message-form")
  const messageList = document.querySelector(".list-group")
  const message = document.querySelector(".message")

  const usersList = document.querySelector(".users-list")

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault()
    socket.emit("login", nickname.value)
  })

  messageForm.addEventListener("submit", (e) => {
    e.preventDefault()
    socket.emit("message", message.value)
    message.value = ""
  })

  socket.on("login", (data) => {
    if (data.status === "OK") {
      loginForm.classList.add("d-none")

      userLogined.forEach((element) => {
        element.classList.remove("d-none")
      })
    }
  })

  socket.on("new message", ({ nickname, time, message }) => {
    const item = document.createElement("li")
    item.classList.add("list-group-item", "list-group-item-action")
    item.innerHTML = `
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">${nickname}</h5>
                  <small class="text-muted">${time}</small>
                </div>
                <p class="mb-1">${message}</p>
              `

    messageList.append(item)
  })

  socket.on("users", ({ users }) => {
    usersList.innerHTML = ""
    console.log(users)
    users.forEach((user) => {
      const item = document.createElement("li")
      item.classList.add("list-group-item")
      item.innerHTML = user
      usersList.appendChild(item)
    })
  })
})
