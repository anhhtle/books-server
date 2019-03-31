import React, { Component } from 'react';
import { renderRatingStars } from '../helperFunctions.js';

import './BookCard.scss';

export default class bookCard extends Component {
    render() {
        const book = this.props.book;

        return (
            <div className="book-card">
                {this.renderImage()}
                <p className="title">{book.title}</p>
                {this.renderAuthor()}
                <div>
                    {renderRatingStars(this.props.book.ratings)}
                </div>
            </div>
        );
    }
    renderAuthor() {
        let str = ''
        if(this.props.book.authors) {
            str += `by ${this.props.book.authors[0]}`;
        }
        if(this.props.book.authors.length > 1) {
            str += ', and ...';
        }
        return <p className="author">{str}</p>;
    }
    renderImage() {
        if (this.props.book.image) {
            return <img src={this.props.book.image} alt="Book cover" />
        } else {
            return <img src='https://www.edsportrallysupplies.ie/media/catalog/product/cache/1/image/256x256/9df78eab33525d08d6e5fb8d27136e95/i/m/image-placeholder-alt_2_1.jpg' alt="No book cover"/>
        }
    }
}
