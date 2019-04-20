import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCurrentUser } from '../../redux/actions/user';
import { getVariantsShare } from '../../redux/actions/variantShare';
import { getNewsfeeds } from '../../redux/actions/newsfeed';
import { getNotifications } from '../../redux/actions/notification';

// components
import NewsFeedSection from './newsfeed-section';
import ShareSection from './share-section';
import ShareRequestSection from './share-request-section';

import './Dashboard.css';

class Dashboard extends Component {
    componentDidMount() {
        this.load();
    }
    load() {
        const token = localStorage.getItem('thebooksjourney-token');
        this.props.getCurrentUser(token).then(() => {
            this.props.getVariantsShare(this.props.user.token, {page: 1})
            this.props.getNewsfeeds(this.props.user.token);
            this.props.getNotifications(this.props.user.token).then(() => console.log(this.props.notifications))
        });
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
                        <ShareRequestSection />
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
        user: state.user,
        variantsShare: state.variantsShare,
    }
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        getCurrentUser, getVariantsShare, getNewsfeeds, getNotifications
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)