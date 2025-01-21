import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { isAllroutes } from '../matchers';

const initialState = JSON.parse(Cookies.get('albumGroupByYear') || '{}');

const groupByYearSlice = createSlice({
    name: 'groupByYear',
    initialState,
    reducers: {
        setAlbum: (state, action) => setAlbumGroupByYear(state, action.payload),
        unsetAlbum: (state, action) => unsetAlbumGroupByYear(state, action.payload),
    },
    extraReducers: builder => builder.addMatcher(isAllroutes, (state, action) => saveGroupByYearInitialState(state, action.payload)),
});

export const { setAlbum, unsetAlbum } = groupByYearSlice.actions;
export default groupByYearSlice.reducer;

function setAlbumGroupByYear(state, album) {
    const nextState = { ...state };
    nextState[album] = true;
    Cookies.set('albumGroupByYear', JSON.stringify(nextState));
    return nextState;
}

function unsetAlbumGroupByYear(state, album) {
    const nextState = { ...state };
    nextState[album] = false;
    Cookies.set('albumGroupByYear', JSON.stringify(nextState));
    return nextState;
}

function saveGroupByYearInitialState(state, allroutes) {
    const groupByYearInitialState = {};
    for (const route of allroutes) {
        if (route.album && route.groupByYear !== undefined && route.groupByYear !== null) {
            groupByYearInitialState[route.id] = route.groupByYear;
        }
    }

    return Object.assign(groupByYearInitialState, state);
}
