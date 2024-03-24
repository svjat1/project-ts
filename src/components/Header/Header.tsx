import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {SubmitHandler, useForm} from "react-hook-form";

import css from './Header.module.css';
import {GenreShow} from "./GenreShow";
import {useAppDispatch, useAppSelector, usePageQuery} from "../../hooks";
import {movieActions} from "../../store";
import {IString} from "../../INterfaces";

import * as React from 'react';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Switch from '@mui/material/Switch';


const Header = () => {
    const {register, reset, handleSubmit, setValue} = useForm<IString>()
    const { page, prevPage, nextPage } = usePageQuery();

    const dispatch = useAppDispatch()
    const {results,genre, trigger, showGenre, query} = useAppSelector(state => state.movie)

    console.log(query);
    useEffect(() => {
        dispatch(movieActions.getGenre())
    }, []);

    const navigate = useNavigate();

    const save: SubmitHandler<IString> = async (data) => {
        await  navigate(`/movie`)
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
                }} className={css.home}>Home </button>
                <div className={css.Search}>
                    <form className={css.form} onSubmit={handleSubmit(save)}>
                        <input className={css.input} type={"text"} placeholder={'search'} name={'query'} {...register('query')}/>
                        <button className={css.butSearch}>Search</button>
                    </form>
                </div>
                <button onClick={() => dispatch(movieActions.setGenre())} className={css.GenreButton}>Жанри</button>
                <div className={css.Theme}>
                    <FormControlLabel
                        control={
                            <Switch checked={state.jason} onChange={handleChange} name="jason" onClick={() => dispatch(movieActions.setMode())}/>
                        }
                        label={!trigger ? 'dark' : 'light'}
                    />
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