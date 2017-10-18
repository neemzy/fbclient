import { combineReducers } from 'redux';

function threads(state = [], action) {
    switch (action.type) { // eslint-disable-line
        case 'THREADS':
            return action.threads.map((thread, index) => Object.assign(thread, { active: index === 0 }));

        case 'SWITCH_THREAD':
            return state.map(thread => Object.assign(thread, { active: thread.threadID === action.threadID }));
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
