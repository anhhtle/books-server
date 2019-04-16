import {API_BASE_URL} from '../../components/utility/helperFunctions';

export const getNotifications = (token) => dispatch => {
    dispatch(getNotificationsRequest());

    return fetch(`${API_BASE_URL}/notifications/`, 
        {
            headers: {
                "Authorization": `Token ${token}`,
            },
        }
    ).then(res => {
        return res.json();
    }).then(resJson => {
        dispatch(getNotificationsSuccess(resJson));
    }).catch(err => {
        console.error(err);
        dispatch(notificationsError(err));
    });
};

export const getNotificationsRequest = () => (
    {
        type: 'GET_NOTIFICATIONS_REQUEST'
    }
);

export const getNotificationsSuccess = (notifications) => (
    {
        type: 'GET_NOTIFICATIONS_SUCCESS',
        payload: notifications
    }
);

// seen notifications
export const seenNotifications = (token) => dispatch => {
    dispatch(seenNotificationsRequest());

    return fetch(`${API_BASE_URL}/notifications/seen`, 
    {
        method: 'PUT',
        headers: {
            'Authorization': `Token ${token}`,
        }
    }
    ).then(res => {
        return res.json();
    }).then(resJson => {
        dispatch(seenNotificationsSuccess(resJson));
    }).catch(err => {
        console.log(err);
        dispatch(notificationsError(err));
    });
}

export const seenNotificationsRequest= () => (
    {
        type: 'SEEN_NOTIFICATIONS_REQUESTS'
    }
);

export const seenNotificationsSuccess = (notifications) => (
    {
        type: 'SEEN_NOTIFICATIONS_SUCCESS',
        payload: notifications
    }
);

// error
export const notificationsError = (error) => (
    {
        type: 'NOTIFICATIONS_ERROR',
        payload: error
    }
);