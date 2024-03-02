import {apiService} from "./apiService";
import {IMoviesResponse, IMovieWithGenres} from "../INterfaces";
import {IRes} from "../types/resType";
import {urls} from "../constants";


const movieService = {
    getAll:(page:number):IRes<IMoviesResponse> => apiService.get(urls.movie.base, {params:{page}}),
    getById: (id: number, p: { append_to_response: string }):IRes<IMovieWithGenres>=> apiService.get(urls.movie.byId(id)),
    getByGenre:(genreId:number, page:number): IRes<IMoviesResponse> =>apiService.get(urls.genre.byId(genreId), {params:{page}})
}

export {
    movieService
}