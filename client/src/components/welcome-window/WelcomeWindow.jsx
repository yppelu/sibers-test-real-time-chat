import './welcomeWindow.css';

import { PropTypes } from 'prop-types';
import { useState } from 'react';

import CreateUserForm from './CreateUserForm.jsx';
import ChooseRoomForm from './ChooseRoomForm.jsx';

export default function WelcomeWindow({ socket, joinRoom }) {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState('');

  function handleSubmitUsername(username) {
    socket.emit('createUser', socket.id, username);
    setUsername(username);
    setStep(step => step + 1);
  }

  return (
    <div className="welcome-window">
      {step === 1 && <CreateUserForm submitUsername={handleSubmitUsername} />}
      {step === 2 && <ChooseRoomForm username={username} joinRoom={joinRoom} />}
    </div>
  );
}


WelcomeWindow.propTypes = {
  socket: PropTypes.object,
  joinRoom: PropTypes.func
};
