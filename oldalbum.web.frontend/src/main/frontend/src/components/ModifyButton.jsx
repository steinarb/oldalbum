import React from 'react';
import { useSelector } from 'react-redux';
import {
    useGetDefaultlocaleQuery,
    useGetDisplaytextsQuery,
} from '../api';
import { NavLink } from 'react-router';
import { stringify } from 'qs';

export default function ModifyButton(props) {
    const { item } = props;
    const { isSuccess: defaultLocaleIsSuccess } = useGetDefaultlocaleQuery();
    const locale = useSelector(state => state.locale);
    const { data: text = {} } = useGetDisplaytextsQuery(locale, { skip: !defaultLocaleIsSuccess });
    const webcontext = useSelector(state => state.webcontext) || '';
    const showEditControls = useSelector(state => state.showEditControls);

    if (!showEditControls) {
        return null;
    }


    const { id } = item;
    const modifyitem = webcontext + (item.album ? '/modifyalbum' : '/modifypicture') + '?' + stringify({ id });

    return(<NavLink className={(props.className || '') + ' btn btn-light'} to={modifyitem} >{text.modify}</NavLink>);
}
