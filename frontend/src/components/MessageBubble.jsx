import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { formatMessageTime } from '../lib/utils';
const MessageBubble = ({ message, onDelete, isOwnMessage, profilePic }) => {
  const [hovered, setHovered] = useState(false);

  if (message.isDeleted) {
    return (
      <div
        className={`chat ${isOwnMessage ? 'chat-end' : 'chat-start'}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="chat-bubble bg-gray-300 text-sm italic text-gray-600 dark:bg-gray-700 dark:text-gray-300">
          message was deleted
        </div>
      </div>
    );
  }

  return (
    <div
      className={`chat ${isOwnMessage ? 'chat-end' : 'chat-start'} relative`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="chat-image avatar">
        <div className="size-10 rounded-full border">
          <img src={profilePic || '/avatar.png'} alt="profile pic" />
        </div>
      </div>
      <div className="chat-header mb-1">
        <time className="text-xs opacity-50 ml-1">
          {formatMessageTime(message.createdAt)}
        </time>
      </div>

      <div className="chat-bubble flex flex-col break-words whitespace-pre-wrap overflow-wrap break-anywhere relative">
        {message.image && (
          <img
            src={message.image}
            alt="Attachment"
            className="sm:max-w-[200px] rounded-md mb-2"
          />
        )}
        {message.text && <p>{message.text}</p>}

        {isOwnMessage && hovered && (
          <button
            className="absolute -top-2 -right-2 bg-white p-1 rounded-full text-red-500 hover:text-red-700 shadow"
            onClick={() => onDelete(message._id)}
          >
            <FaTrash size={12} />
          </button>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
