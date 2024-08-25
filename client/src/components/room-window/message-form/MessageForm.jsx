import './messageForm.css';

import { PropTypes } from 'prop-types';
import { useContext, useState } from 'react';

import { SocketContext } from '../../../socket.js';

export default function MessageForm({ roomName }) {
  const socket = useContext(SocketContext);
  const [messageText, setMessageText] = useState('');

  return (
    <form
      className="room-window__message-form"
      onSubmit={(event) => {
        event.preventDefault();
        socket.emit('sendMessage', messageText, roomName);
        setMessageText('');
      }}
    >
      <input
        className="room-window__message-input"
        type="text"
        name="message"
        placeholder="Enter a message..."
        autoFocus
        value={messageText}
        onChange={(event) => {
          setMessageText(event.target.value);
        }}
      />
      <button className="room-window__send-message-button" type="submit">
        <svg className="room-window__send-message-icon" viewBox="0 0 24 24">
          <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
        </svg>
      </button>
    </form>
  );
}

MessageForm.propTypes = {
  roomName: PropTypes.string
};
