import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    useGetDefaultlocaleQuery,
    useGetDisplaytextsQuery,
} from '../api';
import { NavLink } from 'react-router';

export default function CopyPreviousLastModifiedDateButton(props) {
    const { item, setLastModifiedDate } = props;
    const { isSuccess: defaultLocaleIsSuccess } = useGetDefaultlocaleQuery();
    const locale = useSelector(state => state.locale);
    const { data: text = {} } = useGetDisplaytextsQuery(locale, { skip: !defaultLocaleIsSuccess });
    const dispatch = useDispatch();
    const previous = useSelector(state => state.previousentry[item.id]);

    if (!previous) {
        return null;
    }

    const datePartOfPreviousLastModifed = new Date(previous.lastModified).toISOString().split('T')[0];
    return(<button className={(props.className || '') + ' btn btn-light'} onClick={() => dispatch(setLastModifiedDate(datePartOfPreviousLastModifed))} >{text.copypreviousvalue}</button>);
}
