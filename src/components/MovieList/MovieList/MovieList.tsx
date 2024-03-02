import {useEffect, useState} from "react";

import {movieService} from "../../../services";

import css from './MovieList.module.css'
import {usePageQuery} from "../../../hooks";
import {IMovie} from "../../../INterfaces";
import {Movie} from "../MovieListCard";


const MovieList = () => {
    const { page, prevPage, nextPage } = usePageQuery();
    const [movies, setMovie] = useState<IMovie[]>([])

    useEffect(()=>{
        movieService.getAll(page).then(({data})=> setMovie(data.results))
    }, [page])

    return (
        <div className={css.MainBlock}>
            <div className={css.MovieList}>
                {movies.map(movie => <Movie key={movie.id} movie={movie}/>)}
            </div>
            <div className={css.button}>
                <button disabled={page <= 1} onClick={prevPage} >← previous </button>
                <span>Сторінка {page}</span>
                <button disabled={page >= 500} onClick={nextPage} >Next →</button>
            </div>
        </div>
    );
};

export {MovieList};