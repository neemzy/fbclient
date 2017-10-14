import React, { Component } from 'react';

export default class ThreadList extends Component {
    render() {
        return (
            <ul className="threadList">
                {this.props.threads.map(thread => (
                    <li className="thread">{thread.name}</li>
                ))}
            </ul>
        );
    }
};
