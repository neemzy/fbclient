import React, { Component } from 'react';
import { connect } from 'react-redux';
import Conversation from './conversation';

class App extends Component {
    render() {
        return (
            <div className="app">
                <ul className="threadList">
                    {this.props.threads.map(thread => (
                        <li
                            key={thread.threadID}
                            className={'thread' + (thread.active ? ' thread--active' : '') + (thread.unreadCount > 0 ? ' thread--unread' : '')}
                        >
                            <a className="thread__info" onClick={() => this.props.switchThread(thread)}>
                                <span className="thread__name">{thread.name}</span>
                                <span className="thread__snippet">{thread.snippetSender}: {thread.snippet}</span>
                            </a>
                            {!thread.active ? null : (
                                <Conversation
                                    messages={this.props.messages.filter(message => message.threadID === thread.threadID)}
                                />
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default connect(
    (state) => state,
    (dispatch) => {
        return {
            switchThread: (thread) => {
                dispatch({
                    type: 'SWITCH_THREAD',
                    threadID: thread.threadID
                })
            }
        };
    }
)(App);
