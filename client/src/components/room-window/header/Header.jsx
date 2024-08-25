import './header.css';
import { PropTypes } from 'prop-types';

export default function Header({ roomName, numberOfUsersInRoom, leaveRoom }) {
  return (
    <div className="room-window__header">
      <div className="room-window__room-info-container">
        <h2 className="room-window__room-name">{roomName}</h2>
        <p className="room-window__number-of-users-in-room">{numberOfUsersInRoom} users in the chat</p>
      </div>
      <button
        className="room-window__leave-chat-button"
        type="button"
        onClick={leaveRoom}
      >
        Leave chat
      </button>
    </div>
  );
}

Header.propTypes = {
  roomName: PropTypes.string,
  numberOfUsersInRoom: PropTypes.number,
  leaveRoom: PropTypes.func
};
