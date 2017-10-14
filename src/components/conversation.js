import React, { Component } from 'react';
import Message from './message';

export default class Conversation extends Component {
    render() {
        return (
            <ul className="conversation">
                {this.props.messages.map(message => <Message key={message.messageID} message={message} />)}
            </ul>
        );
    }
};
