import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCharacters = createAsyncThunk('characters/getCharacters', async () => {
    const response = await axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}/character`);

    return response.data;
});

export const charactersSlice = createSlice({
    name: 'character',
    initialState: {
        items: [],
        isLoading: false,
        message: '',
    },
    reducers: {},
    extraReducers: {
        [fetchCharacters.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.items = action.payload.results;
        },
        [fetchCharacters.pendind]: (state) => {
            state.isLoading = true;
        },
        [fetchCharacters.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        },
    },
});

export default charactersSlice.reducer;