import React, { Component } from 'react';
import { connect } from 'react-redux';
import Conversation from './conversation';

class App extends Component {
    render() {
        return (
            <div className="app">
                <ul className="threadList">
                    {this.props.threads.map(thread => (
                        <li key={thread.threadID} className="thread">
                            <span className="thread__name">{thread.name}</span>
                            <Conversation
                                messages={this.props.messages.filter(message => message.threadID === thread.threadID)}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default connect(
    (state) => state
)(App);
