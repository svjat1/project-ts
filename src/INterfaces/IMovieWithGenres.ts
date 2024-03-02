import {IGenre} from "./IGenre";
import {IMovie} from "./IMovie";

export interface IMovieWithGenres extends IMovie {
    genres: IGenre[];
};