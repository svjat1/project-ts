import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import css from './Header.module.css';
import {GenreShow} from "./GenreShow";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {movieActions} from "../../store";



const Header = () => {

    const [searchValue, setSearchValue] = useState(''); //це для форми

    const [showGenres, setShowGenres] = useState(false);

    const dispatch = useAppDispatch()
    const {genre,trigger} = useAppSelector(state => state.movie)


    useEffect(() => {
            dispatch(movieActions.getGenre())
    }, []);

    const handleGenresClick: () => void = () => {
        setShowGenres((prevShow) => !prevShow);
    };

    const navigate = useNavigate();

    return (
        <div className={css.Main}>
            <div className={css.Header}>
                <button onClick={() => navigate('movie')} className={css.home}>Home</button>
                <div className={css.Search}>
                    <form>
                        <input type="text" placeholder="Serch" value={searchValue}/>
                    </form>
                </div>
                <button onClick={handleGenresClick} className={css.GenreButton}>Жанри</button>
                <div className={css.Theme}>
                    <button
                        onClick={() => dispatch(movieActions.setMode(trigger))}>{!trigger ? 'dark' : 'light'}</button>
                </div>
            </div>
            <div className={css.GenreList}>
                {<GenreShow showGenres={showGenres} genres={genre}/>}
            </div>
        </div>
    );
}

export {
    Header
}