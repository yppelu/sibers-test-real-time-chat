import './welcomeWindow.css';
import CreateUserForm from './CreateUserForm.jsx';
import ChooseRoomForm from './ChooseRoomForm.jsx';

export default function WelcomeWindow() {
  return (
    <div className="welcome-window">
      <ChooseRoomForm />
    </div>
  );
}
