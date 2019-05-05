import React from 'react';

import placeholder from '../../images/book-placeholder.png';
import './BookSearchPage.scss';
import { renderRatingStars } from '../utility/helperFunctions';

class BookCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {          
        return (
            <div className="col-12 col-md-6">
                <div className="search-book-card">
                    {this.renderImage()}
                    <div className="card-body">
                        <p className="book-title">{this.props.item.volumeInfo.title}</p>
                        {this.renderAuthor()}
                        {renderRatingStars(this.props.item.volumeInfo.averageRating ? this.props.item.volumeInfo.averageRating : 0)}

                        <div className="btn-container">
                            <button className="btn bookcase-btn">Add to bookcase</button>
                            <button className="btn want-to-read-btn">Want to read</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    renderImage() {
        if (this.props.item.volumeInfo.imageLinks) {
            return <img src={this.props.item.volumeInfo.imageLinks.thumbnail} alt="book cover"/>
        }
        return <img src={placeholder} alt="No book cover"/>
    }
    renderAuthor() {
        if (this.props.item.volumeInfo.authors) {
            return <p className="author">By {this.props.item.volumeInfo.authors[0]}</p>
        }
    }
}

export default (BookCard)