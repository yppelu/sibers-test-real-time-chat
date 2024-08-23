import './roomWindow.css';

import { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';

import UsersList from './UsersList.jsx';

export default function RoomWindow({ socket, roomName }) {
  const [usersInRoom, setUsersInRoom] = useState([]);

  useEffect(() => {
    const onGetUsersInRoom = (newUsersInRoom) => {
      setUsersInRoom(newUsersInRoom);
    };

    socket.on('getUsersInRoom', onGetUsersInRoom);

    socket.emit('getUsersInRoom', roomName);
    return () => {
      socket.off('getUsersInRoom', onGetUsersInRoom);
    };
  }, [roomName, socket]);

  return (
    <div className="room-window">
      <div className="room-window__header">
        <div className="room-window__room-info-container">
          <h2 className="room-window__room-name">{roomName}</h2>
          <p className="room-window__number-of-users-in-room">{usersInRoom.length} users in the chat</p>
        </div>
        <button className="room-window__leave-chat-button" type="button">Leave chat</button>
      </div>
      <UsersList usersInRoom={usersInRoom} />
      <div className="room-window__messages-container"></div>
      <form className="room-window__message-form">
        <input autoFocus className="room-window__message-input" type="text" name="message" placeholder="Enter a message..." />
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
  socket: PropTypes.object,
  roomName: PropTypes.string
};
