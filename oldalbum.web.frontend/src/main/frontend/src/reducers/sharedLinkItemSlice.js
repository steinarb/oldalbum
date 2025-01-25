import { createSlice } from '@reduxjs/toolkit';
const initialState = {};

const sharedLinkItemSlice = createSlice({
    name: 'sharedLinkItem',
    initialState,
    reducers: {
        shareLink: (state, action) => action.payload,
        clearSharedLink: () => initialState,
    }
});

export const { shareLink, clearSharedLink } = sharedLinkItemSlice.actions;
export default sharedLinkItemSlice.reducers;
