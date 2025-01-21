import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = (Cookies.get('editMode') || '').toLowerCase() === 'true';

const editModeSlice = createSlice({
    name: 'editMode',
    initialState,
    reducers: {
        toggleOn: () => updateEditModeCookie(true),
        toggleOff: () => updateEditModeCookie(false),
    },
});

export const { toggleOn, toggleOff } = editModeSlice.actions;
export default editModeSlice.reducer;


function updateEditModeCookie(editMode) {
    Cookies.set('editMode', editMode);
    return editMode;
}
