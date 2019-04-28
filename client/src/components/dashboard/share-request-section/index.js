import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import './ShareRequestSection.scss';

class ShareRequestSection extends Component {
    render() {
        return (
        <div id="ShareRequestSection">
            {/* community's request */}
            <div className="share-request-container">
                <p className="share-request-header">Community's requests</p>
                <div className="share-request-body">
                    {this.renderCommunityRequests()}
                </div>
            </div>

            {/* your request */}
            <div className="share-request-container">
                <p className="share-request-header">Your's requests</p>
                <div className="share-request-body">
                    {this.renderYourRequests()}
                </div>
            </div>

            {/* bookmarks */}
            <div className="share-request-container">
                <p className="share-request-header">Bookmarks</p>
                <div className="share-request-body">
                    <p>Bookmarks are used to request books. <Link to="/user-guide">More info</Link>.</p>
                    <div className="bookmark-container">
                        <span><i className="fa fa-bookmark silver"></i>{this.props.user.bookmarks.silver}</span>
                        <span><i className="fa fa-bookmark gold"></i>{this.props.user.bookmarks.gold}</span>
                    </div>
                </div>
            </div>
        </div>
        );
    }
    renderCommunityRequests() {
        let count = 0;
        Array.prototype.forEach.call(this.props.requests.requests, (r) => {
            if (r.original_owner._id === this.props.user._id) {
                if (r.type === 'Requesting' || r.type === 'Accepted') {
                    ++count;
                }
            }
        });

        if (count === 0) {
            return <Link to="/requests" className="request-link"><i className="fa fa-arrow-circle-right"></i>You have no request for your book</Link>
        } else {
            return (<Link to="/requests" className="request-link"><i className="fa fa-arrow-circle-right"></i>You have <strong style={{color: '#8c1515'}}>{count}</strong> request(s) for your book</Link>)
        }
    }
    renderYourRequests() {
        let count = 0;
        Array.prototype.forEach.call(this.props.requests.requests, (r) => {
            if (r.requester._id === this.props.user._id) {
                if (r.type === 'Requesting' || r.type === 'Accepted') {
                    ++count;
                }
            }
        });

        if (count === 0) {
            return <Link to="/requests" className="request-link"><i className="fa fa-arrow-circle-left"></i>You have not request a book</Link>
        } else {
            return (<Link to="/requests" className="request-link"><i className="fa fa-arrow-circle-left"></i>You are requesting <strong style={{color: '#8c1515'}}>{count}</strong> book(s)</Link>)
        }
    }
}


export default ShareRequestSection;