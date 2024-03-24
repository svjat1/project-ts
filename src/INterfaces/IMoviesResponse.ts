import {IMovie} from "./IMovie";


export interface IMoviesResponse{
    page:number,
    results: IMovie[],
    total_pages: number
}