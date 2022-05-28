window.addEventListener("DOMContentLoaded", () => {
  const socket = io.connect()

  const nickname = document.querySelector(".login-form #nickname")
  const loginForm = document.querySelector(".login-form")

  const userLogined = document.querySelectorAll(".logined")

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault()
    socket.emit("login", nickname.value)
  })

  socket.on("login", (data) => {
    if (data.status === "OK") {
      loginForm.classList.add("d-none")

      userLogined.forEach((element) => {
        element.classList.remove("d-none")
      })
    }
  })
})
