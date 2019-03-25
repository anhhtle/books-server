import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCurrentUser } from '../../redux/actions/user';

import './Dashboard.css';

class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log('Dashboard');
    }

    render() {
        return (
        <div id="Dashboard">
            <p>dashboard</p>

        </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        history: props.history,
        user: state.user
    }
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        getCurrentUser
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)