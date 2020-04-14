import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { setActiveChannel } from '../actions';

const renderChannel = (id, name) => {
  const dispatch = useDispatch();
  const handleClick = (channelId) => {
    dispatch(setActiveChannel({ channelId }));
  };

  const activeChannelId = useSelector((state) => state.activeChannelId);

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
      <button type="button" className={classes} onClick={() => handleClick(id)}>
        {name}
      </button>
    </li>
  );
};

const SideBar = () => {
  const channels = useSelector((state) => state.channels);

  return (
    <aside className="col-3 border-right">
      <section className="d-flex mb-3 align-items-center">
        <h2 className="h6 mb-0 py-2">Channels</h2>
        <button type="button" className="btn px-3 ml-auto"><span className="h4">+</span></button>
      </section>
      <nav role="navigation">
        <ul className="nav flex-column">
          {channels.map(({ id, name }) => renderChannel(id, name))}
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
