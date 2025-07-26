import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { formatMessageTime } from '../lib/utils';

const MessageBubble = ({
  message,
  onDelete,
  isOwnMessage = false,
  profilePic,
  isGlobal = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const avatarUrl =
    profilePic?.secure_url ||
    message.senderId?.profilePic?.secure_url ||
    '/avatar.png';

  if (message.isDeleted) {
    return (
      <div
        className={`flex items-end gap-2 ${
          isOwnMessage ? 'justify-end' : 'justify-start'
        }`}
      >
        <div className="chat-bubble chat-bubble-secondary text-xs italic opacity-70">
          This message was deleted
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex items-end mb-3 ${
        isOwnMessage ? 'justify-end' : 'justify-start'
      }`}
    >
      {/* Avatar outside the bubble */}
      {!isOwnMessage && (
        <div className="mr-2 flex flex-col items-end">
          <img
            src={avatarUrl}
            alt="User avatar"
            className="w-9 h-9 rounded-full border border-gray-200 shadow object-cover"
            loading="lazy"
          />
        </div>
      )}

      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`flex flex-col max-w-[60%] relative ${
          isOwnMessage ? 'items-end' : 'items-start'
        }`}
      >
        {/* Name on hover */}
        {((isGlobal && !isOwnMessage) || (!isGlobal && !isOwnMessage)) &&
          isHovered && (
            <div className="absolute -top-5 left-3 bg-gray-900 text-white text-xs rounded-full px-3 py-1 shadow z-20 pointer-events-none select-none transition-opacity duration-200">
              {message.senderId?.fullName || 'Unknown'}
            </div>
          )}

        {/* Timestamp */}
        <div
          className={`text-xs opacity-60 mt-1 ${
            isOwnMessage ? 'text-right self-end' : 'text-left'
          }`}
        >
          <time>{formatMessageTime(message.createdAt)}</time>
        </div>

        {/* Bubble */}
        <div
          className={`relative flex flex-col px-4 py-2 rounded-2xl shadow-md min-h-[40px]
            ${
              isOwnMessage
                ? 'bg-primary text-white self-end ml-2'
                : 'bg-gray-100 text-gray-900 self-start mr-2'
            }
            transition-all duration-150
          `}
        >
          {message.image && (
            <div className="flex justify-center mb-1">
              <img
                src={message.image.secure_url || message.image}
                alt="Attachment"
                className="rounded-md shadow max-w-[180px] max-h-[160px] object-cover"
                loading="lazy"
              />
            </div>
          )}

          {message.text && (
            <p className="whitespace-pre-wrap text-sm leading-relaxed mb-1">
              {message.text}
            </p>
          )}

          {!isGlobal && isOwnMessage && isHovered && (
            <button
              type="button"
              aria-label="Delete message"
              className="absolute -top-4 -right-4 bg-red-500 text-white rounded-full p-1 shadow hover:bg-red-600 transition"
              onClick={() => onDelete(message._id)}
            >
              <FaTrash size={11} />
            </button>
          )}
        </div>
      </div>

      {/* Avatar on right for own messages */}
      {isOwnMessage && (
        <div className="ml-2 flex flex-col items-end">
          <img
            src={avatarUrl}
            alt="Your avatar"
            className="w-9 h-9 rounded-full border border-gray-200 shadow object-cover"
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
