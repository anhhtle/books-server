const NODE_ENV = process.env.NODE_ENV

export const getApiUrl = () => {
    console.log(NODE_ENV);
    if (NODE_ENV !== 'development') {
        return 'https://books-app-server-dev.herokuapp.com'
    }
    else {
        return 'http://localhost:8080';
    }
}