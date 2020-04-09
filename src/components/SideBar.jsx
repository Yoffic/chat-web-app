import React from 'react';
import { useSelector } from 'react-redux';

const renderChannel = (id, name) => (
  <li key={id} className="nav-item">
    <a href="/" type="button" className="nav-link btn btn-block text-left pl-0">
      <span className="px-1">#</span>
      {name}
    </a>
  </li>
);

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
