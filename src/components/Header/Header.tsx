import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import css from './Header.module.css';
import {GenreShow} from "./GenreShow";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {movieActions} from "../../store";
import {TextField} from "@mui/material";
import {useForm} from "react-hook-form";



const Header = () => {
   const {register, reset, handleSubmit} = useForm()
    const [searchValue, setSearchValue] = useState(''); //це для форми

    const dispatch = useAppDispatch()
    const {genre,trigger, showGenre} = useAppSelector(state => state.movie)


    useEffect(() => {
            dispatch(movieActions.getGenre())
    }, []);


    const navigate = useNavigate();

    return (
        <div className={!trigger ? css.Main : css.MainDark}>
            <div className={css.Header}>
                <button onClick={() => navigate('movie')} className={css.home}>Home</button>
                <div className={css.Search}>
                    <form>
                        {/*<input type="text" placeholder="Serch" value={searchValue}/>*/}
                        <TextField id="outlined-basic" label="Serch" variant="outlined" />
                        <button>Search</button>
                    </form>
                </div>
                <button onClick={()=> dispatch(movieActions.setGenre())} className={css.GenreButton}>Жанри</button>
                <div className={css.Theme}>
                    <button
                        onClick={() => dispatch(movieActions.setMode())}>{!trigger ? 'dark' : 'light'}</button>
                </div>
            </div>
            <div className={css.GenreList}>
                {<GenreShow genres={genre}/>}
            </div>
        </div>
    );
}

export {
    Header
}