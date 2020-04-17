import React from 'react';
import { useSelector } from 'react-redux';

const ChatMessages = () => {
  const messages = useSelector((state) => state.messages);
  const activeChannelId = useSelector((state) => state.activeChannelId);

  return (
    <div className="pt-3 pl-3">
      {messages.map(({
        id, username, message, channelId,
      }) => {
        if (channelId !== activeChannelId) {
          return null;
        }
        return (
          <div key={id}>
            <span className="mr-1 font-weight-bold">
              {username}
              :
            </span>
            <span>{message}</span>
          </div>
        );
      })}
    </div>
  );
};

export default ChatMessages;
