const NODE_ENV = process.env.NODE_ENV

export const getApiUrl = () => {
    if (NODE_ENV === 'development') {
        return 'http://localhost:8080';
    }
    else {
        return 'https://books-app-server-dev.herokuapp.com'
    }
}