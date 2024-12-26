import { createReducer } from '@reduxjs/toolkit';
import { isAllroutes } from '../matchers';

const albumentriesReducer = createReducer([], builder => {
    builder
        .addMatcher(isAllroutes, (state, action) => createMapFromIdToAlbumentry(action.payload));
});

export default albumentriesReducer;

function createMapFromIdToAlbumentry(allroutes) {
    const entries = {};
    allroutes.forEach(e => entries[e.id] = { ...e });
    return entries;
}
