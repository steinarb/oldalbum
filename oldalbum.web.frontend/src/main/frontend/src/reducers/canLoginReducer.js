import { createReducer } from '@reduxjs/toolkit';
import { api } from '../api';
const initialState = false;

const canLoginReducer = createReducer(initialState, builder => {
    builder
        .addMatcher(api.endpoints.getLogin.matchFulfilled, (state, action) => action.payload.canLogin);
});

export default canLoginReducer;
