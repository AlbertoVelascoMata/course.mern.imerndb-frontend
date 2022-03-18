import API from './api';

function getAllMovies() {
    return API.get('/movies').then(res => res.data);
}

function addNewBookmark(email, movie){
    return API.post('/bookmarks', {
        email,
        movie}).then(result => result.data);
}

function getSingleMovie(idmovie) {
    return API.get('/movies/'+idmovie).then(res => res.data);
}

export { getAllMovies, addNewBookmark, getSingleMovie }
