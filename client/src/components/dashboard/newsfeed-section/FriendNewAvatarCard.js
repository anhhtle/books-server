import React from 'react';
import {Link} from 'react-router-dom';
import {renderLongDate} from '../../utility/helperFunctions';

export default function FriendNewAvatarCard (props) {
    return (
        <div className="newsfeed-card-container">
            <div className="card-heading">
                <Link to='/'>
                    <img src={props.friend.avatar.image} alt="user avatar"/>
                </Link>
                <div className="name-date-container">
                    <p className="name"><strong>{props.friend.first_name + ' ' + props.friend.last_name}</strong> unlocked a new avatar</p>
                    <p className="date">{renderLongDate(props.date)}</p>
                </div>
            </div>

            <div className="card-content">
                <img src={props.avatar.image} alt="avatar"/>
                <div className="book-text-container">
                    <p className="title"><strong>{ props.avatar.name }</strong></p>
                    <p className="author">{ props.avatar.quote }</p>
                </div>
            </div>
        </div>
    );
};