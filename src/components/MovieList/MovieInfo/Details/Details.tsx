import {FC, PropsWithChildren} from "react";

import css from './Details.module.css'
import {useNavigate} from "react-router-dom";
import {IGenre, IMovieWithGenres} from "../../../../INterfaces";

interface IProps extends PropsWithChildren {
    details: IMovieWithGenres
}

const Details: FC<IProps> = ({details}) => {
    const navigate = useNavigate()
    const toGenres = (genre: IGenre)=>{
        navigate(`/genres/${genre.id}`)
    }
    const {id, original_title, title, overview, poster_path, genres} = details

    return (
        <div className={css.Details}>
            <img src={`https://image.tmdb.org/t/p/w500/${details.poster_path}`} alt={details.title} className={css.poster}/>
            <div className={css.info}>
                <div>original_title:{original_title}</div>
                <div>title:{title}</div>
                <hr/>
                <div>overview:{overview}</div>
                <div>
                    <h2>Genres:</h2>
                    {genres.map((genre) => (
                        <h3 key={genre.id} onClick={()=> toGenres(genre)} className={css.h3}>{genre.name}</h3>
                    ))}
                </div>
            </div>
        </div>
    );
};

export {Details};