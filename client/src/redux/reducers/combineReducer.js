import { combineReducers } from 'redux';
// import appStaterReducer from './appState';
// import avatarReducer from './avatar';
// import friendRequestsReducer from './friendRequest';
import newsfeedReducer from './newsfeed';
// import notificationReducer from './notification';
// import requestsReducer from './requests';
// import settingssReducer from './settings';
import userReducer from './user';
// import variantReducer from './variant';
import variantShareReducer from './variantShare';
// import variantFriendReducer from './variantFriend';

export default combineReducers({
    // appState: appStaterReducer,
    // avatars: avatarReducer,
    // friendRequests: friendRequestsReducer,
    newsfeeds: newsfeedReducer,
    // notifications: notificationReducer,
    // requests: requestsReducer,
    // settings: settingssReducer,
    user: userReducer,
    // variants: variantReducer,
    variantsShare: variantShareReducer,
    // variantsFriend: variantFriendReducer,
});