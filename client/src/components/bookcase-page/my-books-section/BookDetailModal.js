import React, { Component } from 'react';
import Modal from 'react-modal';

import { renderRatingStars } from '../../utility/helperFunctions';
import placeholder from '../../../images/book-placeholder.png';

export default class BookDetailModal extends Component {
    render () { 
        const book = this.props.variant.book;
        return (
            <Modal
                className="BookDetailModal Modal col-11 col-sm-5 container"
                overlayClassName="Overlay"
                isOpen={this.props.isVisible}
                onRequestClose={this.props.closeModal}
                contentLabel="Book Detail Modal"
            >
                <div className="container">
                    <div className="row">
                        <p className="title col-12">{book.title} <span className="x-btn" onClick={this.props.closeModal}>X</span></p>

                        <div className="col-3">
                            <div className="left-side-container">
                                {this.renderImage()}
                                <button className="btn request-btn">Button</button>
                            </div>
                        </div>

                        <div className="col-9">
                            <div className="modal-header">
                                <div className="book-details">
                                    {this.renderAuthor()}
                                    {this.renderCategories()}
                                    <p>{renderRatingStars(book.ratings)}<span className="rating">{book.ratings}</span></p>
                                    <p>Book condition: <span className="condition">{this.renderBookCondition()}</span></p>
                                </div>
                            </div>

                            <div className="modal-body">
                                <p className="description">{book.description}</p>


                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }

    renderImage() {
        if (this.props.variant.book.image) {
            return <img className="cover-image" src={this.props.variant.book.image} alt="Book cover" />
        } else {
            return <img src={placeholder} alt="No book cover"/>
        }
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
    renderCategories() {
        if (this.props.variant.book.categories) {
            let str = '';
            Array.prototype.forEach.call(this.props.variant.book.categories, (cat, index) => {
                if (index < 2) {
                    if (index > 0) {
                        str += ', '
                    } 
                    str += cat;
                }
            });
            return (<p className="categories">{str}</p>);
        }
    }
    renderBookCondition() {
        return this.props.variant.book_condition.toUpperCase();
    }
}

