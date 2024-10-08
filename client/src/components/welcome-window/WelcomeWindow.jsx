import './welcomeWindow.css';

import { PropTypes } from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../../socket.js';

import CreateUserForm from './CreateUserForm.jsx';
import ChooseRoomForm from './ChooseRoomForm.jsx';

export default function WelcomeWindow({ joinRoom }) {
  const socket = useContext(SocketContext);
  const [step, setStep] = useState(0);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const onGetUserById = (user) => {
      if (user) {
        setUsername(user.username);
        setStep(2);
      } else {
        setStep(1);
      }
    };

    socket.on('getUserById', onGetUserById);

    socket.emit('getUserById', socket.id);
    return () => {
      socket.off('getUserById', onGetUserById);
    };
  }, []);

  function handleSubmitUsername(username) {
    socket.emit('createUser', socket.id, username);
    setUsername(username);
    setStep(step => step + 1);
  }

  return (
    step === 0 ? null :
      <div className="welcome-window">
        {step === 1 && <CreateUserForm submitUsername={handleSubmitUsername} />}
        {step === 2 && <ChooseRoomForm username={username} joinRoom={joinRoom} />}
      </div>
  );
}

WelcomeWindow.propTypes = {
  joinRoom: PropTypes.func
};
