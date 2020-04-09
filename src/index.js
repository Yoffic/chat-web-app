import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../assets/application.scss';

import gon from 'gon';
import io from 'socket.io-client';

import app from './init.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const socket = io();

socket.on('newChannel');
socket.on('removeChannel');
socket.on('renameChannel');
socket.on('newMessage');

app(gon);
console.log(gon);
