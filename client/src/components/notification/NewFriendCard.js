import React from 'react';
import {Link} from 'react-router-dom';
import {renderDate} from '../utility/helperFunctions';

export default function NewFriendCard (props) {
    return (
        <Link className="notification-card-container" to="#">
            <img src={props.notification.friend.avatar.image} alt="user avatar"/>

            <div className="notification-card-body">
                <p>
                    You and <strong>{props.notification.friend.first_name} {props.notification.friend.last_name}</strong> are now friends
                </p>

                <p className="date-container">
                    <i className="fa fa-calendar"></i>
                    <span>{renderDate(props.notification.createdAt)}</span>
                </p>
            </div>
        </Link>
    );
};