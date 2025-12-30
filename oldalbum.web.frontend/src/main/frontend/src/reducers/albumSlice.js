import { createSlice } from '@reduxjs/toolkit';
import { isSavedAlbum } from '../matchers';
import { api } from '../api';
import { ADD_PICTURE_IMAGE_URL_SUCCESSFULLY_LOADED } from '../reduxactions';
import { extractBasename } from '../pathutilities';

const initialState = {
    id: -1,
    parent: -1,
    path: '',
    basename: '',
    album: true,
    title: '',
    description: '',
    lastModified: null,
    requireLogin: false,
    groupByYear: false,
};

export const albumSlice = createSlice({
    name: 'album',
    initialState,
    reducers: {
        selectAlbum: (_, action) => ({ ...action.payload, basename: extractBasename(action.payload.path) }),
        clearAlbum: () => initialState,
        albumPrepare: (_, action) => ({ ...initialState, ...action.payload }),
        setParent: (state, action) => ({ ...state, parent: parseInt(action.payload) }),
        setBasename: (state, action) => replaceLastElementInPathWithBasename(state, action.payload, true),
        setTitle: (state, action) => ({ ...state, title: action.payload }),
        setDescription: (state, action) => ({ ...state, description: action.payload }),
        setLastModified: (state, action) => ({ ...state, lastModified: action.payload }),
        setLastModifiedToCurrentDate: (state, _) => ({ ...state, lastModified: new Date().toISOString() }),
        clearLastModified: (state, _) => ({ ...state, lastModified: initialState.lastModified }),
        setRequireLogin: (state, action) => ({ ...state, requireLogin: !!action.payload }),
        setGroupByYear: (state, action) => ({ ...state, groupByYear: !!action.payload }),
    },
    extraReducers: builder => {
        builder
            .addMatcher(isSavedAlbum, () => initialState)
    },
});

export const {
    selectAlbum,
    clearAlbum,
    albumPrepare,
    setParent,
    setBasename,
    setAlbum,
    setTitle,
    setDescription,
    setLastModified,
    setLastModifiedToCurrentDate,
    clearLastModified,
    setContentType,
    setContentLength,
    setRequireLogin,
    setGroupByYear,
} = albumSlice.actions;

export default albumSlice.reducer;

function replaceLastElementInPathWithBasename(state, basename, endsWithSlash) {
    const pathElements = (endsWithSlash ? state.path.replace(/\/$/, '') : state.path).split(/\//);
    pathElements.pop();
    pathElements.push(basename);
    const path = pathElements.join('/') + (endsWithSlash ? '/' : '');
    return { ...state, path, basename };
}
