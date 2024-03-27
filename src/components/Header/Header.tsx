import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {SubmitHandler, useForm} from "react-hook-form";
import * as React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import {Avatar} from "@mui/material";

import css from './Header.module.css';
import {GenreShow} from "./GenreShow";
import {useAppDispatch, useAppSelector, usePageQuery} from "../../hooks";
import {movieActions} from "../../store";
import {IString} from "../../INterfaces";


const Header = () => {
    const {register, reset, handleSubmit} = useForm<IString>()
    const {page} = usePageQuery();

    const dispatch = useAppDispatch()
    const {genre, trigger, query} = useAppSelector(state => state.movie)

    console.log(query);
    useEffect(() => {
        dispatch(movieActions.getGenre())
    }, []);

    const navigate = useNavigate();

    const save: SubmitHandler<IString> = async (data) => {
        await navigate(`/movie`)
        const {query} = data
        dispatch(movieActions.searchCollection({query, page}));
        dispatch(movieActions.setQuery(query))
        reset()
    }

    const [state, setState] = React.useState({
        gilad: true,
        jason: false,
        antoine: true,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });
    };


    return (
        <div className={!trigger ? css.Main : css.MainDark}>
            <div className={!trigger ? css.Header : css.HeaderDark}>
                <button onClick={() => {
                    navigate('movie');
                    dispatch(movieActions.getAll(1))
                }} className={!trigger ? css.home : css.homeDark}>Home
                </button>
                <div className={css.Search}>
                    <form className={css.form} onSubmit={handleSubmit(save)}>
                        <input className={css.input} type={"text"} placeholder={'search'}
                               name={'query'} {...register('query')}/>
                        <button className={!trigger ? css.butSearch : css.butSearchDark}>Search</button>
                    </form>
                </div>
                <div className={css.rightBLock}>
                    <button onClick={() => dispatch(movieActions.setGenre())}
                            className={!trigger ? css.GenreButton : css.GenreButtonDark}>Genres
                    </button>
                    <div className={css.Theme}>
                        <FormControlLabel
                            control={
                                <Switch checked={state.jason} onChange={handleChange} name="jason"
                                        onClick={() => dispatch(movieActions.setMode())}/>
                            }
                            label={!trigger ? 'dark' : 'light'}
                        />
                    </div>
                    <Avatar alt="Travis Howard" src="" className={!trigger ? css.user : css.userDark}/>
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