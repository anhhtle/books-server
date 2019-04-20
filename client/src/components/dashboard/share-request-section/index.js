import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';

import './ShareRequestSection.scss';

class ShareRequestSection extends Component {
    render() {
        return (
        <div id="ShareRequestSection">
            {/* community's request */}
            <div className="share-request-container">
                <p className="share-request-header">Community's requests</p>
                <div className="share-request-body">
                    {this.renderCommunityRequest()}
                </div>
            </div>
        </div>
        );
    }
    renderCommunityRequest() {
        let arr = [];
        if (arr.length  === 0) {
            return <p>You have no request for your book</p>
        }
    }
}

const mapStateToProps = (state, props) => {
    return {
    }
}

export default connect(mapStateToProps)(ShareRequestSection)