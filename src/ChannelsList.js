import React from 'react';
import ReactDOM from 'react-dom';


const ChannelsList = ({ channels }) => {
  return (
    <ul>
      {channels.map(({ id, name }) => <li key={id}>{name}</li>)}
    </ul>
  );
};

export default (channels) => {
  return ReactDOM.render(<ChannelsList channels={channels} />, document.getElementById('chat'));
};