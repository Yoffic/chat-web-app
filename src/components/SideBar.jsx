import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { actions } from '../slices/index.js';

import UserContext from '../context.jsx';

const renderChannel = ({ channel: { id, name }, activeChannelId, activateChannel }) => {
  const btnClasses = cn('nav-link chat-button px-3 btn btn-sm text-left w-100 rounded-0', {
    'chat-button-active': id === activeChannelId,
  });

  return (
    <li key={id} className="nav-item">
      <button
        type="button"
        className={btnClasses}
        onClick={() => activateChannel(id)}
      >
        {'# '}
        {name}
      </button>
    </li>
  );
};

const SideBar = ({ addChannelModal }) => {
  const activeChannelId = useSelector((state) => state.activeChannelId.current);
  const channels = useSelector((state) => state.channels);
  const username = useContext(UserContext);

  const dispatch = useDispatch();
  const activateChannel = (channelId) => {
    dispatch(actions.setActiveChannel(channelId));
  };

  return (
    <aside className="col-3 border-right overflow-auto px-0 h-100">
      <section className=" bg-light border-bottom pl-3 py-3">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather mr-2"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <small>{username}</small>
        </span>
      </section>
      <section className="d-flex mb-2 mt-2 align-items-center">
        <h2 className="h6 mb-0 py-2 pl-3">Channels</h2>
        <button type="button" className="btn p-1 ml-auto mr-3" onClick={addChannelModal}>
          <span>
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
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </span>
        </button>
      </section>
      <nav role="navigation">
        <ul className="nav flex-column">
          {channels.map((channel) => renderChannel({ channel, activeChannelId, activateChannel }))}
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
