const { Server } = require("socket.io");

const io = new Server(3500, {
  cors: {
    origin: '*'
  }
});

io.on("connection", (socket) => {
  console.log('Connected.');

  socket.on('disconnect', () => {
    console.log('Disconnected');
  });
});
