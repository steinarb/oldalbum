import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    useGetDefaultlocaleQuery,
    useGetDisplaytextsQuery,
} from '../api';
import LinkIntact from './bootstrap/LinkIntact';
import { shareLink } from '../reducers/sharedLinkItemSlice';

export default function CopyLinkButton(props) {
    const { isSuccess: defaultLocaleIsSuccess } = useGetDefaultlocaleQuery();
    const locale = useSelector(state => state.locale);
    const { data: text = {} } = useGetDisplaytextsQuery(locale, { skip: !defaultLocaleIsSuccess });
    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();
    const displayedAlert = alert ? '- ' + alert : '';

    return (
        <span onClick={() => dispatch(shareLink(props.item))} className={props.className || ''}><LinkIntact/> {text.copylink} {displayedAlert}</span>
    );
}
