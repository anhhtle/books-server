import React from 'react';
import {Link} from 'react-router-dom';
import {renderDate} from '../utility/helperFunctions';

export default function NewAvatarCard (props) {
    return (
        <Link className="notification-card-container" to="#">
            <img src={props.notification.avatar.image} alt="user avatar"/>

            <div className="notification-card-body">
                <p>
                    You earned the <strong>{props.notification.avatar.name}</strong> avatar!
                </p>

                <p className="date-container">
                    <i className="fa fa-calendar"></i>
                    <span>{renderDate(props.notification.createdAt)}</span>
                </p>
            </div>
        </Link>
    );
};