import {IMovie} from "./IMovie";


export interface IMoviesResponse{
    page:number,
    results: IMovie[],
    total_pages: number
}
export interface ITrailer {
    key: string;
}
export interface ITrailerResponse {
    id: number;
    results: [{
        key: string,
        type: string
}]
}