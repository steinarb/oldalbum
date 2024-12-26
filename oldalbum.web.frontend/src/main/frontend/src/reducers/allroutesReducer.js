import { createReducer } from '@reduxjs/toolkit';
import { isAllroutes } from '../matchers';

const allroutesReducer = createReducer([], builder => {
    builder
        .addMatcher(isAllroutes, (state, action) => action.payload);
});

export default allroutesReducer;
