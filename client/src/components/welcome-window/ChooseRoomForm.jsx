import { PropTypes } from 'prop-types';

export default function ChooseRoomForm({ username, joinRoom }) {
  return (
    <>
      <h2 className="welcome-window__title">Hello, {username}!<br />Now choose a chat:</h2>
      <form
        className="welcome-window__form"
        onSubmit={(event) => {
          event.preventDefault();
          const roomName = event.target.elements['room-name'].value;
          joinRoom(roomName);
        }}
      >
        <input className="welcome-window__input" type="text" name="room-name" required />
        <button
          className="welcome-window__submit-button"
          type="submit"
          name="enter"
        >
          Enter room
        </button>
      </form>
    </>
  );
}

ChooseRoomForm.propTypes = {
  username: PropTypes.string,
  joinRoom: PropTypes.func
};
