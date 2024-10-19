import { useState } from 'react';
import { Socket } from 'socket.io-client';
import '../styles/LoginStyles.css';

interface LoginProps {
  setIsLogin: (isLogin: boolean) => void;
  setCurrentUser: React.Dispatch<React.SetStateAction<{ currentUsername: string; currentRoom: string }>>;
  socket: Socket;
}

const Login = ({ setIsLogin, setCurrentUser, socket }: LoginProps) => {
  const [username, setUsername] = useState('');

  const handleLogin = () => {
    if (username !== '') {
      socket.emit('login', { username });
      setCurrentUser((prev) => ({ ...prev, currentUsername: username }));
      setIsLogin(true);
      setUsername('');
    }
  };

  return (
    <div className='container'>
      <h1 className='title'>Welcome to chat</h1>
      <input
        type='text'
        placeholder='Your name'
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
        value={username}
        className='customInput'
      />
      <button
        onClick={handleLogin}
        className='customButton'
      >
        Login
      </button>
    </div>
  );
};

export default Login;
