const INITIAL_STATE = {
    newsfeeds: [],
    error: null,
    loading: false
};

export default function newsfeedReducer (state = INITIAL_STATE, action) {
    switch (action.type) {
        // get newsfeeds
        case 'GET_NEWSFEEDS_REQUEST':
            return {...state, loading: true, error: null};

        case 'GET_NEWSFEEDS_SUCCESS':
            return {...state, newsfeeds: action.payload, error: null, loading: false};

        case 'GET_NEWSFEEDS_ERROR':
            return {...state, error: action.payload, loading: false};

        default:
            return state
    }
};