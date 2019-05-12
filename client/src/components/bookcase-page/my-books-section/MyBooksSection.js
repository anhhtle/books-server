import React from 'react';
import {Link} from 'react-router-dom';

import BookCard from './BookCard';

class MyBooksSection extends React.Component {

    render() { return (
        <div id="MyBooksSection" className="section-container">
            <div className="section-header">
                <p className="section-title">My books</p>
                <Link to='/test'>Browse all...</Link>
            </div>
            <div className="section-body">
                {this.renderBooks()}
            </div>

        </div>
    )}

    renderBooks() {
        let arr = this.props.variants.variants.map((item, index) => {
            if (index < 10) {
                return <BookCard variant={item} key={item._id} />
            }
            return null;
        });
        return arr;
    }
}

export default MyBooksSection;