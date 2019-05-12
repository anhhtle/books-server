const INITIAL_STATE = {
    variants: [
        {
            status: "Recommended",
            progress: 0,
            user_rating: null,
            friend: {
                avatar: {
                    _id: "c367851d914237495b576e01",
                    name: "The Knight",
                    image: "https://i.pinimg.com/originals/9a/d7/95/9ad79563b7fc172d847a0ddfbd9b2fcc.jpg",
                    quote: "A reader lives a thousand lives before he dies, said Jojen. The man who never reads lives only one.",
                    quote_author: "George R.R. Martin",
                    lock: "",
                    unlocked: "For being a reader"
                },
                _id: "a22bcba0fbc61672285a2e59",
                first_name: "Edd",
                last_name: "Lee"
            },
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
    error: null
}

export default function variantReducer (state = INITIAL_STATE, action) {
    switch (action.type) {
        // get user's variants
        case 'GET_VARIANTS_REQUEST':
            return {...state, loading: true, error: null};

        case 'GET_VARIANTS_SUCCESS':
            return {...state, variants: action.payload, error: null, loading: false};
            
        // add variants
        case 'ADD_VARIANT_REQUEST':
            return {...state, loading: true, error: null};

        case 'ADD_VARIANT_SUCCESS':
            return {...state, error: null, loading: false};
            


        // update variant
        case 'UPDATE_VARIANT_REQUEST':
            return {...state, loading: true, error: null};
        
        case 'UPDATE_VARIANT_SUCCESS':
            if (action.payload.error) {
                return {...state, error: action.payload.error, loading: false};
            } 

            return {...state, error: null, loading: false};
            
        // delete variant
        case 'DELETE_VARIANT_REQUEST':
            return {...state, loading: true, error: null};
        
        case 'DELETE_VARIANT_SUCCESS':
            if (action.payload.error) {
                return {...state, error: action.payload.error, loading: false};
            } 

            return {...state, error: null, loading: false};
            
        // error
        case 'VARIANTS_ERROR':
            return {...state, error: action.payload, loading: false};

        default:
            return state
    }
};