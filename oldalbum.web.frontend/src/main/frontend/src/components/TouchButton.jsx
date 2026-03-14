import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    useGetDefaultlocaleQuery,
    useGetDisplaytextsQuery,
    useGetTouchpicturetimestampMutation,
} from '../api';

export default function TouchButton(props) {
    const { item } = props;
    const { isSuccess: defaultLocaleIsSuccess } = useGetDefaultlocaleQuery();
    const locale = useSelector(state => state.locale);
    const { data: text = {} } = useGetDisplaytextsQuery(locale, { skip: !defaultLocaleIsSuccess });
    const showEditControls = useSelector(state => state.showEditControls);
    const dispatch = useDispatch();
    const [ getTouchpicturetimestamp ] = useGetTouchpicturetimestampMutation();
    const onTouch = async () => { await getTouchpicturetimestamp(item.id); };

    // Button doesn't show up if: 1. edit not allowed, 2: this is an album
    if (!showEditControls || item.album) {
        return null;
    }

    return(<button
               className={(props.className || '') + ' btn btn-light'}
               type="button"
               onClick={onTouch}>
               {text.touch}</button>);
}
