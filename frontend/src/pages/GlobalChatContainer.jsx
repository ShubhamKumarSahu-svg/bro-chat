import { useEffect, useRef } from 'react';
import MessageBubble from '../components/MessageBubble';
import MessageInput from '../components/MessageInput';
import MessageSkeleton from '../components/skeletons/MessageSkeleton';
import { useAuthStore } from '../store/useAuthStore';
import { useChatStore } from '../store/useChatStore';

const GlobalChatContainer = () => {
  const {
    globalMessages,
    getGlobalMessages,
    isGlobalMessagesLoading,
    subscribeToGlobalMessages,
    unsubscribeFromGlobalMessages,
  } = useChatStore();

  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  /** Fetch global messages + socket subscriptions */
  useEffect(() => {
    getGlobalMessages();
    subscribeToGlobalMessages();

    return () => {
      unsubscribeFromGlobalMessages();
    };
  }, []);

  /** Auto scroll when messages update */
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [globalMessages]);

  /** Show loader state */
  if (isGlobalMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <div className="p-4 text-lg font-bold flex items-center gap-2">
          🌐 Global Chat
        </div>
        <MessageSkeleton />
        <MessageInput mode="global" />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      {/* Header */}
      <div className="p-4 text-lg font-bold flex items-center gap-2">
        🌐 Global Chat
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {globalMessages.map((message) => {
          return (
            <MessageBubble
              key={message._id}
              message={message}
              isOwnMessage={message.senderId?._id === authUser._id}
              profilePic={
                message.senderId?.profilePic?.secure_url || '/avatar.png'
              }
              isGlobal={true}
            />
          );
        })}
        <div ref={messageEndRef} />
      </div>

      {/* Input */}
      <MessageInput mode="global" />
    </div>
  );
};

export default GlobalChatContainer;
