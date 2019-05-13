import React, { Component } from 'react';
import Modal from 'react-modal';

import { renderRatingStars } from '../../utility/helperFunctions';
import placeholder from '../../../images/book-placeholder.png';

export default class BookDetailModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            available_for_share: this.props.variant.available_for_share,
            book_condition: this.props.variant.book_condition,
            progress: this.props.variant.progress,
            status: this.props.variant.status,
            user_rating: this.props.variant.user_rating,
        }
    }

    render () { 
        const book = this.props.variant.book;
        return (
            <Modal
                className="MyBooksSection BookDetailModal Modal col-11 col-sm-5 container"
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

                            </div>
                        </div>

                        <div className="col-9">
                            <div className="modal-header col-12">
                                <div className="book-details col-sm-5">
                                    {this.renderAuthor()}
                                    {this.renderCategories()}
                                    <p>Average rating: {renderRatingStars(book.ratings)}</p>
                                    {/* user rating */}
                                    <p className="user-rating">My rating: 
                                        <a href="#" className="dropdown-toggle" id="user-rating-dropdown" data-toggle="dropdown"  aria-expanded="false"> {renderRatingStars(this.state.user_rating)}
                                        </a>
                                        <div className="dropdown-menu" aria-labelledby="user-rating-dropdown">
                                            <a className="dropdown-item" href="#">{renderRatingStars(1)}</a>
                                            <a className="dropdown-item" href="#">{renderRatingStars(2)}</a>
                                            <a className="dropdown-item" href="#">{renderRatingStars(3)}</a>
                                            <a className="dropdown-item" href="#">{renderRatingStars(4)}</a>
                                            <a className="dropdown-item" href="#">{renderRatingStars(5)}</a>
                                        </div>
                                    </p>
                                </div>
                                <div className="col-sm-7">
                                    {/* book condition */}
                                    <div className="select-div">
                                        <span>Book condition: </span>
                                        <select value={this.state.book_condition}>
                                            <option value="New">New</option>
                                            <option value="Like new">Like new</option>
                                            <option value="Fair">Fair</option>
                                            <option value="Used">Used</option>
                                        </select>
                                    </div>

                                    {/* variant statuses */}
                                    <div className="select-div">
                                        <span>Status: </span>
                                        <select value={this.state.status}>
                                            <option value="Read">Read</option>
                                            <option value="Reading">Reading</option>
                                            <option value="Watchlist">Want to read</option>
                                        </select>
                                    </div>

                                    {/* variant statuses */}
                                    <div className="select-div">
                                        <span>Progress: </span>
                                        <select value={this.state.progress}>
                                            <option value={0}>0%</option>
                                            <option value={10}>10%</option>
                                            <option value={20}>20%</option>
                                            <option value={30}>30%</option>
                                            <option value={40}>40%</option>
                                            <option value={50}>50%</option>
                                            <option value={60}>60%</option>
                                            <option value={70}>70%</option>
                                            <option value={80}>80%</option>
                                            <option value={90}>90%</option>
                                            <option value={100}>100%</option>
                                        </select>
                                    </div>

                                    {/* variant statuses */}
                                    <div className="select-div">
                                        <span>Share with community: </span>
                                        <select value={this.state.available_for_share}>
                                            <option value={true}>Yes</option>
                                            <option value={false}>No</option>
                                        </select>
                                    </div>
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
}

