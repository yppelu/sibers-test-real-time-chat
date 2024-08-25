import { PropTypes } from 'prop-types';
import { useContext, useEffect, useState } from 'react';

import { SocketContext } from '../../helpers/socket.js';

export default function Messages({ roomName }) {
  const socket = useContext(SocketContext);
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const onReceiveMessage = (message) => {
      const messageWithDate = {
        ...message,
        sent: new Date().toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prevMessages) => [...prevMessages, messageWithDate]);
    };

    socket.on('receiveMessage', onReceiveMessage);

    return () => {
      socket.off('receiveMessage', onReceiveMessage);
    };
  });

  return (
    <>
      <div className="room-window__messages-container">
        {
          messages.map(message => (
            <div
              key={message.userId}
              className={
                message.userId === socket.id
                  ? 'room-window__message room-window__message--own'
                  : 'room-window__message'
              }
            >
              <p className="room-window__message-username">{message.username}</p>
              <p>{message.text}</p>
              <p className="room-window__message-date">{message.sent}</p>
            </div>
          ))
        }
      </div>
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
    </>
  );
}

Messages.propTypes = {
  roomName: PropTypes.string
};
