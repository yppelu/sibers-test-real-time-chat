import { PropTypes } from 'prop-types';
import { useContext, useState } from 'react';

import { SocketContext } from '../../helpers/socket.js';

export default function UsersList({ usersInRoom, isCurrentUserAdmin }) {
  const socket = useContext(SocketContext);
  const [searchInputValue, setSearchInputValue] = useState('');

  return (
    <div className="room-window__users">
      <form className="room-window__search-for-user-form">
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
  );
}

UsersList.propTypes = {
  usersInRoom: PropTypes.array,
  isCurrentUserAdmin: PropTypes.bool
};
