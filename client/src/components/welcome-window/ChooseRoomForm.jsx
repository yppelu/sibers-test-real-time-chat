export default function ChooseRoomForm() {
  return (
    <>
      <h2 className="welcome-window__title">Now choose the room:</h2>
      <form className="welcome-window__form">
        <input className="welcome-window__input" type="text" name="room-name" />
        <div className="welcome-window__buttons-container">
          <button className="welcome-window__submit-button" type="submit">Create room</button>
          <button className="welcome-window__submit-button" type="submit">Enter room</button>
        </div>
      </form>
    </>
  );
}
