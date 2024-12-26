import { createReducer } from '@reduxjs/toolkit';
import { api } from '../api';

const haveReceivedInitialLoginStatusReducer = createReducer(false, builder => {
    builder
        .addMatcher(api.endpoints.getLogin.matchFulfilled, () => true);
});

export default haveReceivedInitialLoginStatusReducer;
