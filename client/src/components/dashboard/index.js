import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCurrentUser } from '../../redux/actions/user';
import { getVariantsShare } from '../../redux/actions/variantShare';

// components
import ShareSection from './share-section'

import './Dashboard.css';

class Dashboard extends Component {
    componentDidMount() {
        this.load();
    }
    load() {
        const token = localStorage.getItem('thebooksjourney-token');
        this.props.getCurrentUser(token).then(() => {
            console.log(this.props.user)
            this.props.getVariantsShare(this.props.user.token, {page: 1}).then(() => console.log(this.props.variantsShare));
        });
    }

    render() {
        return (
        <div id="Dashboard" className="page-container">
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-12'>

                        <div className="col-sm-9">
                            <ShareSection />
                        </div>
                        

                    </div>
                </div>
            </div>
        </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        history: props.history,
        user: state.user,
        variantsShare: state.variantsShare
    }
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        getCurrentUser, getVariantsShare
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)