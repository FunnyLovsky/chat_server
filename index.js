

const WebSocket = require("ws");

const port = process.env.PORT || 8080;

const server = new WebSocket.Server({ port });

server.on("connection", (socket) => {
  console.log("Новое соединение");

  socket.on("message", (message) => {
    server.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  socket.on("close", () => {
    console.log("Соединение закрыто");
  });
});

console.log("WebSocket сервер запущен на порту 8080");
