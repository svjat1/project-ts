import {configureStore} from "@reduxjs/toolkit";
import {movieReducer} from "./slices";

const store = configureStore({
    reducer:{
        movie: movieReducer
    }
})


export {
    store
}