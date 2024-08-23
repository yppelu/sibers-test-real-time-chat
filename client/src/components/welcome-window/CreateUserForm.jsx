import { PropTypes } from 'prop-types';

export default function CreateUserForm({ submitUsername }) {
  return (
    <>
      <h2 className="welcome-window__title">Welcome!<br />Create a username.</h2>
      <form
        className="welcome-window__form"
        onSubmit={(event) => {
          event.preventDefault();
          const username = event.target.elements.username.value;
          submitUsername(username);
        }}
      >
        <input className="welcome-window__input" type="text" name="username" required autoFocus />
        <button className="welcome-window__submit-button" type="submit">Create</button>
      </form>
    </>
  );
}

CreateUserForm.propTypes = {
  submitUsername: PropTypes.func
};
