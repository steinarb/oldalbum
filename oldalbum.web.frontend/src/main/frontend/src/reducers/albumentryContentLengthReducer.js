import { createReducer } from '@reduxjs/toolkit';
import {
    FILL_MODIFY_PICTURE_FORM,
    FILL_ADD_PICTURE_FORM,
    CLEAR_PICTURE_FORM,
} from '../reduxactions';
import { api } from '../api';
const initialState = '';

const albumentryContentLengthReducer = createReducer(initialState, builder => {
    builder
        .addCase(FILL_MODIFY_PICTURE_FORM, (state, action) => action.payload.contentLength)
        .addCase(FILL_ADD_PICTURE_FORM, (state, action) => action.payload.contentLength)
        .addMatcher(api.endpoints.postImageMetadata.matchFulfilled, (state, action) => action.payload.contentLength || 0)
        .addCase(CLEAR_PICTURE_FORM, () => initialState);
});

export default albumentryContentLengthReducer;
