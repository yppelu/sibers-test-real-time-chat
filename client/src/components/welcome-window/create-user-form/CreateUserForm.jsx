import './createUserForm.css';

export default function CreateUserForm() {
  return (
    <>
      <h2 className="welcome-window__title">Hello! Create a username a let&apos;s begin!</h2>
      <form className="welcome-window__form">
        <input className="welcome-window__input" type="text" name="username" />
        <button className="welcome-window__submit-button" type="submit">Create</button>
      </form>
    </>
  );
}
