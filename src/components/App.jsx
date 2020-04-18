import React, { useState } from 'react';
import SideBar from './SideBar.jsx';
import Chat from './Chat.jsx';
import getModal from './modals/index.js';

const renderModal = (modalData, hideModal) => {
  if (!modalData.type) {
    return null;
  }
  const Component = getModal(modalData.type);
  return <Component modalData={modalData} hideModal={hideModal} />;
};

const App = () => {
  const [modalData, setModalData] = useState({ type: null, channel: null });
  const showModal = (type, channel = null) => setModalData({ type, channel });
  const hideModal = () => setModalData({ type: null, channel: null });

  const addChannelModal = () => showModal('adding');
  const removeChannelModal = (id) => showModal('removing', { id });
  const renameChannelModal = (id, name) => showModal('renaming', { id, name });

  return (
    <main role="application" className="row h-100 mx-auto overflow-hidden">
      <SideBar addChannelModal={addChannelModal} />
      <Chat removeChannelModal={removeChannelModal} renameChannelModal={renameChannelModal} />
      {renderModal(modalData, hideModal)}
    </main>
  );
};

export default App;
