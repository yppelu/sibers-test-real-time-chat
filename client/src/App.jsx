import { useState } from 'react';
import { socket, SocketContext } from './helpers/socket.js';

import RoomWindow from './components/room-window/RoomWindow.jsx';
import WelcomeWindow from './components/welcome-window/WelcomeWindow.jsx';

export default function App() {
  const [isInRoom, setIsInRoom] = useState(false);
  const [roomName, setRoomName] = useState(null);

  function handleJoinRoom(newRoomName) {
    socket.emit('joinRoom', socket.id, newRoomName);
    setRoomName(newRoomName);
    setIsInRoom(true);
  }

  function handleLeaveRoom() {
    socket.emit('leaveRoom', socket.id, roomName);
    setRoomName('');
    setIsInRoom(false);
  }

  return (
    <SocketContext.Provider value={socket} >
      <main className="main">
        {
          isInRoom
            ? <RoomWindow roomName={roomName} leaveRoom={handleLeaveRoom} />
            : <WelcomeWindow joinRoom={handleJoinRoom} />
        }
      </main >
    </SocketContext.Provider>
  );
}
