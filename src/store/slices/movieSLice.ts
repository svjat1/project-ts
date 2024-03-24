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
    showGenre: boolean,
    query: string,
}

const initialState: IState = {
    results: {page: null, results: [], total_pages:null},
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

const searchCollection = createAsyncThunk<IMoviesResponse, { query: string; page: number }>(
    'movieSLice/searchCollection',
    async ({query, page}, {rejectWithValue})=>{
        try {
            const {data} = await movieService.getByCollection(query, page)
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
        setQuery: (state,actions) =>{
            state.query = actions.payload
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
    searchCollection,
}

export {
    movieActions,
    movieReducer
}

