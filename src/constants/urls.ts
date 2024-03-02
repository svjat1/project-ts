const baseURL = 'https://api.themoviedb.org/3'

const movies = '/discover/movie'
const movie = '/movie'
const genre = '/genre/movie/list'
const movieWith = '/discover/movie?with_genres='
const urls = {
    movie:{
        base:movies,
        byId:(id:number)=> `${movie}/${id}`
    },
    genre:{
        base:genre,
        byId:(genreId:number)=> `${movieWith}${genreId}`
    }
}
export {
    baseURL,
    urls
}