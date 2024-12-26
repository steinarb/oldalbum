import { createReducer } from '@reduxjs/toolkit';
import { api } from '../api';

const sortingStatusReducer = createReducer('', (builder) => {
    builder
        .addMatcher(api.endpoints.postSortalbumbydate.matchPending, () => 'Sorting started')
        .addMatcher(api.endpoints.postSortalbumbydate.matchFulfilled, () => 'Sorting complete')
        .addMatcher(api.endpoints.postSortalbumbydate.matchRejected, () => '');
});

export default sortingStatusReducer;
