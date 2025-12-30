import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { api } from '../api';

const initialState = {
    parent:  -1,
    batchAddUrl: '',
    importYear: null,
    defaultTitle: '',
    sortByDate: (Cookies.get('sortByDate') || '').toLowerCase() === 'true',
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
        setSortByDate: (state, action) => ({ ...state, sortByDate: updateSortByDateCookie(action.payload) }),
    },
    extraReducers: builder => builder.addMatcher(api.endpoints.postBatchAddPictures.matchFulfilled, () => initialState),
});

export const { clearBatchAdd, setParent, setUrl, setImportYear, setDefaultTitle, setSortByDate } = batchAddSlice.actions;

export default batchAddSlice.reducer;

function updateSortByDateCookie(sortByDate) {
    Cookies.set('sortByDate', sortByDate);
    return sortByDate;
}
