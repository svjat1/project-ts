import {FC} from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";

import {IGenre} from "../../INterfaces";
import css from './Header.module.css'
import {useAppSelector} from "../../hooks";

interface GenreButtonProps {
    genres: IGenre[]
}

const GenreShow: FC<GenreButtonProps> = ({genres}) => {

    const navigate = useNavigate()
    const {showGenre} =  useAppSelector(state => state.movie)
    const [, setQuery] = useSearchParams({page: "1"});

    const toGenres = (genre: IGenre): void  => {
        navigate(`/genres/${genre.id}`)
        setQuery({page: "1"})
    }
    return (
        <div>
            {showGenre && (
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