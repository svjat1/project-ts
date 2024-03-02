import {FC, PropsWithChildren, useState} from "react";

import style1 from './Movie.module.css'
import style2 from './img.module.css'
import {useNavigate} from "react-router-dom";
import {IMovie} from "../../../INterfaces";
interface IProps extends PropsWithChildren{
    movie: IMovie
}
const Movie: FC<IProps> = ({movie}) => {
    const {original_title, title, id, overview, poster_path} =movie
    const navigate = useNavigate()

    const toDetails =()=> {
        const id = movie.id
        navigate(`/movie/${id}`)
    }

    return (
        <div className={style1.Movie} onClick={toDetails}>
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} className={style2.img}/>
        </div>
    );
}

export {Movie};