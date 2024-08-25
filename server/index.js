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

    const usersInRoom = User.getUsersInRoom(roomName);
    io.in(roomName).emit('getUsersInRoom', usersInRoom);
  });

  socket.on('leaveRoom', (userId, roomName) => {
    User.updateUser(userId, { room: '' });
    socket.leave(roomName);

    const usersInRoom = User.getUsersInRoom(roomName);
    socket.broadcast.to(roomName).emit('getUsersInRoom', usersInRoom);
  });

  socket.on('sendMessage', (messageText, roomName) => {
    const message = {
      userId: socket.id,
      username: User.getUserById(socket.id).username,
      text: messageText
    };
    io.in(roomName).emit('receiveMessage', message);
  });

  socket.on('disconnect', () => {
    const roomUserWasIn = User.getUserById(socket.id).room;
    User.removeUserById(socket.id);

    const usersInRoom = User.getUsersInRoom(roomUserWasIn);
    socket.broadcast.to(roomUserWasIn).emit('getUsersInRoom', usersInRoom);
  });
});
