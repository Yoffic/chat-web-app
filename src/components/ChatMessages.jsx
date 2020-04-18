import React from 'react';
import { useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';

const ChatMessages = () => {
  const processing = useSelector((state) => state.processing);
  const errors = useSelector((state) => state.errors);
  const messages = useSelector((state) => state.messages);
  const activeChannelId = useSelector((state) => state.activeChannelId);

  if (processing) {
    return (
      <div className="d-flex justify-content-center align-items-center h-75">
        <Spinner animation="grow" variant="info" role="status" className="my-5">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (errors.message) {
    return (
      <div className="d-flex justify-content-center align-items-center h-75">
        <div className="card border-none">
          <div className="card-body">
            <p className="mb-0">{errors.message}</p>
          </div>
        </div>
      </div>
    );
  }

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
