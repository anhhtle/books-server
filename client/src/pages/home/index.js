import React, { Component } from 'react';
import MainHeader from '../header/main-header';
import MainFooter from '../footer/main-footer';
import Dashboard from './dashboard';
import Home from './home';

class Index extends Component {
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
        return <Home />;
    }
    render() {
        return (
            <div id="Home">
                <MainHeader />
                
                {this.renderBody()}

                <MainFooter />
            </div>
        );
    }
}

export default Index;