import React, { Component } from 'react';
import Message from './message';

export default class Conversation extends Component {
    constructor(props) {
        super(props);
        this.scrollToBottom = this.scrollToBottom.bind(this);
    }
    scrollToBottom() {
        this.scroller.scrollTop = this.scroller.scrollHeight;
    }
    componentDidMount() {
        this.scrollToBottom();
        console.log(this.props.messages.pop());
    }
    componentDidUpdate() {
        this.scrollToBottom();
    }
    render() {
        return (
            <ul className="conversation" ref={div => { this.scroller = div; }}>
                {this.props.messages.map(message => <Message key={message.messageID} message={message} />)}
            </ul>
        );
    }
};
