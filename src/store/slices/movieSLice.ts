import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IGenre, IMovie, IMoviesResponse, IMovieWithGenres} from "../../INterfaces";
import {movieService} from "../../services";
import {AxiosError} from "axios";
import {IRes} from "../../types";
import {AsyncThunkConfig} from "@reduxjs/toolkit/dist/createAsyncThunk";


interface IState {
    results: IMoviesResponse,
    trigger: boolean
    result: IMovieWithGenres
    genre: IGenre[]
    byGenre: IMovie[]
    showGenre: boolean,
    query: string,
}

const initialState: IState = {
    results: {results: []},
    trigger: null,
    result: null,
    genre: [],
    byGenre: [],
    showGenre: null,
    query: '',
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

const searchCollection = createAsyncThunk<IMoviesResponse, string>(
    'movieSLice/searchCollection',
    async (query, {rejectWithValue})=>{
        try {
            const {data} = await movieService.getByCollection(query)
            return data
        }catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data)
        }
    }
)

const movieSLice = createSlice({
    name: 'movieSlice',
    initialState,
    reducers: {
        setMode: state => {
            state.trigger = !state.trigger
        },
        reset: state => {
            state.result = null
        },
        setGenre: state =>{
            state.showGenre = !state.showGenre
        },
        setQuery:(state, actions)=>{
            state.query = actions.payload
        },
        clearQuery:(state, actions)=>{
            state.query = ''
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
            .addCase(searchCollection.fulfilled, (state, action)=>{
                state.results = action.payload
            })
})

const {reducer: movieReducer, actions} = movieSLice
const movieActions = {
    ...actions,
    getAll,
    getById,
    getGenre,
    getByGenre,
    searchCollection
}

export {
    movieActions,
    movieReducer
}

