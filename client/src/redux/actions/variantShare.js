import {API_BASE_URL} from '../../components/utility/helperFunctions';

// get books available for share
export const getVariantsShare = (token, pageObj) => dispatch => {
    dispatch(getVariantsShareRequest());

    return fetch(`${API_BASE_URL}/books/community`, 
        {
            method: 'POST',
            headers: {
                "Authorization": `Token ${token}`,
                "Content-type": 'application/json'
            },
            body: JSON.stringify(pageObj)
        }
    ).then(res => {
        return res.json();
    }).then(resJson => {
        dispatch(getVariantsShareSuccess(resJson));
    }).catch(err => {
        console.error(err);
        dispatch(variantsShareError(err));
    });
};

export const getVariantsShareRequest = () => (
    {
        type: 'GET_VARIANTS_SHARE_REQUEST'
    }
);

export const getVariantsShareSuccess = (variants_share) => (
    {
        type: 'GET_VARIANTS_SHARE_SUCCESS',
        payload: variants_share
    }
);

// search books available for share
export const searchVariantsShare = (token, query) => dispatch => {
    dispatch(searchVariantsShareRequest());

    return fetch(`${API_BASE_URL}/books/community/search`, 
        {
            method: 'POST',
            headers: {
                "Authorization": `Token ${token}`,
                "Content-type": 'application/json'
            },
            body: JSON.stringify(query)
        }
    ).then(res => {
        return res.json();
    }).then(resJson => {
        dispatch(searchVariantsShareSuccess(resJson));
    }).catch(err => {
        console.error(err);
        dispatch(variantsShareError(err));
    });
};

export const searchVariantsShareRequest = () => (
    {
        type: 'SEARCH_VARIANTS_SHARE_REQUEST'
    }
);

export const searchVariantsShareSuccess = (variants_share) => (
    {
        type: 'SEARCH_VARIANTS_SHARE_SUCCESS',
        payload: variants_share
    }
);



// error

export const variantsShareError = (error) => (
    {
        type: 'VARIANTS_SHARE_ERROR',
        payload: error
    }
);