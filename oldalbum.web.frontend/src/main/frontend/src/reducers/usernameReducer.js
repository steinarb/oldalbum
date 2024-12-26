import { createReducer } from '@reduxjs/toolkit';
import { api } from '../api';
const initialState = null;

const usernameReducer = createReducer(initialState, (builder) => {
    builder
        .addMatcher(api.endpoints.getLogin.matchFulfilled, (state, action) => action.payload.username);
});

export default usernameReducer;
