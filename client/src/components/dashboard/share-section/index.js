import React, { Component } from 'react';
import {Link} from 'react-router-dom';

// redux
import { connect } from 'react-redux';

// components
import BookCard from './book-card'

import './ShareSection.scss';

class ShareSection extends Component {
    constructor(props) {
        super(props);

        this.handleRequestBook = this.handleRequestBook.bind(this);
    }

    render() {
        return (
        <div id="ShareSection" className="section-container">
            <div className="section-header">
                <p className="section-title">Books available</p>
                <Link to='/test'>Browse all...</Link>
            </div>
            <div className="section-body">
                {this.renderBooks()}
            </div>
        </div>
        );
    }
    renderBooks() {
        let arr = this.props.variantsShare.variants_share.map((item, index) => {
            if (index < 10) {
                return <BookCard variant={item} key={item._id} requestBook={() => this.handleRequestBook(item)}/>
            }
            return null;
        });
        return arr;
    }
    handleRequestBook(variant) {
        console.log(variant);
    }
}

const mapStateToProps = (state, props) => {
    return {
        history: props.history,
        user: state.user,
        variantsShare: state.variantsShare
    }
}

export default connect(mapStateToProps)(ShareSection)