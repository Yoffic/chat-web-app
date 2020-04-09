import React from 'react';

import SideBar from './SideBar.jsx';
import Chat from './Chat.jsx';


const App = () => (
  <main role="application" className="row h-100 pb-4">
    <SideBar />
    <Chat />
  </main>
);

export default App;
