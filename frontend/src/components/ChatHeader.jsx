import { X } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useChatStore } from '../store/useChatStore';
import Avatar from './Avatar';

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  if (!selectedUser) return null;
  console.log(selectedUser.profilePic);

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        {/* Avatar + User Info */}
        <div className="flex items-center gap-3">
          <Avatar
            src={selectedUser.profilePic}
            alt={selectedUser.fullName}
            size="size-12"
          />

          <div className="flex flex-col">
            <h3 className="font-medium text-base truncate">
              {selectedUser.fullName}
            </h3>
            <p
              className={`text-sm ${
                onlineUsers.includes(selectedUser._id)
                  ? 'text-green-500'
                  : 'text-base-content/70'
              }`}
            >
              {onlineUsers.includes(selectedUser._id) ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>

        {/* Close Chat Button */}
        <button
          onClick={() => setSelectedUser(null)}
          className="btn btn-sm btn-ghost"
          aria-label="Close chat"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
