import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    useGetDefaultlocaleQuery,
    useGetDisplaytextsQuery,
} from '../api';
import {
    TOGGLE_EDIT_MODE_ON,
    TOGGLE_EDIT_MODE_OFF,
} from '../reduxactions';

export default function EditModeButton(props) {
    const { isSuccess: defaultLocaleIsSuccess } = useGetDefaultlocaleQuery();
    const locale = useSelector(state => state.locale);
    const { data: text = {} } = useGetDisplaytextsQuery(locale, { skip: !defaultLocaleIsSuccess });
    const canModifyAlbum = useSelector(state => state.canModifyAlbum);
    const loggedIn = useSelector(state => state.loggedIn);
    const editMode = useSelector(state => state.editMode);
    const dispatch = useDispatch();

    if (!loggedIn || !canModifyAlbum) {
        return null;
    }

    if (editMode) {
        return (
            <div className={props.className}>
                <span onClick={() => dispatch(TOGGLE_EDIT_MODE_OFF())}>{text.switcheditmodeoff}</span>
            </div>
        );
    }

    return(
        <div className={props.className}>
            <span onClick={() => dispatch(TOGGLE_EDIT_MODE_ON())}>{text.switcheditmodeon}</span>
        </div>
    );
}
