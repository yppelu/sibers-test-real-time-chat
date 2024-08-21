import './roomWindow.css';

export default function RoomWindow() {
  return (
    <div className="room-window">
      <div className="room-window__header">
        <div className="room-window__room-info-container">
          <h2 className="room-window__room-name">This is a room name</h2>
          <p className="room-window__number-of-users-in-room">XX users in the chat</p>
        </div>
        <button className="room-window__leave-chat-button" type="button">Leave chat</button>
      </div>
      <div className="room-window__users">
        <form className="room-window__search-for-user-form">
          <input className="room-window__username-to-search-input" type="text" name="username" placeholder="Search for a user" />
        </form>
        <ul>
          <li className="room-window__list-of-users-item">Dave</li>
          <li className="room-window__list-of-users-item">John</li>
          <li className="room-window__list-of-users-item">Salmon756</li>
          <li className="room-window__list-of-users-item">Taurus</li>
          <li className="room-window__list-of-users-item">A guy from Connecticut</li>
          <li className="room-window__list-of-users-item">AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa</li>
        </ul>
      </div>
      <div className="room-window__messages-container"></div>
      <form className="room-window__message-form">
        <input autoFocus className="room-window__message-input" type="text" name="message" placeholder="Enter a message..." />
        <button className="room-window__send-message-button" type="submit">
          <svg className="room-window__send-message-icon" viewBox="0 0 24 24">
            <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
          </svg>
        </button>
      </form>
    </div>
  );
}
