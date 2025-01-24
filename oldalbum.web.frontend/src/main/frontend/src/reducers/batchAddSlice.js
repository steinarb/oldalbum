import { createSlice } from '@reduxjs/toolkit';
import { api } from '../api';

const initialState = {
    parent:  -1,
    batchAddUrl: '',
    importYear: -1,
    defaultTitle: '',
};

export const batchAddSlice = createSlice({
    name: 'batchAdd',
    initialState,
    reducers: {
        clearBatchAdd: () => initialState,
        setParent: (state, action) => ({ ...state, parent: parseInt((action.payload || {}).id) }),
        setUrl: (state, action) => ({ ...state, batchAddUrl: action.payload }),
        setImportYear: (state, action) => ({ ...state, importYear: parseInt(action.payload) }),
        setDefaultTitle: (state, action) => ({ ...state, defaultTitle: action.payload }),
    },
    extraReducers: builder => builder.addMatcher(api.endpoints.postBatchAddPictures.matchFulfilled, () => initialState),
});

export const { clearBatchAdd, setParent, setUrl, setImportYear, setDefaultTitle } = batchAddSlice.actions;

export default batchAddSlice.reducer;
