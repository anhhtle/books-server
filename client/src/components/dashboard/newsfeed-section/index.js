import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';

// components
import FriendCurrentReadingCard from './FriendCurrentReadingCard';

import './NewsFeed.scss';

class NewsFeedSection extends Component {
    render() {
        return (
        <div id="NewsFeedSection">
            {this.renderNewsFeeds()}
        </div>
        );
    }
    renderNewsFeeds() {
        let arr = this.props.newsfeeds.newsfeeds.map(n => {
            if (n.type === 'Friend: reading') {
                return (<FriendCurrentReadingCard key={n._id} friend={n.friend} book={n.book} date={n.createdAt} />)
            }
            return null;
        });
        return arr;
    }
}

const mapStateToProps = (state) => {
    return {
        newsfeeds: state.newsfeeds,
    }
}

export default connect(mapStateToProps)(NewsFeedSection)