import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {useHttp} from '../../hooks/http.hook';

const initialState = {
    filters: [],
    filtersLoadingStatus: 'idle',
    activeName: 'all'
}

export const filterHeroes = createAsyncThunk(
    'filters/filterHeroes',
    async() => {
        const {request} = useHttp();
        return await request("http://localhost:3001/filters");
    }
)

const filters = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        activeFilterChanged: (state, action) => {
                            state.activeName = action.payload;
                        },        
    },
    extraReducers: builder => {
        builder
            .addCase(filterHeroes.pending, state => {state.filtersLoadingStatus = 'loading'})
            .addCase(filterHeroes.fulfilled, (state, action) => {
                        state.filtersLoadingStatus = 'idle';
                        state.filters = action.payload;
                    })
            .addCase(filterHeroes.rejected, state => {
                        state.filtersLoadingStatus = 'error';
                    })
            .addDefaultCase(() => {})
    }
});

const { actions, reducer } = filters;

export default reducer;
export const {
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
    activeFilterChanged
} = actions;