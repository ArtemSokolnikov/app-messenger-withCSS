import { useCallback, useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
import '../styles/ChatStyles.css';
import ScrollToBottom from 'react-scroll-to-bottom';
import IconSendFill from './IconSendFill';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DoneAllIcon from '@mui/icons-material/DoneAll';

interface Props {
  socket: Socket;
  username: string;
  room: string;
  setShowChat: (value: boolean) => void;
}

interface Message {
  room: string;
  id: string | undefined;
  author: string;
  message: string;
  time: string;
  status?: string;
}

const Chat = ({
  socket,
  username = 'anonymous',
  room = 'general',
  setShowChat,
}: Props) => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = async () => {
    if (currentMessage !== '') {
      const now = new Date();
      const timeString = now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });

      const message: Message = {
        room,
        id: socket.id,
        author: username,
        message: currentMessage,
        time: timeString,
      };

      setMessageList((prev) => [...prev, { ...message, status: 'sent' }]);
      await socket.emit('send_message', message);
      setCurrentMessage('');
    }
  };

  const handleBackClick = () => {
    socket.emit('leave_room', { room, username });
    setShowChat(false);
  };

  const markAsViewed = useCallback(() => {
    messageList.forEach((message, index) => {
      const messageElement = document.getElementById(`message-${index}`);
      if (messageElement) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (
              entry.isIntersecting &&
              message.status === 'sent' &&
              message.id !== socket.id
            ) {
              socket.emit('update_status', {
                id: message.id,
                status: 'viewed',
                room,
              });
            }
          });
        });
        observer.observe(messageElement);
      }
    });
  }, [messageList, socket, room]);

  useEffect(() => {
    socket.on('receive_message', (data: Message) => {
      setMessageList((prev) => [...prev, { ...data, status: 'sent' }]);
    });

    socket.on('status_updated', (data: { id: string; status: string }) => {
      setMessageList((prev) =>
        prev.map((msg) =>
          msg.id === data.id ? { ...msg, status: data.status } : msg
        )
      );
    });

    return () => {
      socket.off('receive_message');
      socket.off('status_updated');
    };
  }, [socket]);

  useEffect(() => {
    markAsViewed();
  }, [messageList, markAsViewed]);

  const getStatusIcon = (status: string | undefined) => {
    switch (status) {
      case 'sent':
        return <DoneAllIcon />;
      case 'viewed':
        return <DoneAllIcon color='primary' />;
      default:
        return null;
    }
  };

  return (
    <div className='chat-container'>
      <div className='roomTitle'>
        <div className='back-icon'>
          <ArrowBackIcon
            style={{ cursor: 'pointer', marginLeft: '10px' }}
            onClick={handleBackClick}
          />
        </div>
        <div className='room-text'>Room: {room}</div>
        <div className='empty-space'></div>
      </div>
      <div className='messages-container'>
        <ScrollToBottom className='scroll-container no-scrollbar'>
          {messageList.map((message, index) => {
            const isOwnMessage = message.id === socket.id;
            return (
              <div
                key={index}
                id={`message-${index}`}
                className={`messageBox ${isOwnMessage ? 'own-message' : 'other-message'}`}
              >
                <p className='font-bold'>{message.author}</p>
                <p>{message.message}</p>
                <div className="message-footer">
                  <p className="time">{message.time}</p>
                  {isOwnMessage && getStatusIcon(message.status)}
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
        <div ref={messagesEndRef} />
      </div>
      <div className="input-container">
        <input
          type='text'
          placeholder='Type here'
          onChange={(e) => setCurrentMessage(e.target.value)}
          value={currentMessage}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          className="input-field"
        />
        <IconSendFill
          onClick={sendMessage}
          className="send-icon"
        />
      </div>
    </div>
  );
};

export default Chat;
