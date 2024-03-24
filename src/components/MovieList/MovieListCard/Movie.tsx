import {FC, PropsWithChildren} from "react";

import css from './Movie.module.css'
import {useNavigate} from "react-router-dom";
import {IMovie} from "../../../INterfaces";
import {Rating} from "@mui/material";
interface IProps extends PropsWithChildren{
    movie: IMovie
}
const Movie: FC<IProps> = ({movie}) => {
    const {title, id,poster_path, vote_average} = movie
    const navigate = useNavigate()

    const toDetails:() => void =()=> {
        const id = movie.id
       navigate(`/movie/${id}`)
    }

    return (
        <div className={css.Movie} onClick={toDetails}>
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} className={css.img}/>
            <div>
            <Rating name="read-only" defaultValue={movie.vote_average} precision={1}/>
            </div>
        </div>

    );
}

export {Movie};