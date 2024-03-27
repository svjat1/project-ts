import {FC, PropsWithChildren,} from "react";
import {useNavigate} from "react-router-dom";

import css from './GenreList.module.css'
import {IMovie} from "../../../../INterfaces";
import {Rating} from "@mui/material";

interface IProps extends PropsWithChildren {
    genre: IMovie
}

const GenreList: FC<IProps> = ({genre}) => {

    const {id,  title, poster_path, vote_average} = genre
    const navigate = useNavigate()

    const toDetails: () => void = () => {
        const id = genre.id
        navigate(`/movie/${id}`)
    }

    return (
        <div className={css.genre}>
            <img src={`https://image.tmdb.org/t/p/w500/${genre.poster_path}`} alt={genre.title} className={css.img}
                 onClick={toDetails}/>
            <div>
                <Rating name="read-only" defaultValue={genre.vote_average} precision={1}/>
            </div>
        </div>

    );
};

export {GenreList};