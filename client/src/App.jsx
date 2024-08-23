import { useState } from 'react';
import socket from './helpers/socket.js';

import RoomWindow from './components/room-window/RoomWindow.jsx';
import WelcomeWindow from './components/welcome-window/WelcomeWindow.jsx';

export default function App() {
  const [isInRoom, setIsInRoom] = useState(false);
  const [roomName, setRoomName] = useState(null);

  function joinRoom(newRoomName) {
    socket.emit('joinRoom', socket.id, newRoomName);
    setRoomName(newRoomName);
    setIsInRoom(true);
  }

  return (
    <main className="main">
      {
        isInRoom
          ? <RoomWindow socket={socket} roomName={roomName} />
          : <WelcomeWindow socket={socket} joinRoom={joinRoom} />
      }
    </main >
  );
}
