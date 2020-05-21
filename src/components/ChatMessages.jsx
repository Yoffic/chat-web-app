import React from 'react';
import { useSelector } from 'react-redux';

const renderMessage = ({ id, username, message }) => (
  <div key={id}>
    <span className="mr-1 font-weight-bold">
      {username}
      :
    </span>
    <span>{message}</span>
  </div>
);

const ChatMessages = () => {
  const activeChannelId = useSelector((state) => state.activeChannelId);
  const messages = useSelector((state) => (
    state.messages.filter(({ channelId }) => channelId === activeChannelId)
  ));

  return (
    <div className="pt-3 pl-3">
      {messages.map((message) => renderMessage(message))}
    </div>
  );
};

export default ChatMessages;
