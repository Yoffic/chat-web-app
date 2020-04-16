import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';

import { setActiveChannel } from '../actions/index.js';

const renderChannel = ({ id, name }, activeChannelId, activateChannel) => {
  const classes = cn({
    'nav-link': true,
    btn: true,
    'btn-outline-info': true,
    'btn-sm': true,
    'my-1': true,
    'w-100': true,
    active: id === activeChannelId,
  });

  return (
    <li key={id} className="nav-item">
      <button
        type="button"
        className={classes}
        onClick={() => activateChannel(id)}
      >
        {name}
      </button>
    </li>
  );
};

const SideBar = ({ addChannelModal }) => {
  const activeChannelId = useSelector((state) => state.activeChannelId);
  const channels = useSelector((state) => state.channels);
  const dispatch = useDispatch();
  const activateChannel = (channelId) => {
    dispatch(setActiveChannel({ channelId }));
  };

  return (
    <aside className="col-3 border-right">
      <section className="d-flex mb-3 align-items-center">
        <h2 className="h6 mb-0 py-2">Channels</h2>
        <button type="button" className="btn px-3 ml-auto" onClick={addChannelModal}><span className="h4">+</span></button>
      </section>
      <nav role="navigation">
        <ul className="nav flex-column">
          {channels.map((channel) => (
            renderChannel(channel, activeChannelId, activateChannel)
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
