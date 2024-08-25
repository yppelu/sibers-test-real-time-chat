import './roomWindow.css';

import { PropTypes } from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../../helpers/socket.js';

import UsersList from './UsersList.jsx';
import Header from './Header.jsx';

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
  });

  return (
    <div className="room-window">
      <Header roomName={roomName} numberOfUsersInRoom={usersInRoom.length} leaveRoom={leaveRoom} />
      <UsersList usersInRoom={usersInRoom} />
      <div className="room-window__messages-container"></div>
      <form className="room-window__message-form">
        <input className="room-window__message-input" type="text" name="message" placeholder="Enter a message..." autoFocus />
        <button className="room-window__send-message-button" type="submit">
          <svg className="room-window__send-message-icon" viewBox="0 0 24 24">
            <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
          </svg>
        </button>
      </form>
    </div >
  );
}

RoomWindow.propTypes = {
  roomName: PropTypes.string,
  leaveRoom: PropTypes.func
};
