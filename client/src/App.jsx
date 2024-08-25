import { useEffect, useState } from 'react';
import { socket, SocketContext } from './helpers/socket.js';

import RoomWindow from './components/room-window/RoomWindow.jsx';
import WelcomeWindow from './components/welcome-window/WelcomeWindow.jsx';

export default function App() {
  const [isInRoom, setIsInRoom] = useState(false);
  const [roomName, setRoomName] = useState(null);

  useEffect(() => {
    const onUserWasRemoved = (userId) => {
      if (userId === socket.id) {
        setRoomName('');
        setIsInRoom(false);
        alert('You have been removed from the chat by chat Admin.');
      }
    };

    socket.on('userWasRemoved', onUserWasRemoved);

    return () => {
      socket.off('userWasRemoved', onUserWasRemoved);
    };
  }, []);

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
