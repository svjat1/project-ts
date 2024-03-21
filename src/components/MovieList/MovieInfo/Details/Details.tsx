import {FC, PropsWithChildren} from "react";

import css from './Details.module.css'
import {useNavigate} from "react-router-dom";
import {IGenre, IMovieWithGenres} from "../../../../INterfaces";
import {Button, Badge, Collapse, Alert} from "reactstrap";

interface IProps extends PropsWithChildren {
    details: IMovieWithGenres
}

const
    Details: FC<IProps> = ({details}) => {
    const navigate = useNavigate()
    const toGenres = (genre: IGenre) => {
        navigate(`/genres/${genre.id}`)
    }
    const {id, original_title, title, overview, poster_path, genres} = details

    return (
        <div className={css.Main}>
        <div className={css.Details}>
            <div className={css.poster_block}>
                <img src={`https://image.tmdb.org/t/p/w500/${details.poster_path}`} alt={details.title}
                className={css.poster}/>

                <Button className={css.badge_block}
                        onClick={function noRefCheck() {
                        }}
                        style={{
                            marginBottom: '1rem'
                        }}
                >Genres{' '}
                    {genres.map((genre) => (
                        <Badge key={genre.id} onClick={() => toGenres(genre)} className={css.h3}>{genre.name}</Badge>
                    ))}
                </Button>
            </div>


            <div className={css.info}>
                <br/>
                <div>Name: {original_title}</div>
                <hr/>
                <div>Overview: {overview}</div>
            </div>
        </div>
        </div>
    );
};

export {Details};