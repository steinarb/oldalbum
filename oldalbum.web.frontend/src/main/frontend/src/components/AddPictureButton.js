import React from 'react';
import { useSelector } from 'react-redux';
import {
    useGetDefaultlocaleQuery,
    useGetDisplaytextsQuery,
} from '../api';
import { NavLink } from 'react-router';
import { stringify } from 'qs';

export default function AddPictureButton(props) {
    const { item } = props;
    const { isSuccess: defaultLocaleIsSuccess } = useGetDefaultlocaleQuery();
    const locale = useSelector(state => state.locale);
    const { data: text = {} } = useGetDisplaytextsQuery(locale, { skip: !defaultLocaleIsSuccess });
    const showEditControls = useSelector(state => state.showEditControls);
    const { id } = item;
    const parent = id; // The new picture will have this as a parent
    const addpicture = '/addpicture?' + stringify({ parent });

    if (!showEditControls) {
        return null;
    }

    return(<NavLink className={(props.className || '') + ' btn btn-light'} to={addpicture} >{text.addpicture}</NavLink>);
}
