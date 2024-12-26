import { createReducer } from '@reduxjs/toolkit';
import { api } from '../api';
const initialState = false;

const loginresultReducer = createReducer(initialState, (builder) => {
    builder
        .addMatcher(api.endpoints.getLogin.matchFulfilled, (state, action) => action.payload.success);
});

export default loginresultReducer;
