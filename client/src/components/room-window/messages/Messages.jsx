import './messages.css';

import { PropTypes } from 'prop-types';
import { useContext, useEffect, useState } from 'react';

import { SocketContext } from '../../../helpers/socket.js';

export default function Messages() {
  const socket = useContext(SocketContext);

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
              key={message.messageId}
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
    </>
  );
}

Messages.propTypes = {
  roomName: PropTypes.string
};
