import { createReducer } from '@reduxjs/toolkit';
import { isAllroutes } from '../matchers';

// Creates a map from id to array of children
const nextentryReducer = createReducer({}, (builder) => {
    builder
        .addMatcher(isAllroutes, (state, action) => createMapFromIdToArrayOfChildren(action.payload));
});

export default nextentryReducer;

function createMapFromIdToArrayOfChildren(allroutes) {
    const next = {};
    allroutes.forEach(e => next[e.id] = findNext(e, allroutes));
    return next;
}

function findNext(item, allroutes) {
    if (!item.parent) { return undefined; }
    const parent = allroutes.find(r => r.id === item.parent) || {};
    if (item.sort >= parent.childcount) { return undefined; }
    const siblings = allroutes.filter(r => r.parent === item.parent).sort((a,b) => a.sort - b.sort);
    return siblings[siblings.findIndex(s => s.id === item.id) + 1];
}
