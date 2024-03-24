import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect} from "react";

import css from '../GenreList/GenreList.module.css'
import butStyle from '../../MovieList/MovieList.module.css'
import {useAppDispatch, useAppSelector, usePageQuery} from "../../../../hooks";
import {GenreList} from "../GenreList";
import {movieActions} from "../../../../store";


const GenresList = () => {
    const {page, prevPage, nextPage} = usePageQuery();
    const {genreId} = useParams();
    const pages = {page: '1'}
    const ids = +genreId

   const {byGenre,results} = useAppSelector(state => state.movie)
   const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(movieActions.getByGenre({ids, page}))
    }, [genreId, page])


    return (
        <div className={css.Genres}>
            <div className={css.Genre}>
                {byGenre.map(genre => <GenreList key={genre.id} genre={genre}/>)}
            </div>
            <div className={butStyle.button}>
                <button disabled={results.page <= 1} onClick={prevPage} className={butStyle.but}>← Prev</button>
                <span>Page {page}</span>
                <button disabled={results.page >= 500} onClick={nextPage} className={butStyle.but}>Next →</button>
            </div>
        </div>

    );
};

export {GenresList};