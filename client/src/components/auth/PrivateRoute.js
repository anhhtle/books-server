import React, { Component } from 'react';
import {withRouter} from "react-router-dom";

// redux
import { connect } from 'react-redux';

class PrivateRoute extends Component {
    componentWillMount() {
        if (!this.props.user.signed_in) {
            this.props.history.push(`/`);
        }
    }

    render() {
        return (
            this.renderComponent()
        )
    }
    renderComponent() {
        if (!this.props.user.signed_in) {
            return (
                <div></div>
            )
        }
        let Component = this.props.component;
        return <Component />
    }
}

const mapStateToProps = (state, props) => {
    return {
        history: props.history,
        user: state.user
    }
}

export default withRouter(connect(mapStateToProps)(PrivateRoute));