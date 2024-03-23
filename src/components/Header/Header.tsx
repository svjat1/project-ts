import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import css from './Header.module.css';
import {GenreShow} from "./GenreShow";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {movieActions} from "../../store";
import {TextField} from "@mui/material";
import {useForm} from "react-hook-form";



const Header = () => {
   const {register, reset, handleSubmit, setValue} = useForm()
    const [searchValue, setSearchValue] = useState<string>(''); //це для форми

    const dispatch = useAppDispatch()
    const {genre,trigger, showGenre,query} = useAppSelector(state => state.movie)

    console.log(query);
    useEffect(() => {
            dispatch(movieActions.getGenre())
    }, []);

    const navigate = useNavigate();
    const clear =()=> {
        dispatch(movieActions.setQuery(''))
        reset()
    };

    return (
        <div className={!trigger ? css.Main : css.MainDark}>
            <div className={css.Header}>
                <button onClick={() => navigate('movie')} className={css.home}>Home</button>
                <div className={css.Search}>
                    <form onSubmit={handleSubmit(clear)}>
                        <input type="text" placeholder="Serch"
                              {...register('search')}
                               onChange={(e) => {
                                   setValue('search', e.target.value)
                                   dispatch(movieActions.setQuery(e.target.value))
                               }}
                        />
                        <button type={"submit"} >Show All</button>
                        {/*<TextField id="outlined-basic" label="Serch" variant="outlined" />*/}
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