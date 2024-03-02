import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {movieService} from "../../../../services";
import {IMovieWithGenres} from "../../../../INterfaces";
import {Details} from "../Details/Details";


const MovieInfo = () => {
    const [details, setDetails] = useState<IMovieWithGenres>(null)
    const {id} = useParams<{ id: string }>()
    useEffect(() => {
        if (id) {
            movieService.getById(+id, {append_to_response: "genres"}).then(({data}) => setDetails(data))
        }
    }, [id])
    return (
        <div>
            {details && <Details details={details}/>}
        </div>
    );
};

export {
    MovieInfo
};