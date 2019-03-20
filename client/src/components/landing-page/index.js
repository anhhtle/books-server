import React, { Component } from 'react';
import Dashboard from './dashboard';
import Landing from './landing';

class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signedIn: false
        }
    }

    componentDidMount() {
    }
    renderBody() {
        if (this.state.signedIn) {
            return <Dashboard />;
        }
        return <Landing />;
    }
    render() {
        return (
            <div id="LandingPage">
                {this.renderBody()}
            </div>
        );
    }
}

export default LandingPage;