import React, { Component } from 'react';

export default class Message extends Component {
    render() {
        return (
            <li className="message">
                <img className="message__authorPic" src={this.props.message.sender.thumbSrc} alt="" />
                <span className="message__authorName">{this.props.message.sender.name}</span>
                <div className="message__body">{this.props.message.body}</div>
            </li>
        );
    }
};
