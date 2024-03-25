import {FC, PropsWithChildren} from "react";

import css from './Movie.module.css'
import {useNavigate} from "react-router-dom";
import {IMovie} from "../../../INterfaces";
import {Rating} from "@mui/material";
import {useAppSelector} from "../../../hooks";

interface IProps extends PropsWithChildren {
    movie: IMovie
}

const Movie: FC<IProps> = ({movie}) => {
    const {title, id, poster_path, vote_average} = movie
    const navigate = useNavigate()
    const {trigger} = useAppSelector(state => state.movie)
    const toDetails: () => void = () => {
        const id = movie.id
        navigate(`/movie/${id}`)
    }

    return (
        <div className={css.Movie}>
            {movie.poster_path ? (
                <img onClick={toDetails} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title}
                  className={!trigger ? css.img : css.imgDark}/>   ) : (
            <div>{movie.title}</div>
                )}
            <div>
                <Rating name="read-only" defaultValue={movie.vote_average} precision={1}/>
            </div>
        </div>

    );
}

export {Movie};