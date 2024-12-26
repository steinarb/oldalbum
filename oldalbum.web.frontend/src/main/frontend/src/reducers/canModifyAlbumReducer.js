import { createReducer } from '@reduxjs/toolkit';
import { api } from '../api';
const initialState = false;

const canModifyAlbumReducer = createReducer(initialState, builder => {
    builder
        .addMatcher(api.endpoints.getLogin.matchFulfilled, (state, action) => action.payload.canModifyAlbum);
});

export default canModifyAlbumReducer;
