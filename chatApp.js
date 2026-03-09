import { Server } from "socket.io";
import http from "http";

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

io.on("connection", (socket) => {

  socket.on("user-connected", (username) => {

    console.log(username, "user connected");

    io.emit("user-joined", `${username}`);
  });

  io.emit("user-connected", socket.id)
  socket.on("send-message", (msg) => {
    console.log(msg.username + ":" + msg.message)


    io.emit("receive-message", msg)
  })

})

server.listen(3000, () => {
  console.log("server is live on 3000")
})















