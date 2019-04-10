import {API_BASE_URL} from '../../components/utility/helperFunctions';

export const getNewsfeeds = (token) => dispatch => {
    dispatch(getNewsfeedsRequest());

    return fetch(`${API_BASE_URL}/newsfeeds/`, 
        {
            headers: {
                "Authorization": `Token ${token}`,
            },
        }
    ).then(res => {
        return res.json();
    }).then(resJson => {
        dispatch(getNewsfeedsSuccess(resJson));
    }).catch(err => {
        console.error(err);
        dispatch(getNewsfeedsError(err));
    });
};

export const getNewsfeedsRequest = () => (
    {
        type: 'GET_NEWSFEEDS_REQUEST'
    }
);

export const getNewsfeedsSuccess = (newsfeeds) => (
    {
        type: 'GET_NEWSFEEDS_SUCCESS',
        payload: newsfeeds
    }
);

export const getNewsfeedsError = (error) => (
    {
        type: 'GET_NEWSFEEDS_ERROR',
        payload: error
    }
);