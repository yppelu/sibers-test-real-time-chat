import './roomWindow.css';

import { PropTypes } from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../../helpers/socket.js';

import UsersList from './users-list/UsersList.jsx';
import Header from './header/Header.jsx';
import Messages from './messages/Messages.jsx';
import MessageForm from './message-form/MessageForm.jsx';

export default function RoomWindow({ roomName, leaveRoom }) {
  const socket = useContext(SocketContext);
  const [usersInRoom, setUsersInRoom] = useState([]);
  const [isCurrentUserAdmin, setIsCurrentUserAdmin] = useState(false);

  useEffect(() => {
    const onGetUsersInRoom = (newUsersInRoom) => {
      setUsersInRoom(newUsersInRoom);
    };

    socket.on('getUsersInRoom', onGetUsersInRoom);
    socket.once('isUserAdmin', (isAdmin) => {
      setIsCurrentUserAdmin(isAdmin);
    });

    return () => {
      socket.off('getUsersInRoom', onGetUsersInRoom);
    };
  }, []);

  return (
    <div className="room-window">
      <Header roomName={roomName} numberOfUsersInRoom={usersInRoom.length} leaveRoom={leaveRoom} />
      <UsersList usersInRoom={usersInRoom} isCurrentUserAdmin={isCurrentUserAdmin} />
      <Messages />
      <MessageForm roomName={roomName} />
    </div >
  );
}

RoomWindow.propTypes = {
  roomName: PropTypes.string,
  leaveRoom: PropTypes.func
};
