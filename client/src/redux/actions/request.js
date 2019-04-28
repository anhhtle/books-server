import {API_BASE_URL} from '../../components/utility/helperFunctions';

// get book requests
export const getBookRequests = (token) => dispatch => {
    dispatch(getBookRequestsRequest());

    return fetch(`${API_BASE_URL}/requests/`, 
        {
            headers: {
                "Authorization": `Token ${token}`,
            },
        }
    ).then(res => {
        return res.json();
    }).then(resJson => {
        dispatch(getBookRequestsSuccess(resJson));
    }).catch(err => {
        console.error(err);
        dispatch(getBookRequestsError(err));
    });
};

export const getBookRequestsRequest = () => (
    {
        type: 'GET_BOOK_REQUESTS_REQUEST'
    }
);

export const getBookRequestsSuccess = (requests) => (
    {
        type: 'GET_BOOK_REQUESTS_SUCCESS',
        payload: requests
    }
);

export const getBookRequestsError = (error) => (
    {
        type: 'GET_BOOK_REQUESTS_ERROR',
        payload: error
    }
);


// create book requests
export const createBookRequest = (token, createObj) => dispatch => {
    dispatch(createBookRequestRequest());

    return fetch(`${API_BASE_URL}/requests/`, 
        {
            method: 'POST',
            headers: {
                "Authorization": `Token ${token}`,
                "Content-type": 'application/json'
            },
            body: JSON.stringify(createObj)
        }
    ).then(res => {
        return res.json();
    }).then(resJson => {
        dispatch(createBookRequestSuccess(resJson));
    }).catch(err => {
        console.error(err);
        dispatch(createBookRequestError(err));
    });
};

export const createBookRequestRequest = () => (
    {
        type: 'CREATE_BOOK_REQUEST_REQUEST'
    }
);

export const createBookRequestSuccess = (requests) => (
    {
        type: 'CREATE_BOOK_REQUEST_SUCCESS',
        payload: requests
    }
);

export const createBookRequestError = (error) => (
    {
        type: 'CREATE_BOOK_REQUEST_ERROR',
        payload: error
    }
);

// update request
export const updateBookRequests = (token, updateObj) => dispatch => {
    dispatch(updateBookRequestsRequest());

    return fetch(`${API_BASE_URL}/requests/`, 
        {
            method: 'PUT',
            headers: {
                "Authorization": `Token ${token}`,
                "Content-type": 'application/json'
            },
            body: JSON.stringify(updateObj)
        }
    ).then(res => {
        return res.json();
    }).then(resJson => {
        dispatch(updateBookRequestsSuccess(resJson));
    }).catch(err => {
        console.error(err);
        dispatch(updateBookRequestsError(err));
    });
};

export const updateBookRequestsRequest = () => (
    {
        type: 'UPDATE_BOOK_REQUESTS_REQUEST'
    }
);

export const updateBookRequestsSuccess = (requests) => (
    {
        type: 'UPDATE_BOOK_REQUESTS_SUCCESS',
        payload: requests
    }
);

export const updateBookRequestsError = (error) => (
    {
        type: 'UPDATE_BOOK_REQUESTS_ERROR',
        payload: error
    }
);
