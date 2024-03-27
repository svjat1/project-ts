import {useParams} from "react-router-dom";
import {useEffect} from "react";

import {Details} from "../Details";
import {useAppDispatch, useAppSelector} from "../../../../hooks";
import {movieActions} from "../../../../store";


const MovieInfo = () => {

    const {id} = useParams<{ id: string }>()

    const dispatch = useAppDispatch();
    const {result, key} = useAppSelector(state => state.movie)


    useEffect(() => {
        if (id) {
            dispatch(movieActions.getById(+id))
            dispatch(movieActions.getTrailer(+id))
        }
        return () => {
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