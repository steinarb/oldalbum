import { createSlice } from '@reduxjs/toolkit';
import { api } from '../api';

const initialState = [];

const selectedentriesSlice = createSlice({
    name: 'selectedentries',
    initialState,
    reducers: {
        selectPicture: (state, action) => addIfNotPresent(state, action.payload),
        unselectPicture: (state, action) => removeIfPresent(state, action.payload),
        setSelection: (state, action) => action.payload,
        clearSelection: () => initialState,
    },
    extraReduces: builder => builder.addMatcher(api.endpoints.postDeleteselection.matchFulfilled, () => initialState),
});

export const { selectPicture, unselectPicture, setSelection, clearSelection } = selectedentriesSlice.actions;
export default selectedentriesSlice.reducer;

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
