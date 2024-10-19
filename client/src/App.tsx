import { useState } from 'react';
import io from 'socket.io-client';
import Chat from './components/Chat';
import Login from './components/Login.tsx';
import RoomSelection from './components/RoomSelection.tsx';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const PORT = import.meta.env.PORT || '3001';
const VITE_SERVER_URL =
  import.meta.env.VITE_SERVER_URL || `http://localhost:${PORT}`;
const socket = io(VITE_SERVER_URL);

interface currentUserProps {
  currentUsername: string;
  currentRoom: string;
}

function App() {
  const [currentUser, setCurrentUser] = useState<currentUserProps>({
    currentUsername: '',
    currentRoom: '',
  });
  const [showChat, setShowChat] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  return (
 <div className='app-wrapper'>
      {!showChat && !isLogin ? (
        <Login setIsLogin={setIsLogin} setCurrentUser={setCurrentUser} socket={socket} />
      ) : !showChat && isLogin ? (
        <RoomSelection
          setShowChat={setShowChat}
          setCurrentUser={setCurrentUser}
          currentUser={currentUser}
          socket={socket}
          setIsLogin={setIsLogin}
        />
      ) : (
        <Chat
          socket={socket}
          username={currentUser.currentUsername}
          room={currentUser.currentRoom}
          setShowChat={setShowChat}
        />
      )}
    </div>
  );
}

export default App;




// import { useState } from 'react';
// import io from 'socket.io-client';
// import Chat from './components/Chat';
// import './styles/styles.css'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// const PORT = import.meta.env.PORT || '3001';
// const VITE_SERVER_URL =
//   import.meta.env.VITE_SERVER_URL || `http://localhost:${PORT}`;
// const socket = io(VITE_SERVER_URL);

// interface currentUserProps {
//   currentUsername: string;
//   currentRoom: string;
// }

// function App() {
//   const [username, setUsername] = useState('');
//   const [room, setRoom] = useState('');
//   const [isLogin, setIsLogin] = useState<boolean>(false);
//   const [currentUser, setCurrentUser] = useState<currentUserProps>({
//     currentUsername: '',
//     currentRoom: '',
//   });
//   const [showChat, setShowChat] = useState(false);

// const joinRoom = () => {
//   if (room !== '') {
//     socket.emit('join_room', {username:currentUser.currentUsername, room });
//     setCurrentUser((prev) => ({...prev, currentRoom: room }));
//     setShowChat(true);
//     setRoom('');
//   }
// };
// const handleLogin = () => {
//   if (username !== '' ) {
//     socket.emit('login', { username});
//     setCurrentUser((prev) => ({...prev, currentUsername: username }));
//     setIsLogin(true);
//     setUsername('');
//   }
// };
// const handleLogout = () => {
//     socket.emit('logout', { username});
//     setIsLogin(false);
// };

//   return (
//     <div className='px-8 flex items-center justify-center text-white bg-[url(/src/assets/background.jpg)] bg-no-repeat bg-cover w-full h-screen'>
//       {!showChat && !isLogin ? (
//         <div className='w-fit flex flex-col justify-center items-center text-center space-y-2 bg-white/10 backdrop-blur-sm rounded-xl py-8 px-4'>
//           <h1 className='text-3xl font-bold'>Welcome to chat</h1>
//           <input
//             type='text'
//             placeholder='Your name'
//             onChange={(e) => setUsername(e.target.value)}
//             onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
//             value={username}
//             className='outline-none text-black p-2 rounded-md overflow-hidden w-[300px]'
//           />
//           <button
//             onClick={handleLogin}
//             className='p-2 bg-green-500 hover:bg-green-700 rounded-md font-medium w-[300px]'
//           >
//             Login
//           </button>
//         </div>
//       ) : !showChat&&isLogin ? (
//         <div className='w-fit flex flex-col justify-center items-center text-center space-y-2 bg-white/10 backdrop-blur-sm rounded-xl py-8 px-4'>
//           <h1 className='text-3xl font-bold'>Choose your room</h1>
//           <input
//             type='text'
//             placeholder='Room ID'
//             onChange={(e) => setRoom(e.target.value)}
//             onKeyDown={(e) => e.key === 'Enter' && joinRoom()}
//             value={room}
//             className='outline-none text-black p-2 rounded-md overflow-hidden md:max-w-96 w-[300px]'
//           />
//          <div className='coupleOfButton'>
//             <button
//               onClick={joinRoom}
//               className='p-2 bg-blue-500 hover:bg-blue-700 rounded-md font-medium w-[145px]'
//             >
//               Join a Room
//             </button>
//             <button
//               onClick={handleLogout}
//               className='p-2 bg-green-500 hover:bg-green-700 rounded-md font-medium w-[145px]'
//             >
//             Logout
//             </button>
//          </div>
//         </div>
//       ) : (
//         <Chat
//           socket={socket}
//           username={currentUser.currentUsername}
//           room={currentUser.currentRoom}
//           setShowChat={setShowChat}
//         />
//       )}
//     </div>
//   );
// }

// export default App;






// import { useState } from 'react';
// import io from 'socket.io-client';
// import Chat from './components/Chat';
// import './styles/styles.css'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// const PORT = import.meta.env.PORT || '3001';
// const VITE_SERVER_URL =
//   import.meta.env.VITE_SERVER_URL || `http://localhost:${PORT}`;
// const socket = io(VITE_SERVER_URL);

// interface currentUserProps {
//   currentUsername: string;
//   currentRoom: string;
// }

// function App() {
//   const [username, setUsername] = useState('');
//   const [room, setRoom] = useState('');
//   const [isLogin, setIsLogin] = useState<boolean>(false);
//   const [currentUser, setCurrentUser] = useState<currentUserProps>({
//     currentUsername: '',
//     currentRoom: '',
//   });
//   const [showChat, setShowChat] = useState(false);

// const joinRoom = () => {
//   if (room !== '') {
//     socket.emit('join_room', {username:currentUser.currentUsername, room });
//     setCurrentUser((prev) => ({...prev, currentRoom: room }));
//     setShowChat(true);
//     setRoom('');
//   }
// };
// const handleLogin = () => {
//   if (username !== '' ) {
//     socket.emit('login', { username});
//     setCurrentUser((prev) => ({...prev, currentUsername: username }));
//     setIsLogin(true);
//     setUsername('');
//   }
// };
// const handleLogout = () => {
//     socket.emit('logout', { username});
//     setIsLogin(false);
// };

//   return (
//     <div className='px-8 flex items-center justify-center text-white bg-[url(/src/assets/background.jpg)] bg-no-repeat bg-cover w-full h-screen'>
//       {!showChat && !isLogin ? (
//         <div className='w-fit flex flex-col justify-center items-center text-center space-y-2 bg-white/10 backdrop-blur-sm rounded-xl py-8 px-4'>
//           <h1 className='text-3xl font-bold'>Welcome to chat</h1>
//           <input
//             type='text'
//             placeholder='Your name'
//             onChange={(e) => setUsername(e.target.value)}
//             onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
//             value={username}
//             className='outline-none text-black p-2 rounded-md overflow-hidden w-[300px]'
//           />
//           <button
//             onClick={handleLogin}
//             className='p-2 bg-green-500 hover:bg-green-700 rounded-md font-medium w-[300px]'
//           >
//             Login
//           </button>
//         </div>
//       ) : !showChat&&isLogin ? (
//         <div className='w-fit flex flex-col justify-center items-center text-center space-y-2 bg-white/10 backdrop-blur-sm rounded-xl py-8 px-4'>
//           <h1 className='text-3xl font-bold'>Choose your room</h1>
//           <input
//             type='text'
//             placeholder='Room ID'
//             onChange={(e) => setRoom(e.target.value)}
//             onKeyDown={(e) => e.key === 'Enter' && joinRoom()}
//             value={room}
//             className='outline-none text-black p-2 rounded-md overflow-hidden md:max-w-96 w-[300px]'
//           />
//          <div className='coupleOfButton'>
//             <button
//               onClick={joinRoom}
//               className='p-2 bg-blue-500 hover:bg-blue-700 rounded-md font-medium w-[145px]'
//             >
//               Join a Room
//             </button>
//             <button
//               onClick={handleLogout}
//               className='p-2 bg-green-500 hover:bg-green-700 rounded-md font-medium w-[145px]'
//             >
//             Logout
//             </button>
//          </div>
//         </div>
//       ) : (
//         <Chat
//           socket={socket}
//           username={currentUser.currentUsername}
//           room={currentUser.currentRoom}
//           setShowChat={setShowChat}
//         />
//       )}
//     </div>
//   );
// }

// export default App;

