const INITIAL_STATE = {
    requests: [],
    loading: false,
    error: null
};

export default function requestsReducer (state = INITIAL_STATE, action) {
    switch (action.type) {

        // get book requests
        case 'GET_BOOK_REQUESTS_REQUEST':
            return {...state, loading: true};

        case 'GET_BOOK_REQUESTS_SUCCESS':
            return {...state, requests: action.payload, error: null, loading: false};

        case 'GET_BOOK_REQUESTS_ERROR':
            return {...state, error: action.payload, loading: false};

        // create book requests
        case 'CREATE_BOOK_REQUEST_REQUEST':
            return {...state, loading: true};

        case 'CREATE_BOOK_REQUEST_SUCCESS':
            return {...state, error: null, loading: false};

        case 'CREATE_BOOK_REQUEST_ERROR':
            return {...state, error: action.payload, loading: false};
            
        // update book requests
        case 'UPDATE_BOOK_REQUESTS_REQUEST':
            return {...state, loading: true};

        case 'UPDATE_BOOK_REQUESTS_SUCCESS':
            return {...state, error: null, loading: false};

        case 'UPDATE_BOOK_REQUESTS_ERROR':
            return {...state, error: action.payload, loading: false};

        default:
            return state
    }
};