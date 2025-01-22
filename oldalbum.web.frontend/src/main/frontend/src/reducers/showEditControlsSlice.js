import { createSlice } from '@reduxjs/toolkit';

const showEditControlsSlice = createSlice({
    name: 'showEditControls',
    initialState: false,
    reducers: {
        show: () => true,
        hide: () => false,
    },
});

export const { show, hide } = showEditControlsSlice.actions;
export default showEditControlsSlice.reducer;
