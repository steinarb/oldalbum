import { createReducer } from '@reduxjs/toolkit';
import { api } from '../api';
const initialState = null;

const originalRequestUriReducer = createReducer(initialState, (builder) => {
    builder
        .addMatcher(api.endpoints.getLogin.matchFulfilled, () => initialState);
});

export default originalRequestUriReducer;
