import {FC} from 'react';
import {useNavigate} from "react-router-dom";

import {IGenre} from "../../INterfaces";
import css from './Header.module.css'

interface GenreButtonProps {
    showGenres: boolean;
    genres: IGenre[]
}

const GenreShow: FC<GenreButtonProps> = ({showGenres, genres}) => {

    const navigate = useNavigate()

    const toGenres = (genre: IGenre): void  => {
        navigate(`/genres/${genre.id}`)
    }
    return (
        <div>
            {showGenres && (
                <div className={css.GenreItem}>
                    {genres.map((genre) => (
                        <div key={genre.id} className={css.item} onClick={() => toGenres(genre)}>{genre.name}</div>
                    ))}
                </div>
            )}
        </div>
    );
};

export {GenreShow};