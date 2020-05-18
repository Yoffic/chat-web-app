import React from 'react';
import { useSelector } from 'react-redux';
import ChatInput from './ChatInput.jsx';
import ChatMessages from './ChatMessages.jsx';

const renderEditButtons = ({ handleRename, handleRemove }) => (
  <>
    <button type="button" className="ml-auto btn btn-sm py-0" onClick={handleRename}>
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
    <button type="button" className="btn btn-sm py-0 mr-2" onClick={handleRemove}>
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
);

const Chat = ({ removeChannelModal, renameChannelModal }) => {
  const activeChannel = useSelector((state) => state.channels
    .find(({ id }) => id === state.activeChannelId.current));

  const handleRemove = () => removeChannelModal(activeChannel.id);
  const handleRename = () => renameChannelModal(activeChannel.id, activeChannel.name);

  return (
    <section className="col-9 d-flex flex-column px-0 vw-100">
      <section className="overflow-auto mb-auto h-100">
        <div className="bg-light border-bottom py-3 pl-3 d-flex">
          <span>
            {'# '}
            {activeChannel.name}
          </span>
          {activeChannel.removable && renderEditButtons({ handleRename, handleRemove })}
        </div>
        <ChatMessages />
      </section>
      <section className="w-100">
        <ChatInput />
      </section>
    </section>
  );
};

export default Chat;
