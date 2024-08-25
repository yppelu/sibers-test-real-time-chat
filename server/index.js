const { Server } = require("socket.io");
const User = require('./User.js');

const io = new Server(3500, {
  cors: {
    origin: '*'
  }
});

io.on('connection', (socket) => {
  socket.on('createUser', (userId, username) => {
    const newUser = new User(userId, username);
    User.saveUser(newUser);
  });

  socket.on('getUserById', (userId) => {
    const user = User.getUserById(userId);
    socket.emit('getUserById', user);
  });

  socket.on('joinRoom', (userId, roomName) => {
    User.updateUser(userId, { room: roomName });
    socket.join(roomName);
  });

  socket.on('leaveRoom', (userId, roomName) => {
    User.updateUser(userId, { room: '' });
    socket.leave(roomName);
  });

  socket.on('getUsersInRoom', (roomName) => {
    const usersInRoom = User.getUsersInRoom(roomName);
    socket.emit('getUsersInRoom', usersInRoom);
    socket.broadcast.to(roomName).emit('getUsersInRoom', usersInRoom);
  });

  socket.on('disconnect', (userId) => {
    User.removeUserById(userId);
  });
});
