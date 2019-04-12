import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';

// components
import FriendCurrentReadingCard from './FriendCurrentReadingCard';
import FriendNewAvatarCard from './FriendNewAvatarCard';
import FriendNewBookCard from './FriendNewBookCard';
import FriendRecievedBookCard from './FriendRecievedBookCard';
import FriendSharingBookCard from './FriendSharingBookCard';

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
            } else if (n.type === 'Friend: new book') {
                return (<FriendNewBookCard key={n._id} friend={n.friend} book={n.book} date={n.createdAt} />)
            } else if (n.type === 'Friend: avatar') {
                return (<FriendNewAvatarCard key={n._id} friend={n.friend} avatar={n.avatar} date={n.createdAt} />)
            } else if (n.type === 'Friend: received book') {
                return (<FriendRecievedBookCard key={n._id} friend={n.friend} community_member={n.community_member} book={n.book} date={n.createdAt} />)
            } else if (n.type === 'Friend: sharing book') {
                return (<FriendSharingBookCard key={n._id} friend={n.friend} book={n.book} date={n.createdAt} />)
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