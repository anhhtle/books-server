import React from 'react';
import {Link} from 'react-router-dom';
import {renderDate} from '../utility/helperFunctions';

export default function FriendRequestCard (props) {
    return (
        <Link className="notification-card-container" to="#">
            <img src={props.notification.friend.avatar.image} alt="user avatar"/>

            <div className="notification-card-body">
                <p>
                    <strong> {props.notification.friend.first_name} {props.notification.friend.last_name} </strong> 
                    sent you a friend request
                </p>

                <p className="date-container">
                    <i className="fa fa-calendar"></i>
                    <span>{renderDate(props.notification.date)}</span>
                </p>
            </div>
        </Link>
    );
};