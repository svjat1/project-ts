import React, {useState, useEffect, PropsWithChildren} from 'react';
import { useNavigate } from 'react-router-dom';

import css from './Header.module.css';
import {movieService} from "../../services";
import {GenreShow} from "./GenreShow";


interface IGenre {
    id: number;
    name: string;
}
interface HeaderProps extends PropsWithChildren{
}
const Header: React.FC<HeaderProps> = () => {

    const [searchValue, setSearchValue] = useState('');
    const [genres, setGenres] = useState<IGenre[]>([]);
    const [showGenres, setShowGenres] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        // Завантажити список жанрів з API
        movieService.getGenre().then(({data}) => setGenres(data.genres))
    }, []);
    const handleGenresClick = () => {
        setShowGenres((prevShow) => !prevShow);
    };


    return (
        <div className={css.Main}>
            <div className={css.Header}>
            <button onClick={()=> navigate('movie')} className={css.home}>Home</button>
                <div className={css.Search}>
                    <form >
                        <input
                            type="text"
                            placeholder="Serch"
                            value={searchValue}

                        />
                    </form>
                </div>
                <button onClick={handleGenresClick} className={css.GenreButton}>Жанри</button>
                <div className={css.Theme}>
                    <button >Тема</button>
                </div>
            </div>
            <div className={css.GenreList}>
                {<GenreShow showGenres={showGenres} genres={genres}/>}
            </div>
        </div>
    );
}

    export {
        Header
    }