const INITIAL_STATE = {
    variants_share: [
        {
            status: "",
            progress: 0,
            user_rating: null,
            friend: null,
            book_condition: "",
            available_for_share: false,
            share_requested: false,
            recieved_at: "2018-12-11T07:25:34.225Z",
            _id: "",
            user: {
                avatar: {
                    _id: "",
                    name: "",
                    image: "",
                },
                _id: "a22bcba0fbc61672285a2e59",
                first_name: "Edd",
                last_name: "Lee"
            },
            book: {
                authors: [
                ],
                categories: [
                ],
                description: "",
                image: "",
                ratings: 0,
                industryIdentifiers: [],
                _id: "",
                google_id: "",
                title: ""
            }
        }
    ],
    loading: false,
    error: null,
    total: null,
    limit: null,
    page: null,
    pages: null
};

export default function variantShareReducer (state = INITIAL_STATE, action) {
    switch (action.type) {
        // get all variant share (excluding user's)
        case 'GET_VARIANTS_SHARE_REQUEST':
            return {...state, loading: true};

        case 'GET_VARIANTS_SHARE_SUCCESS':
            if (action.payload.error) {
                return {...state, error: action.payload.error, 
                    total: null, 
                    limit: null, 
                    page: null,
                    pages: null,
                    loading: false 
                };
            } else {
                return {
                    variants_share: action.payload.docs, 
                    total: action.payload.total, 
                    limit: action.payload.limit, 
                    page: action.payload.page, 
                    pages: action.payload.pages,
                    loading: false, error: null 
                };
            }

        // search variant share by title or authors
        case 'SEARCH_VARIANTS_SHARE_REQUEST':
            return {...state, loading: true};

        case 'SEARCH_VARIANTS_SHARE_SUCCESS':
            if (action.payload.error) {
                return {...state, error: action.payload.error, 
                    total: null, 
                    limit: null, 
                    page: null,
                    pages: null,
                    loading: false 
                };
            } else {
                return {
                    variants_share: action.payload.docs, 
                    total: action.payload.total, 
                    limit: action.payload.limit, 
                    page: action.payload.page, 
                    pages: action.payload.pages,
                    loading: false, error: null 
                };
            }

        // error
        case 'VARIANTS_SHARE_ERROR':
            return {...state, error: action.payload.error, 
                total: null, 
                limit: null, 
                page: null,
                pages: null,
                loading: false
            };

        default:
            return state
    }
};