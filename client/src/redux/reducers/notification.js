const INITIAL_STATE = {
    notifications: [],
    error: null,
    loading: false,
};

export default function notificationReducer (state = INITIAL_STATE, action) {
    switch (action.type) {

        // get newsfeeds
        case 'GET_NOTIFICATIONS_REQUEST':
            return {...state, loading: true};

        case 'GET_NOTIFICATIONS_SUCCESS':
            return {...state, notifications: action.payload, error: null, loading: false};

        // seen notifications
        case 'SEEN_NOTIFICATIONS_REQUESTS':
            return {...state, loading: true};

        case 'SEEN_NOTIFICATIONS_SUCCESS':
            if (action.payload.error) {
                return {...state, error: action.payload.error, loading: false };
            } else {
                const seen_notifications = [];
                Array.prototype.forEach.call(state.notifications, notification => {
                    let seen_notif = Object.assign({}, notification);
                    seen_notif.new = false;
                    seen_notifications.push(seen_notif);
                })

                return {notifications: seen_notifications, error: false, loading: false };
            }

        // error
        case 'NOTIFICATIONS_ERROR':
            return {...state, error: action.payload, loading: false};

        default:
            return state
    }
};