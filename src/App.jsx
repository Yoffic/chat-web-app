import React from 'react';
import ReactDOM from 'react-dom';


const ChannelsList = ({ channels }) => (
  <ul>
    {channels.map(({ id, name }) => <li key={id}>{name}</li>)}
  </ul>
);

export default (channels) => {
  ReactDOM.render(<ChannelsList channels={channels} />, document.getElementById('chat'));
};
