import { createReducer } from '@reduxjs/toolkit';
import {
    IMPORT_YEAR_FIELD_CHANGED,
    CLEAR_BATCH_ADD_URL_FIELD,
} from '../reduxactions';
const initialState = '';

const batchAddImportYear = createReducer(initialState, builder => {
    builder
        .addCase(IMPORT_YEAR_FIELD_CHANGED, (state, action) => action.payload)
        .addCase(CLEAR_BATCH_ADD_URL_FIELD, () => initialState);
});

export default batchAddImportYear;
