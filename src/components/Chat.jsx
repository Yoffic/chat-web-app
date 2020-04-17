import React from 'react';
import { useSelector } from 'react-redux';
import ChatInput from './ChatInput.jsx';

const Chat = () => {
  const messages = useSelector((state) => state.messages);
  const activeChannelId = useSelector((state) => state.activeChannelId);
  const activeChannel = useSelector((state) => state.channels
    .find(({ id }) => id === activeChannelId));
  const activeChannelName = activeChannel.name;

  return (
    <section className="col-9 d-flex flex-column px-0 vw-100">
      <section className="overflow-auto">
        <div className="bg-light border-bottom py-3 pl-3 d-flex">
          <span className="">
            {'# '}
            {activeChannelName}
          </span>
          {activeChannel.removable && (
            <>
              <button type="button" className="ml-auto btn btn-sm py-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather"
                >
                  <title>Rename</title>
                  <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34" />
                  <polygon points="18 2 22 6 12 16 8 16 8 12 18 2" />
                </svg>
              </button>
              <button type="button" className="btn btn-sm py-0 mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather"
                >
                  <title>Remove</title>
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                </svg>
              </button>
            </>
          )}
        </div>
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
      </section>
      <section className="mt-auto w-100">
        <ChatInput />
      </section>
    </section>
  );
};

export default Chat;
