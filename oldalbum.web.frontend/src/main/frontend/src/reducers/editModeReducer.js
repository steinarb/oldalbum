import { createReducer } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import {
    TOGGLE_EDIT_MODE_ON,
    TOGGLE_EDIT_MODE_OFF,
} from '../reduxactions';

const currentEditMode = (Cookies.get('editMode') || '').toLowerCase() === 'true';

const editModeReducer = createReducer(currentEditMode, builder => {
    builder
        .addCase(TOGGLE_EDIT_MODE_ON, () => updateEditModeCookie(true))
        .addCase(TOGGLE_EDIT_MODE_OFF, () => updateEditModeCookie(false));
});

export default editModeReducer;


function updateEditModeCookie(editMode) {
    Cookies.set('editMode', editMode);
    return editMode;
}
