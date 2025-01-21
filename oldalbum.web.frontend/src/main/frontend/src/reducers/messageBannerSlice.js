import { createSlice } from '@reduxjs/toolkit';

const messageBannerSlice = createSlice({
    name: 'messageBanner',
    initialState: '',
    reducers: {
        setMessage: (_, action) => action.payload,
        clearMessage: () => '',
    }
});

export const { setMessage, clearMessage } = messageBannerSlice.actions;
export default messageBannerSlice.reducer;
