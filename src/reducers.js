import { combineReducers } from 'redux';

function threads(state = [], action) {
    switch (action.type) { // eslint-disable-line
        case 'SET_THREADS':
            return action.threads;
    }

    return state;
}

export default combineReducers({
    threads
});
