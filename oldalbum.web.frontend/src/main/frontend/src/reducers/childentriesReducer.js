import { createReducer } from '@reduxjs/toolkit';
import { isAllroutes } from '../matchers';

// Creates a map from id to array of children
const childentriesReducer = createReducer({}, builder => {
    builder
        .addMatcher(isAllroutes, (state, action) => createMapFromIdToArrayOfChildren(action.payload));
});

export default childentriesReducer;

function createMapFromIdToArrayOfChildren(allroutes) {
    const children = {};
    allroutes.forEach(e => addChildToParent(children, e));
    return children;
}

function addChildToParent(state, item) {
    const { parent } = item;
    if (parent) {
        if (parent in state) {
            state[parent].push({ ...item });
        } else {
            state[parent] = [{ ...item }];
        }
    }
}
