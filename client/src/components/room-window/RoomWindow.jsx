import './roomWindow.css';

import { PropTypes } from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../../socket.js';

import UsersList from './users-list/UsersList.jsx';
import Header from './header/Header.jsx';
import Messages from './messages/Messages.jsx';
import MessageForm from './message-form/MessageForm.jsx';

export default function RoomWindow({ roomName, leaveRoom }) {
  const socket = useContext(SocketContext);
  const [usersInRoom, setUsersInRoom] = useState([]);
  const [isCurrentUserAdmin, setIsCurrentUserAdmin] = useState(false);

  const [isMenuAboutToBeHidden, setIsMenuAboutToBeHidden] = useState(false);
  const [isMenuHidden, setIsMenuHidden] = useState(window.innerWidth < 786);

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

  function handleHideMenu() {
    setIsMenuAboutToBeHidden(true);
    setTimeout(() => setIsMenuHidden(true), 200);
  }

  function handleShowMenu() {
    setIsMenuAboutToBeHidden(false);
    setIsMenuHidden(false);
  }

  return (
    <div className="room-window">
      <Header showMenu={handleShowMenu} roomName={roomName} numberOfUsersInRoom={usersInRoom.length} leaveRoom={leaveRoom} />
      {isMenuHidden ? null :
        <UsersList
          hideMenu={handleHideMenu}
          isMenuAboutToBeHidden={isMenuAboutToBeHidden}
          usersInRoom={usersInRoom}
          isCurrentUserAdmin={isCurrentUserAdmin}
        />
      }
      <Messages />
      <MessageForm roomName={roomName} />
    </div >
  );
}

RoomWindow.propTypes = {
  roomName: PropTypes.string,
  leaveRoom: PropTypes.func
};
