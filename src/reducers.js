import { combineReducers } from 'redux';

function threads(state = [], action) {
    switch (action.type) { // eslint-disable-line
        case 'THREADS':
            return action.threads;
    }

    return state;
}

function messages(state = [], action) {
    switch (action.type) { // eslint-disable-line
        case 'THREADS':
            return state.concat(
                action.threads
                    .map(thread => thread.history)
                    .reduce((a, b) => a.concat(b)) // flatten
            );
        case 'NEW_MESSAGE':
            return state.concat([action.message]);
    }

    return state;
}

export default combineReducers({
    threads,
    messages
});
