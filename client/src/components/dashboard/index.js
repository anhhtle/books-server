import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCurrentUser } from '../../redux/actions/user';
import { getNewsfeeds } from '../../redux/actions/newsfeed';
import { getNotifications } from '../../redux/actions/notification';
import { getBookRequests } from '../../redux/actions/request';
import { getVariantsShare } from '../../redux/actions/variantShare';

// components
import NewsFeedSection from './newsfeed-section';
import ShareSection from './share-section';
import ShareRequestSection from './share-request-section';

import './Dashboard.css';

class Dashboard extends Component {
    componentDidMount() {
        const token = localStorage.getItem('thebooksjourney-token');
        this.props.getCurrentUser(token).then(() => {
            this.load();
        });
    }
    load() {
        this.props.getNewsfeeds(this.props.user.token);
        this.props.getNotifications(this.props.user.token);
        this.props.getBookRequests(this.props.user.token);
        this.props.getVariantsShare(this.props.user.token, {page: 1});
    }

    render() {
        return (
        <div id="Dashboard" className="page-container">
            <div className='container'>
                <div className='row'>
                    <div className="col-sm-9">
                        <ShareSection />
                        <NewsFeedSection />
                    </div>

                    <div className="col-sm-3">
                        <ShareRequestSection user={this.props.user} requests={this.props.requests}/>
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
        newsfeeds: state.newsfeeds,
        notifications: state.notifications,
        requests: state.requests,
        user: state.user,
        variantsShare: state.variantsShare,
    }
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        getCurrentUser, getNewsfeeds, getNotifications, getBookRequests, getVariantsShare
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)