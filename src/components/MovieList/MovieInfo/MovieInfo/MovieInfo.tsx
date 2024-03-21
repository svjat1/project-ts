import {useParams} from "react-router-dom";
import {Suspense, useEffect, useMemo, useState} from "react";
import {movieService} from "../../../../services";
import {IMovieWithGenres} from "../../../../INterfaces";
import {Details} from "../Details";
import {useAppDispatch, useAppSelector} from "../../../../hooks";
import {movieActions} from "../../../../store";


const MovieInfo = () => {
    // const [details, setDetails] = useState<IMovieWithGenres>(null)
    const {id} = useParams<{ id: string }>()

    const dispatch = useAppDispatch();
    const {result} = useAppSelector(state => state.movie)


    useEffect(() => {
        if (id) {
            // movieService.getById(+id, {append_to_response: "genres"}).then(({data}) => setDetails(data))
           dispatch(movieActions.getById(+id))
        } return ()=> {
            dispatch(movieActions.reset())
        }
    }, [id])

    return (
        <div>
            {result && <Details key={result.id} details={result}/>}
        </div>
    );
};

export {
    MovieInfo
};