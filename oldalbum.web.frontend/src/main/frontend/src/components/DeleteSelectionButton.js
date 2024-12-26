import React from 'react';
import { useSelector } from 'react-redux';
import {
    useGetDefaultlocaleQuery,
    useGetDisplaytextsQuery,
    usePostDeleteselectionMutation,
} from '../api';

export default function DeleteSelectionButton(props) {
    const { isSuccess: defaultLocaleIsSuccess } = useGetDefaultlocaleQuery();
    const locale = useSelector(state => state.locale);
    const { data: text = {} } = useGetDisplaytextsQuery(locale, { skip: !defaultLocaleIsSuccess });
    const showEditControls = useSelector(state => state.showEditControls);
    const selectedentries = useSelector(state => state.selectedentries);
    const selectionExists = !!selectedentries.length;
    const [ postDeleteselection ] = usePostDeleteselectionMutation();
    const onDelete = async () => await postDeleteselection(selectedentries.map(e => e.id));

    // Button doesn't show up if: 1. edit not allowed, 2: there is no selection
    if (!showEditControls || !selectionExists) {
        return null;
    }

    return(<button className={(props.className || '') + ' btn btn-light'} type="button" onClick={onDelete}>{text.deleteselection}</button>);
}
