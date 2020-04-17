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
  const [modalData, setModalData] = useState({ type: null, channelId: null });
  const showModal = (type, channelId = null) => setModalData({ type, channelId });
  const hideModal = () => setModalData({ type: null, channelId: null });

  const addChannelModal = () => showModal('adding');

  return (
    <main role="application" className="row h-100 mx-auto overflow-hidden">
      <SideBar
        addChannelModal={addChannelModal}
      />
      <Chat />
      {renderModal(modalData, hideModal)}
    </main>
  );
};

export default App;
