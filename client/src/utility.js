export const getApiUrl = () => {
    if (window.location.hostname === 'localhost') {
        return 'http://localhost:8080';
    }
    else {
        return 'https://books-app-server-dev.herokuapp.com'
    }
}