import { createReducer } from '@reduxjs/toolkit';
import {
    FILL_MODIFY_PICTURE_FORM,
    FILL_ADD_PICTURE_FORM,
    CLEAR_PICTURE_FORM,
} from '../reduxactions';
import { api } from '../api';
const initialState = '';

const albumentryContentTypeReducer = createReducer(initialState, builder => {
    builder
        .addCase(FILL_MODIFY_PICTURE_FORM, (state, action) => action.payload.contentType)
        .addCase(FILL_ADD_PICTURE_FORM, (state, action) => action.payload.contentType)
        .addMatcher(api.endpoints.postImageMetadata.matchFulfilled, (state, action) => action.payload.contentType || '')
        .addCase(CLEAR_PICTURE_FORM, () => initialState);
});

export default albumentryContentTypeReducer;
