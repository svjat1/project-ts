import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {SubmitHandler, useForm} from "react-hook-form";

import css from './Header.module.css';
import {GenreShow} from "./GenreShow";
import {useAppDispatch, useAppSelector, usePageQuery} from "../../hooks";
import {movieActions} from "../../store";
import {IString} from "../../INterfaces";


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


    return (
        <div className={!trigger ? css.Main : css.MainDark}>
            <div className={css.Header}>
                <button onClick={() => {
                    navigate('movie');
                    dispatch(movieActions.getAll(1))
                }} className={css.home}>Home </button>
                <div className={css.Search}>
                    <form onSubmit={handleSubmit(save)}>
                        <input type={"text"} placeholder={'search'} name={'query'} {...register('query')}/>
                        <button>Search</button>
                    </form>
                </div>
                <button onClick={() => dispatch(movieActions.setGenre())} className={css.GenreButton}>Жанри</button>
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