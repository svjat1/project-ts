import {useEffect, useState} from "react";

import {movieService} from "../../../services";
import css from './MovieList.module.css'
import {usePageQuery} from "../../../hooks";
import {IMovie} from "../../../INterfaces";
import {Movie} from "../MovieListCard";
import {Button} from "reactstrap";


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
                <Button disabled={page <= 1} onClick={prevPage} className={css.but}>← Prev</Button>
                <span>Page {page}</span>
                <Button disabled={page >= 500} onClick={nextPage} className={css.but} >Next →</Button>
            </div>
        </div>
    );
};

export {MovieList};