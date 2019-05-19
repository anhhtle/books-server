import React, { Component } from 'react';
import Modal from 'react-modal';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateVariant, getVariants, deleteVariant } from '../../../redux/actions/variant';

import { renderRatingStars } from '../../utility/helperFunctions';
import placeholder from '../../../images/book-placeholder.png';

class BookDetailModal extends Component {
    componentDidMount() {
        this.setData();
    }

    constructor(props) {
        super(props);
        this.state = {
            available_for_share: null,
            book_condition: null,
            progress: null,
            status: null,
            user_rating: null,
        }

        this.handleChangeBookCondition = this.handleChangeBookCondition.bind(this);
        this.handleChangeUserRating = this.handleChangeUserRating.bind(this);
        this.handleChangeStatus = this.handleChangeStatus.bind(this);
        this.handleChangeProgress = this.handleChangeProgress.bind(this);
        this.handleChangeShare = this.handleChangeShare.bind(this);

        this.handleSave = this.handleSave.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    render () { 
        const book = this.props.variant.book;
        return (
            <Modal
                className="MyBooksSection BookDetailModal Modal col-11 col-sm-5 container"
                overlayClassName="Overlay"
                isOpen={this.props.isVisible}
                onRequestClose={this.handleCloseModal}
                contentLabel="Book Detail Modal"
            >
                <div className="container">
                    <div className="row">
                        <p className="title col-12">{book.title} <span className="x-btn" onClick={this.handleCloseModal}>X</span></p>

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
                                        <span className="dropdown-toggle" id="user-rating-dropdown" data-toggle="dropdown"  aria-expanded="false"> {renderRatingStars(this.state.user_rating)}
                                        </span>
                                        <span className="dropdown-menu" aria-labelledby="user-rating-dropdown">
                                            <button className="dropdown-item" onClick={() => this.handleChangeUserRating(1)}>{renderRatingStars(1)}</button>
                                            <button className="dropdown-item" onClick={() => this.handleChangeUserRating(2)}>{renderRatingStars(2)}</button>
                                            <button className="dropdown-item" onClick={() => this.handleChangeUserRating(3)}>{renderRatingStars(3)}</button>
                                            <button className="dropdown-item" onClick={() => this.handleChangeUserRating(4)}>{renderRatingStars(4)}</button>
                                            <button className="dropdown-item" onClick={() => this.handleChangeUserRating(5)}>{renderRatingStars(5)}</button>
                                        </span>
                                    </p>
                                </div>
                                <div className="col-sm-7">
                                    {/* book condition */}
                                    <div className="select-div">
                                        <span>Book condition: </span>
                                        <select value={this.state.book_condition} onChange={this.handleChangeBookCondition}>
                                            <option value="New">New</option>
                                            <option value="Like new">Like new</option>
                                            <option value="Fair">Fair</option>
                                            <option value="Used">Used</option>
                                        </select>
                                    </div>

                                    {/* variant statuses */}
                                    <div className="select-div">
                                        <span>Status: </span>
                                        <select value={this.state.status} onChange={this.handleChangeStatus}>
                                            <option value="Read">Read</option>
                                            <option value="Reading">Reading</option>
                                            <option value="Watchlist">Want to read</option>
                                        </select>
                                    </div>

                                    {/* variant statuses */}
                                    <div className="select-div">
                                        <span>Progress: </span>
                                        <select value={this.state.progress} onChange={this.handleChangeProgress}>
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
                                        <select value={this.state.available_for_share} onChange={this.handleChangeShare}>
                                            <option value={true}>Yes</option>
                                            <option value={false}>No</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-body">
                                <p className="description">{book.description}</p>
                            </div>

                            <div className="modal-footer">
                                <button className="btn btn-delete" onClick={this.handleDelete}>Delete</button>
                                <button className="btn btn-info" onClick={this.handleSave}>Save</button>
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

    setData() {
        this.setState({
            available_for_share: this.props.variant.available_for_share,
            book_condition: this.props.variant.book_condition,
            progress: this.props.variant.progress,
            status: this.props.variant.status,
            user_rating: this.props.variant.user_rating,
        });
    }

    handleChangeBookCondition(event) {
        this.setState({book_condition: event.target.value});
    }
    handleChangeUserRating(user_rating) {
        this.setState({user_rating});
    }
    handleChangeStatus(event) {
        let status = event.target.value;
        let progress = this.state.progress;
        if (status === 'Read') {
            progress = 100;
        } else if (status === 'Reading') {
            progress = 0;
        }
        this.setState({status, progress});
    }
    handleChangeProgress(event) {
        let progress = parseInt(event.target.value);
        let status = this.state.progress;
        if (progress === 100) {
            status = 'Read';
        } else if (progress >= 0) {
            status = 'Reading';
        }

        this.setState({progress, status});
    }
    handleChangeShare(event) {
        this.setState({available_for_share: event.target.value});
    }
    handleSave(e) {
        const saveObj = {
            variant_id: this.props.variant._id,
            update: {
                user_rating: this.state.user_rating,
                book_condition: this.state.book_condition,
                status: this.state.status,
                progress: this.state.progress,
                available_for_share: this.state.available_for_share
            }
        }

        this.props.updateVariant(this.props.user.token, saveObj)
        .then(() => {
            this.props.getVariants(this.props.user.token);
        });

        this.props.closeModal(e);
    }
    handleCloseModal(e){
        this.setData();
        this.props.closeModal(e);
    }
    handleDelete(e) {
        if (this.props.variant.share_requested) {
            alert('This book is being requested. Please response to the request first');
            return;
        }

        this.props.deleteVariant(this.props.user.token, this.props.variant._id)
        .then(() => {
            this.props.getVariants(this.props.user.token);
        });
        this.props.closeModal(e);
    }
}

const mapStateToProps = (state, props) => {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        getVariants, updateVariant, deleteVariant
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(BookDetailModal);