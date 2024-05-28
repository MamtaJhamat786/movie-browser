import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface InitialState{
    itemsInBag: number
}

const initialState: InitialState = {
    itemsInBag: 0
}

const active = createSlice({
    name: 'darkMode',
    initialState: initialState,
    reducers: {
        addItemToBag: (state, action: PayloadAction<number>) => {
            state.itemsInBag= action.payload;
        }
    },
});

export const { addItemToBag } = active.actions;

export default active.reducer;
