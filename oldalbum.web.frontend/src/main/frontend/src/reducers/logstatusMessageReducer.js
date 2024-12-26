import { createReducer } from '@reduxjs/toolkit';
import { api } from '../api';
const initialState = '';

const logstatusMessageReducer = createReducer(initialState, (builder) => {
    builder
        .addMatcher(api.endpoints.getLogin.matchFulfilled, (state, action) => action.payload.errormessage);
});

export default logstatusMessageReducer;
