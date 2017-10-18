import React, { Component } from 'react';
import moment from 'moment';

export default class Message extends Component {
    render() {
        return (
            <li className="message">
                <img className="message__authorPic" src={this.props.message.sender.thumbSrc} alt="" />
                <span className="message__authorName">{this.props.message.sender.name}</span>
                {!this.props.message.body ? null : (
                    <div className="message__body">{this.props.message.body}</div>
                )}
                {this.props.message.attachments.map(attachment => (
                    <img key={attachment.ID} className="message__attachment" src={attachment.largePreviewUrl} alt="" />
                ))}
                <span className="message__timestamp">{moment(this.props.message.timestamp).fromNow()}</span>
            </li>
        );
    }
};
