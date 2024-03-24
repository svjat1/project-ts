import {useEffect} from "react";
import {Button} from "reactstrap";

import css from './MovieList.module.css'
import {useAppDispatch, useAppSelector, usePageQuery} from "../../../hooks";
import {Movie} from "../MovieListCard";
import {movieActions} from "../../../store";

const MovieList = () => {
    const { page, prevPage, nextPage } = usePageQuery();

    const {results,query} = useAppSelector(state => state.movie);
    const dispatch = useAppDispatch();

    useEffect(()=>{
        if (query){
            dispatch(movieActions.searchCollection({query,page}))
        }else {
           dispatch(movieActions.getAll(page))
        }
    }, [page])

    return (
        <div className={css.MainBlock}>
            <div className={css.MovieList}>
                {results.results.map(movie => <Movie key={movie.id} movie={movie}/>)}
            </div>
            <div className={css.button}>
                <Button disabled={page <= 1} onClick={prevPage} className={css.but}>← Prev</Button>
                <span>Page {page}</span>
                <Button disabled={page >= 500} onClick={nextPage} className={css.but} >Next →</Button>
            </div>
        </div>
    );
};

export {MovieList};