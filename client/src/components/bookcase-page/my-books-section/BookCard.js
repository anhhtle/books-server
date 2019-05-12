import React, { Component } from 'react';
import { renderRatingStars } from '../../utility/helperFunctions';

import BookDetailModal from './BookDetailModal';

import placeholder from '../../../images/book-placeholder.png';

export default class bookCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
        }
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    render() {
        const book = this.props.variant.book;

        return (
            <div className="book-card" onClick={() => this.setState({showModal: true})}>
                {this.renderImage()}
                <p className="book-title">{book.title}</p>
                {this.renderAuthor()}
                <div>
                    {renderRatingStars(book.ratings)}
                </div>

                <BookDetailModal variant={this.props.variant} isVisible={this.state.showModal} closeModal={this.handleCloseModal} />
            </div>
        );
    }
    renderAuthor() {
        let str = ''
        if(this.props.variant.book.authors) {
            str += `by ${this.props.variant.book.authors[0]}`;
        }
        if(this.props.variant.book.authors.length > 1) {
            str += ', and ...';
        }
        return <p className="author">{str}</p>;
    }
    renderImage() {
        if (this.props.variant.book.image) {
            return <img src={this.props.variant.book.image} alt="Book cover" />
        } else {
            return <img src={placeholder} alt="No book cover"/>
        }
    }
    handleCloseModal(e) {
        e.stopPropagation();
        this.setState({showModal: false});
    }
}
