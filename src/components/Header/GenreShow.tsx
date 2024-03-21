import React, {FC, PropsWithChildren} from 'react';
import {useNavigate, useParams} from "react-router-dom";

import {IGenre} from "../../INterfaces";
import css from './Header.module.css'


interface GenreButtonProps {
    showGenres: boolean;
    genres: IGenre[]
}

const GenreShow:FC<GenreButtonProps> = ({showGenres, genres}) => {
    const {genreId} = useParams();
    const navigate = useNavigate()

    const toGenres = (genre: IGenre) => {
        navigate(`/genres/${genre.id}`)
    }
    return (
        <div >
            {showGenres && (
                <div className={css.GenreItem}>
                    {genres.map((genre) => (
                        <div key={genre.id} className={css.item} onClick={()=> toGenres(genre)}>{genre.name}</div>
                    ))}
                </div>
            )}
        </div>
    );
};

export {GenreShow};