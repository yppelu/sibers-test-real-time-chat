import { useEffect } from 'react';
import socket from './socket.js';

import RoomWindow from './components/room-window/RoomWindow.jsx';
import WelcomeWindow from './components/welcome-window/WelcomeWindow.jsx';

export default function App() {
  useEffect(() => {
    socket.connect();

    socket.on('connect', () => {
      console.log('Connected.');
    });
  }, []);

  return (
    <main className="main">

    </main>
  );
}
