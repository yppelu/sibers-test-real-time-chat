import './roomWindow.css';

import { PropTypes } from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../../helpers/socket.js';

import UsersList from './UsersList.jsx';
import Header from './Header.jsx';
import Messages from './Messages.jsx';

export default function RoomWindow({ roomName, leaveRoom }) {
  const socket = useContext(SocketContext);
  const [usersInRoom, setUsersInRoom] = useState([]);

  useEffect(() => {
    const onGetUsersInRoom = (newUsersInRoom) => {
      setUsersInRoom(newUsersInRoom);
    };

    socket.on('getUsersInRoom', onGetUsersInRoom);

    return () => {
      socket.off('getUsersInRoom', onGetUsersInRoom);
    };
  }, []);

  return (
    <div className="room-window">
      <Header roomName={roomName} numberOfUsersInRoom={usersInRoom.length} leaveRoom={leaveRoom} />
      <UsersList usersInRoom={usersInRoom} />
      <Messages roomName={roomName} />
    </div >
  );
}

RoomWindow.propTypes = {
  roomName: PropTypes.string,
  leaveRoom: PropTypes.func
};
