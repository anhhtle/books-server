import {API_BASE_URL} from '../../components/utility/helperFunctions';

// *********************** user ****************************
// create new user
// export const createNewUser = (createObj) => dispatch => {
//     dispatch(createNewUserRequest());

//     return fetch(`${API_BASE_URL}/user/`, 
//         {
//             method: 'POST',
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(createObj)
//         }
//     ).then(res => {
//         return res.json();
//     }).then(token => {
//         dispatch(createNewUserSuccess(token));
//     }).catch(err => {
//         dispatch(userError(error));
//     });
// };

// export const createNewUserRequest = () => (
//     {
//         type: 'CREATE_NEW_USER_REQUEST'
//     }
// );

// export const createNewUserSuccess = (token) => (
//     {
//         type: 'CREATE_NEW_USER_SUCCESS',
//         payload: token
//     }
// );

// sign in and get token
export const getUserToken = (loginObj) => dispatch => {
    dispatch(getUserTokenRequest());

    return fetch(`${API_BASE_URL}/user/login`, 
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(loginObj)
        }
    ).then(res => {
        return res.json();
    }).then(token => {
        dispatch(getUserTokenSuccess(token));
    }).catch(err => {
        dispatch(userError(err));
    });
};

export const getUserTokenRequest = () => (
    {
        type: 'GET_USER_TOKEN_REQUEST'
    }
);

export const getUserTokenSuccess = (token) => (
    {
        type: 'GET_USER_TOKEN_SUCCESS',
        payload: token
    }
);

// get current user
export const getCurrentUser = (token) => dispatch => {
    dispatch(getCurrentUserRequest());

    return fetch(`${API_BASE_URL}/user/current`, 
    {
        method: 'GET',
        headers: {
            'Authorization': `Token ${token}`,
            "Accept": "application/json"
        }
    }
    ).then(res => {
        if( res.status === 401) {
            return {error: true}
        }
        return res.json();
    }).then(user => {
        dispatch(getCurrentUserSuccess(user, token));
    }).catch(err => {
        dispatch(userError(err));
    });
}

export const getCurrentUserRequest = () => (
    {
        type: 'GET_CURRENT_USER_REQUEST'
    }
);

export const getCurrentUserSuccess = (user, token) => (
    {
        type: 'GET_CURRENT_USER_SUCCESS',
        payload: {user, token}
    }
);

// delete a friend
// export const deleteFriend = (token, updateObj, index) => dispatch => {
//     dispatch(deleteFriendRequest());

//     return fetch(`${API_BASE_URL}/user/friend/delete`, 
//     {
//         method: 'PUT',
//         headers: {
//             'Authorization': `Token ${token}`,
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(updateObj)
//     }
//     ).then(res => {
//         return res.json();
//     }).then(resJson => {
//         dispatch(deleteFriendSuccess(resJson, index));
//     }).catch(err => {
//         console.log(err);
//         dispatch(userError(error));
//     });
// }

// export const deleteFriendRequest= () => (
//     {
//         type: 'DELETE_FRIEND_REQUEST'
//     }
// );

// export const deleteFriendSuccess = (user, index) => (
//     {
//         type: 'DELETE_FRIEND_SUCCESS',
//         payload: {user, index}
//     }
// );

// UPDATE user profile
// export const updateProfile = (token, updateObj) => dispatch => {
//     dispatch(updateProfileRequest());

//     return fetch(`${API_BASE_URL}/user/profile`, 
//     {
//         method: 'PUT',
//         headers: {
//             'Authorization': `Token ${token}`,
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({updateObj})
//     }
//     ).then(res => {
//         return res.json();
//     }).then(resJson => {
//         dispatch(updateProfileSuccess(resJson));
//     }).catch(err => {
//         console.log(err);
//         dispatch(userError(error));
//     });
// }

// export const updateProfileRequest= () => (
//     {
//         type: 'UPDATE_PROFILE_REQUEST'
//     }
// );

// export const updateProfileSuccess = (setting) => (
//     {
//         type: 'UPDATE_PROFILE_SUCCESS',
//         payload: setting
//     }
// );

// UPDATE setting
// export const updateSetting = (token, updateObj) => dispatch => {
//     dispatch(updateSettingRequest());

//     return fetch(`${API_BASE_URL}/user/setting`, 
//     {
//         method: 'PUT',
//         headers: {
//             'Authorization': `Token ${token}`,
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(updateObj)
//     }
//     ).then(res => {
//         return res.json();
//     }).then(resJson => {
//         dispatch(updateSettingSuccess(resJson));
//     }).catch(err => {
//         console.log(err);
//         dispatch(userError(error));
//     });
// }

// export const updateSettingRequest= () => (
//     {
//         type: 'UPDATE_SETTING_REQUEST'
//     }
// );

// export const updateSettingSuccess = (setting) => (
//     {
//         type: 'UPDATE_SETTING_SUCCESS',
//         payload: setting
//     }
// );

// error
export const userError = (error) => (
    {
        type: 'USER_ERROR',
        payload: error
    }
);
