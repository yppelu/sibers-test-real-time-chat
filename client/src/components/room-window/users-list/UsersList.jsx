import './usersList.css';

import { PropTypes } from 'prop-types';
import { useContext, useState } from 'react';

import { SocketContext } from '../../../socket.js';
import ShowHideMenuButton from '../show-hide-menu-button/ShowHideMenuButton.jsx';

export default function UsersList({ isMenuAboutToBeHidden, hideMenu, usersInRoom, isCurrentUserAdmin }) {
  const socket = useContext(SocketContext);
  const [searchInputValue, setSearchInputValue] = useState('');

  return (
    <>
      <div
        className={
          isMenuAboutToBeHidden
            ? 'room-window__users room-window__users--hidden'
            : 'room-window__users '
        }
      >
        <div className="room-window__users-header">
          <form
            className="room-window__search-for-user-form"
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <input
              className="room-window__username-to-search-input"
              type="text"
              name="username"
              placeholder="Search for a user"
              value={searchInputValue}
              onChange={(event) => {
                setSearchInputValue(event.target.value);
              }}
            />
          </form>
          <ShowHideMenuButton action={hideMenu} />
        </div>
        <ul>
          {
            usersInRoom
              .filter(user => user.username.toLowerCase().includes(searchInputValue.toLowerCase()))
              .map(user => (
                <li key={user.id} className="room-window__list-of-users-item">
                  <p>{user.username}</p>
                  {isCurrentUserAdmin && user.id !== socket.id &&
                    <button
                      type="button"
                      className="room-window__remove-user-button"
                      onClick={() => {
                        socket.emit('removeUser', user.id, user.room);
                      }}
                    >
                      🞪
                    </button>
                  }
                </li>
              ))
          }
        </ul>
      </div>
      <div className="room-window__users-hide-on-click-block" onClick={hideMenu}></div>
    </>
  );
}

UsersList.propTypes = {
  isMenuAboutToBeHidden: PropTypes.bool,
  hideMenu: PropTypes.func,
  usersInRoom: PropTypes.array,
  isCurrentUserAdmin: PropTypes.bool
};
