import React from 'react';
import { useSelector } from 'react-redux';
import {
    useGetDefaultlocaleQuery,
    useGetDisplaytextsQuery,
} from '../api';
import { NavLink } from 'react-router';
import { stringify } from 'qs';

export default function AddAlbumButton(props) {
    const { item } = props;
    const { isSuccess: defaultLocaleIsSuccess } = useGetDefaultlocaleQuery();
    const locale = useSelector(state => state.locale);
    const { data: text = {} } = useGetDisplaytextsQuery(locale, { skip: !defaultLocaleIsSuccess });
    const showEditControls = useSelector(state => state.showEditControls);
    const { id } = item;
    const parent = id; // The new album will have this as a parent
    const addalbum = '/addalbum?' + stringify({ parent });

    if (!showEditControls) {
        return null;
    }

    return(<NavLink className={(props.className || '') + ' btn btn-light'} to={addalbum} >{text.addalbum}</NavLink>);
}
