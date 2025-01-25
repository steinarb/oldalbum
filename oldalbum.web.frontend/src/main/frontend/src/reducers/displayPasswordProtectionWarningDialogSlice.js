import { createSlice } from '@reduxjs/toolkit';

const displayPasswordProtectionWarningDialogSlice = createSlice({
    name: 'displayPasswordProtectionWarningDialog',
    initialState: false,
    reducers: {
        openWarningDialog: () => true,
        closeWarningDialog: () => false,
    },
});

export const { openWarningDialog, closeWarningDialog } = displayPasswordProtectionWarningDialogSlice.actions;
export default displayPasswordProtectionWarningDialogSlice.reducer;
