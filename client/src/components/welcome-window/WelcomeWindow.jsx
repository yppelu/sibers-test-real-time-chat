import './welcomeWindow.css';
import CreateUserForm from './create-user-form/CreateUserForm.jsx';

export default function WelcomeWindow() {
  return (
    <div className="welcome-window">
      <CreateUserForm />
    </div>
  );
}
