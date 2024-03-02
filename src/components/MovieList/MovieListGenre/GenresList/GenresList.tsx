import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";

import css from '../GenreList/GenreList.module.css'
import {movieService} from "../../../../services";
import {IMovie} from "../../../../INterfaces";
import {usePageQuery} from "../../../../hooks";
import {GenreList} from "../GenreList";


const GenresList = () => {
    const {page, prevPage, nextPage} = usePageQuery();
    const [genres, setGenres] = useState<IMovie[]>([])
    const {genreId} = useParams();

    useEffect(() => {
        movieService.getByGenre(+genreId, page).then(({data}) => setGenres(data.results))
    }, [page])
    console.log(genres);
    return (
        <div className={css.Genres}>
            <div className={css.Genre}>
                {genres.map(genre => <GenreList key={genre.id} genre={genre}/>)}
            </div>
            <div className={css.button}>
                <button disabled={page <= 1} onClick={prevPage}>← previous</button>
                <span>Сторінка {page}</span>
                <button disabled={page >= 500} onClick={nextPage}>Next →</button>
            </div>
        </div>

    );
};

export {GenresList};