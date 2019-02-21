const http = require("http");
const debug = require("debug")("server-chat");
const app = require("./backend/app");

const port = process.env.PORT || 3000;
app.set("port", port);

const server = http.createServer(app);
server.listen(port);



var socketo = require("socket.io");
var io = socketo(server);

io.on("connection", (socket) => {



  socket.on("message",(message) => {

    socket.broadcast.emit("message",message);
  });


});
