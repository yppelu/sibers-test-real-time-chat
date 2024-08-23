import { PropTypes } from 'prop-types';
import { useState } from 'react';

export default function UsersList({ usersInRoom }) {
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
                {user.username}
              </li>
            ))
        }
      </ul>
    </div>
  );
}

UsersList.propTypes = {
  usersInRoom: PropTypes.array
};
