import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    useGetDefaultlocaleQuery,
    useGetDisplaytextsQuery,
} from '../api';
import { toggleOn, toggleOff } from  '../reducers/editModeSlice';

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
                <span onClick={() => dispatch(toggleOff())}>{text.switcheditmodeoff}</span>
            </div>
        );
    }

    return(
        <div className={props.className}>
            <span onClick={() => dispatch(toggleOn())}>{text.switcheditmodeon}</span>
        </div>
    );
}
