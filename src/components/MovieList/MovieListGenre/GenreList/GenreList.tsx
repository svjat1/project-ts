import {FC, PropsWithChildren, } from "react";

import css from './GenreList.module.css'
import {useNavigate} from "react-router-dom";
import {IMovie} from "../../../../INterfaces";

interface IProps extends PropsWithChildren {
    genre: IMovie
}
const GenreList: FC<IProps> = ({genre}) => {

    const {id, original_title, title, poster_path} = genre
    const navigate = useNavigate()

    const toDetails =()=> {
        const id = genre.id
        navigate(`/movie/${id}`)
    }

    return (
        <div className={css.genre}>
            <img src={`https://image.tmdb.org/t/p/w500/${genre.poster_path}`} alt={genre.title} className={css.img} onClick={toDetails}/>
        </div>

    );
};

export {GenreList};