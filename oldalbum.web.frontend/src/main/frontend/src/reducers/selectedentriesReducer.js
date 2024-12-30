import { createReducer } from '@reduxjs/toolkit';
import {
    SELECT_PICTURE_ALBUMENTRY,
    UNSELECT_PICTURE_ALBUMENTRY,
    SET_SELECTION_VALUE,
    CLEAR_SELECTION,
} from '../reduxactions';
import { api } from '../api';

const selectedentriesReducer = createReducer([], (builder) => {
    builder
        .addCase(SELECT_PICTURE_ALBUMENTRY, (state, action) => addIfNotPresent(state, action.payload))
        .addCase(UNSELECT_PICTURE_ALBUMENTRY, (state, action) => removeIfPresent(state, action.payload))
        .addCase(SET_SELECTION_VALUE, (state, action) => action.payload)
        .addMatcher(api.endpoints.postDeleteselection.matchFulfilled, () => [])
        .addCase(CLEAR_SELECTION, () => []);
});

export default selectedentriesReducer;

function addIfNotPresent(state, entry) {
    if (state.findIndex(e => e.id === entry.id) < 0) {
        const nextState = [ ...state ];
        nextState.push(entry);
        return nextState;
    }

    return state;
}

function removeIfPresent(state, entry) {
    const index = state.findIndex(e => e.id === entry.id);
    if (index > -1) {
        return state.toSpliced(index, 1);
    }

    return state;
}
