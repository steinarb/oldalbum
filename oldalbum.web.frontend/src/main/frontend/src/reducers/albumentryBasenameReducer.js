import { createReducer } from '@reduxjs/toolkit';
import {
    FILL_MODIFY_ALBUM_FORM,
    FILL_ADD_ALBUM_FORM,
    FILL_MODIFY_PICTURE_FORM,
    FILL_ADD_PICTURE_FORM,
    ADD_ALBUM_BASENAME_FIELD_CHANGED,
    MODIFY_ALBUM_BASENAME_FIELD_CHANGED,
    ADD_PICTURE_IMAGE_URL_SUCCESSFULLY_LOADED,
    MODIFY_PICTURE_BASENAME_FIELD_CHANGED,
    ADD_PICTURE_BASENAME_FIELD_CHANGED,
    CLEAR_ALBUM_FORM,
    CLEAR_PICTURE_FORM,
} from '../reduxactions';
const initialState = '';

const albumentryBasenameReducer = createReducer(initialState, builder => {
    builder
        .addCase(FILL_MODIFY_ALBUM_FORM, (state, action) => finnSisteLeddIPath(action, true))
        .addCase(FILL_ADD_ALBUM_FORM, (state, action) => finnSisteLeddIPath(action, true))
        .addCase(FILL_MODIFY_PICTURE_FORM, (state, action) => finnSisteLeddIPath(action, false))
        .addCase(FILL_ADD_PICTURE_FORM, (state, action) => finnSisteLeddIPath(action, false))
        .addCase(ADD_ALBUM_BASENAME_FIELD_CHANGED, (state, action) => action.payload)
        .addCase(MODIFY_ALBUM_BASENAME_FIELD_CHANGED, (state, action) => action.payload)
        .addCase(ADD_PICTURE_IMAGE_URL_SUCCESSFULLY_LOADED, (state, action) => extractBasename(action))
        .addCase(MODIFY_PICTURE_BASENAME_FIELD_CHANGED, (state, action) => action.payload)
        .addCase(ADD_PICTURE_BASENAME_FIELD_CHANGED, (state, action) => action.payload)
        .addCase(CLEAR_ALBUM_FORM, () => initialState)
        .addCase(CLEAR_PICTURE_FORM, () => initialState);
});

export default albumentryBasenameReducer;

function finnSisteLeddIPath(action, endsWithSlash) {
    const path = action.payload.path;
    return (endsWithSlash ? path.replace(/\/$/, '') : path).split(/\//).pop();
}

function extractBasename(action) {
    const url = action.payload;
    const paths = url.split('/');
    const filename = paths.pop();
    const fileAndExtension = filename.split('.');
    const basename = fileAndExtension.shift();
    return basename;
}
