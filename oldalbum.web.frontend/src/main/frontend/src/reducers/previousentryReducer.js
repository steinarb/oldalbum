import { createReducer } from '@reduxjs/toolkit';
import { isAllroutes } from '../matchers';

// Creates a map from id to array of children
const previousentryReducer = createReducer({}, (builder) =>  {
    builder
        .addMatcher(isAllroutes, (state, action) => createMapFromIdToArrayOfChildren(action.payload));
});

export default previousentryReducer;

function createMapFromIdToArrayOfChildren(allroutes) {
    const previous = {};
    allroutes.forEach(e => previous[e.id] = findPrevious(e, allroutes));
    return previous;
}

function findPrevious(item, allroutes) {
    if (!item.parent) { return undefined; }
    if (item.sort <= 1) { return undefined; }
    const siblings = allroutes.filter(r => r.parent === item.parent).sort((a,b) => a.sort - b.sort);
    return siblings[siblings.findIndex(s => s.id === item.id) - 1];
}
