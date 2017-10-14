import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';

let store = createStore(reducers);
const socket = window.io('http://localhost:3001');

socket.on('threads', threads => {
    store.dispatch({
        type: 'SET_THREADS',
        threads
    })
});

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('fbclient'));
registerServiceWorker();
