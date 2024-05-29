import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { Movie } from '../../apis/types'

interface InitialState{
    itemsInBag: number,
    movieInfo: Movie | undefined;
}

const initialState: InitialState = {
    itemsInBag: 0,
    movieInfo: undefined
}

const active = createSlice({
    name: 'darkMode',
    initialState: initialState,
    reducers: {
        addItemToBag: (state, action: PayloadAction<number>) => {
            state.itemsInBag= action.payload;
        },
        setMovieInfo:(state, action: PayloadAction<Movie | undefined>)=>{
            state.movieInfo = action.payload
        }
    },
});

export const { addItemToBag, setMovieInfo } = active.actions;

export default active.reducer;
