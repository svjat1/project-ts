import {apiService} from "./apiService";
import {IGenre, IMoviesResponse, IMovieWithGenres} from "../INterfaces";
import {IRes} from "../types/resType";
import {urls} from "../constants";


const movieService = {
    getAll:(page:number):IRes<IMoviesResponse> => apiService.get(urls.movie.base, {params:{page}}),
    getById: (id: number, p: { append_to_response: string }):IRes<IMovieWithGenres>=> apiService.get(urls.movie.byId(id)),
    getByGenre:(genreId:number, page:number): IRes<IMoviesResponse> =>apiService.get(urls.genre.byId(genreId), {params:{page}}),
    getByGid:(genreId:number): IRes<IMovieWithGenres> =>apiService.get(urls.genre.byId(genreId)),
    getGenre:():IRes<IMovieWithGenres>=> apiService.get(urls.genre.base)
}

export {
    movieService
}