import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = (Cookies.get('updateLoginRequirementForChildItems') || '').toLowerCase() === 'true';

const updateLoginRequirementForChildItemsSlice = createSlice({
    name: 'updateLoginRequirementForChildItems',
    initialState,
    reducers: {
        setUpdateLoginRequirementForChildItems: (state, action) => updateLoginRequirementForChildItemsCookie(action.payload),
    },
});

export const { setUpdateLoginRequirementForChildItems } = updateLoginRequirementForChildItemsSlice.actions;
export default updateLoginRequirementForChildItemsSlice.reducer;


function updateLoginRequirementForChildItemsCookie(updateLoginRequirementForChildItems) {
    Cookies.set('updateLoginRequirementForChildItems', updateLoginRequirementForChildItems);
    return updateLoginRequirementForChildItems;
}
