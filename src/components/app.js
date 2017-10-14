import React, { Component } from 'react';
import { connect } from 'react-redux';
import ThreadList from './threadList';

class App extends Component {
    render() {
        return (
            <div className="app">
                <ThreadList threads={this.props.threads} />
            </div>
        );
    }
}

export default connect(
    (state) => ({ threads: state.threads })
)(App);
