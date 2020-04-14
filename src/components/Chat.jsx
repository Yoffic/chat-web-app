import React from 'react';
import { useSelector } from 'react-redux';
import ChatInput from './ChatInput.jsx';

const Chat = () => {
  const messages = useSelector((state) => state.messages);
  const activeChannelId = useSelector((state) => state.activeChannelId);

  return (
    <section className="col-9 d-flex flex-column px-4">
      <section>
        <div>
          {messages.map(({
            id,
            username,
            message,
            channelId,
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
      </section>
      <section className="mt-auto w-100">
        <ChatInput />
      </section>
    </section>
  );
};

export default Chat;
