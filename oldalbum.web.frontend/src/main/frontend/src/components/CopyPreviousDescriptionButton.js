import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    useGetDefaultlocaleQuery,
    useGetDisplaytextsQuery,
} from '../api';
import { NavLink } from 'react-router';
import { stringify } from 'qs';

export default function CopyPreviousDescriptionButton(props) {
    const { item, setDescription } = props;
    const { isSuccess: defaultLocaleIsSuccess } = useGetDefaultlocaleQuery();
    const locale = useSelector(state => state.locale);
    const { data: text = {} } = useGetDisplaytextsQuery(locale, { skip: !defaultLocaleIsSuccess });
    const dispatch = useDispatch();
    const previous = useSelector(state => state.previousentry[item.id]);

    if (!previous) {
        return null;
    }

    return(<button className={(props.className || '') + ' btn btn-light'} onClick={() => dispatch(setDescription(previous.description))} >{text.copypreviousvalue}</button>);
}
