import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IMovie, IMoviesResponse, IMovieWithGenres} from "../../INterfaces";
import {movieService} from "../../services";
import {AxiosError} from "axios";
import {IRes} from "../../types";

interface IState {
    results: IMoviesResponse,
    trigger: boolean
    result: IMovieWithGenres
}

const initialState: IState = {
    results: {results: []},
    trigger: null,
    result: null
}

const getAll = createAsyncThunk<IMoviesResponse, number>(
    'movieSLice/getAll',
    async (page: number, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getAll(page);
            return data
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data)
        }
    }
)

const getById = createAsyncThunk<IMovieWithGenres, number>(
    'movieSLice/getById',
    async (id: number, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getById(id, {append_to_response: 'genres'})
            return data
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data)
        }
    }
)

const movieSLice = createSlice({
    name: 'movieSlice',
    initialState,
    reducers: {
        setMode: (state, action) => {
            state.trigger = !state.trigger
        }
    },
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.results = action.payload
            })
            .addCase(getById.fulfilled, (state, action) => {
                state.result = action.payload
            })
})

    const {reducer: movieReducer, actions} = movieSLice
    const movieActions = {
        ...actions,
        getAll,
        getById
    }

    export {
        movieActions,
        movieReducer
    }

