import React from 'react';
import {Link} from 'react-router-dom';
import {renderLongDate, renderRatingStars} from '../../utility/helperFunctions';

export default function FriendRecievedBookCard (props) {
    return (
        <div className="newsfeed-card-container">
            <div className="card-heading">
                <Link to='/'>
                    <img src={props.friend.avatar.image} alt="user avatar"/>
                </Link>
                <div className="name-date-container">
                    <p className="name"><strong>{props.friend.first_name + ' ' + props.friend.last_name}</strong> recieved a new book courtesy of <span className="name"><strong>{props.community_member.first_name + ' ' + props.community_member.last_name}</strong></span></p>
                    <p className="date">{renderLongDate(props.date)}</p>
                </div>
            </div>

            <div className="card-content">
                <img src={props.book.image } alt="book cover"/>
                <div className="book-text-container">
                    <p className="title"><strong>{ props.book.title }</strong></p>
                    <p className="author">by { props.book.authors[0] }</p>
                    
                    { renderRatingStars(props.book.ratings) }

                    <p className="book-description">{props.book.description}</p>
                </div>
            </div>
        </div>
    );
};