import React, { Component } from 'react';
import Modal from 'react-modal';

import './BookDetailModal.scss';
import { renderRatingStars } from '../../utility/helperFunctions.js';

Modal.setAppElement('#root')

export default class BookDetailModal extends Component {
    render () { 
        const book = this.props.variant.book;
        return (
            <Modal
                className="BookDetailModal Modal col-11 col-sm-6 container"
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
                                <button className="btn request-btn" onClick={this.props.requestBook}>REQUEST BOOK</button>
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

                                <p style={{color: "#8c1515"}}>OWNER</p>
                                <div className="owner-container">
                                    <img className="user-avatar" src={this.props.variant.user.avatar.image} alt="User avatar" />
                                    <div>
                                        <p>{this.props.variant.user.first_name} {this.props.variant.user.last_name}</p>
                                        <p>{this.renderAlias()}{this.renderJob()}</p>
                                        <p>Books shared: {this.props.variant.user.books_shared}</p>
                                    </div>
                                </div>
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
            return <img src='https://www.edsportrallysupplies.ie/media/catalog/product/cache/1/image/256x256/9df78eab33525d08d6e5fb8d27136e95/i/m/image-placeholder-alt_2_1.jpg' alt="No book cover"/>
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
            this.props.variant.book.categories.map((cat, index) => {
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
    renderAlias() {
        if (this.props.variant.user.alias) {
            return <span style={{color: '#8c1515', fontWeight: 'bold'}}>{this.props.variant.user.alias}</span>
        }
    }
    renderJob() {
        if (this.props.variant.user.alias && this.props.variant.user.job) {
            return ', ' + this.props.variant.user.job
        } else if (this.props.variant.user.job) {
            return this.props.variant.user.job;
        }
    }
}

