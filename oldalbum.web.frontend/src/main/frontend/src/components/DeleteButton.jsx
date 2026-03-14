import React from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import {
    useGetDefaultlocaleQuery,
    useGetDisplaytextsQuery,
    usePostDeleteentryMutation,
} from '../api';

export default function DeleteButton(props) {
    const { item } = props;
    const { isSuccess: defaultLocaleIsSuccess } = useGetDefaultlocaleQuery();
    const locale = useSelector(state => state.locale);
    const { data: text = {} } = useGetDisplaytextsQuery(locale, { skip: !defaultLocaleIsSuccess });
    const showEditControls = useSelector(state => state.showEditControls);
    const parent = useSelector(state => state.albumentries[item.parent]);
    const childentries = useSelector(state => state.childentries[item.id]);
    const parentpath = (parent || {}).path || '';
    const children = childentries || [];
    const dispatch = useDispatch();
    const [ postDeleteentry ] = usePostDeleteentryMutation();
    const navigate = useNavigate();
    const onDelete = async () => {
        await postDeleteentry(item);
        navigate(parentpath);
    };

    // Button doesn't show up if: 1. edit not allowed, 2: this is the root album, 3: this is an album with content
    if (!showEditControls || !item.parent || children.length) {
        return null;
    }

    return(<button
               className={(props.className || '') + ' btn btn-light'}
               type="button"
               onClick={onDelete}>
               {text.delete}</button>);
}
