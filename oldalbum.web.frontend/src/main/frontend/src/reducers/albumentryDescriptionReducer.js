import { createReducer } from '@reduxjs/toolkit';
import {
    FILL_MODIFY_ALBUM_FORM,
    FILL_ADD_ALBUM_FORM,
    FILL_MODIFY_PICTURE_FORM,
    FILL_ADD_PICTURE_FORM,
    MODIFY_ALBUM_DESCRIPTION_FIELD_CHANGED,
    ADD_ALBUM_DESCRIPTION_FIELD_CHANGED,
    MODIFY_PICTURE_DESCRIPTION_FIELD_CHANGED,
    ADD_PICTURE_DESCRIPTION_FIELD_CHANGED,
    CLEAR_ALBUM_FORM,
    CLEAR_PICTURE_FORM,
} from '../reduxactions';
import { api } from '../api';
const initialState = '';

const albumentryDescriptionReducer = createReducer(initialState, builder => {
    builder
        .addCase(FILL_MODIFY_ALBUM_FORM, (state, action) => action.payload.description)
        .addCase(FILL_ADD_ALBUM_FORM, (state, action) => action.payload.description)
        .addCase(FILL_MODIFY_PICTURE_FORM, (state, action) => action.payload.description)
        .addCase(FILL_ADD_PICTURE_FORM, (state, action) => action.payload.description)
        .addMatcher(api.endpoints.postImageMetadata.matchFulfilled, (state, action) => action.payload.description || '')
        .addCase(MODIFY_ALBUM_DESCRIPTION_FIELD_CHANGED, (state, action) => action.payload)
        .addCase(ADD_ALBUM_DESCRIPTION_FIELD_CHANGED, (state, action) => action.payload)
        .addCase(MODIFY_PICTURE_DESCRIPTION_FIELD_CHANGED, (state, action) => action.payload)
        .addCase(ADD_PICTURE_DESCRIPTION_FIELD_CHANGED, (state, action) => action.payload)
        .addCase(CLEAR_ALBUM_FORM, () => initialState)
        .addCase(CLEAR_PICTURE_FORM, () => initialState);
});

export default albumentryDescriptionReducer;
