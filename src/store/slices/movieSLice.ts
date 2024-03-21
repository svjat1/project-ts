import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IGenre, IMovie, IMoviesResponse, IMovieWithGenres} from "../../INterfaces";
import {movieService} from "../../services";
import {AxiosError} from "axios";


interface IState {
    results: IMoviesResponse,
    trigger: boolean
    result: IMovieWithGenres
    genre: IGenre[]
    byGenre: IMovie[]
}

const initialState: IState = {
    results: {results: []},
    trigger: null,
    result: null,
    genre: [],
    byGenre: []
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

const getGenre = createAsyncThunk<IGenre[]>(
    'movieSLice/getGenre',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getGenre()
            return data.genres
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data)
        }
    }
)

const getByGenre = createAsyncThunk<IMovie[], { ids: number, page: number }>(
    'movieSLice/getByGenre',
    async ({ids, page}, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getByGenre(+ids, page)
            return data.results
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
        },
        reset: state => {
            state.result = null
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
            .addCase(getGenre.fulfilled, (state, action) => {
                state.genre = action.payload
            })
            .addCase(getByGenre.fulfilled, (state, action)=>{
                state.byGenre = action.payload
            })
})

const {reducer: movieReducer, actions} = movieSLice
const movieActions = {
    ...actions,
    getAll,
    getById,
    getGenre,
    getByGenre
}

export {
    movieActions,
    movieReducer
}

