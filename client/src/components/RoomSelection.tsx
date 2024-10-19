import { useState } from 'react';
import { Socket } from 'socket.io-client';
import '../styles/RoomSelectionStyles.css'

interface RoomSelectionProps {
  setShowChat: (showChat: boolean) => void;
  setIsLogin:(isLogin: boolean) => void;
  setCurrentUser: React.Dispatch<
    React.SetStateAction<{ currentUsername: string; currentRoom: string }>
  >;
  currentUser: { currentUsername: string; currentRoom: string };
  socket: Socket;
}

const RoomSelection = ({
  setShowChat,
  setCurrentUser,
  currentUser,
  socket,
  setIsLogin
}: RoomSelectionProps) => {
  const [room, setRoom] = useState('');

  const joinRoom = () => {
    if (room !== '') {
      socket.emit('join_room', { username: currentUser.currentUsername, room });
      setCurrentUser((prev) => ({ ...prev, currentRoom: room }));
      setShowChat(true);
      setRoom('');
    }
  };

  const handleLogout = () => {
    socket.emit('logout');
    setIsLogin(false)
  };

  return (
    <div className='rooms-container'>
      <h1 className='custom-heading'>Choose your room</h1>
      <input
        type='text'
        placeholder='Room ID'
        onChange={(e) => setRoom(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && joinRoom()}
        value={room}
        className='rooms-input'
      />
      <div className='coupleOfButton'>
        <button
          onClick={joinRoom}
          className="btn btn-primary"
        >
          Join a Room
        </button>
        <button
          onClick={handleLogout}
          className='btn btn-success'
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default RoomSelection;
