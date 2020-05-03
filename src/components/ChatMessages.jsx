import React from 'react';
import { useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';

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
  const processState = useSelector((state) => state.processing.processState);
  const errors = useSelector((state) => state.processing.errors);
  const activeChannelId = useSelector((state) => state.activeChannelId);
  const messages = useSelector((state) => (
    state.messages.filter(({ channelId }) => channelId === activeChannelId)
  ));

  if (processState === 'fetching') {
    return (
      <div className="d-flex justify-content-center align-items-center h-75">
        <Spinner animation="grow" variant="info" role="status" className="my-5">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (processState === 'failed') {
    const errorTypes = Object.keys(errors);
    return (
      <div className="d-flex justify-content-center align-items-center h-75">
        <div className="card border-none">
          <div className="card-body">
            {errorTypes.map((key) => <p key={key} className="mb-0">{errors[key]}</p>)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-3 pl-3">
      {messages.map((message) => renderMessage(message))}
    </div>
  );
};

export default ChatMessages;
