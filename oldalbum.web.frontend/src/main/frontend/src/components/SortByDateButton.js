import React from 'react';
import { useSelector } from 'react-redux';
import {
    useGetDefaultlocaleQuery,
    useGetDisplaytextsQuery,
    usePostSortalbumbydateMutation,
} from '../api';

export default function SortByDateButton(props) {
    const { item } = props;
    const { isSuccess: defaultLocaleIsSuccess } = useGetDefaultlocaleQuery();
    const locale = useSelector(state => state.locale);
    const { data: text = {} } = useGetDisplaytextsQuery(locale, { skip: !defaultLocaleIsSuccess });
    const showEditControls = useSelector(state => state.showEditControls);
    [ postSortalbumbydate ] = usePostSortalbumbydateMutation();
    const onClicked = async () => await postSortalbumbydate(item);

    // Button doesn't show up if: 1. edit not allowed
    if (!showEditControls) {
        return null;
    }

    return(
        <button className={(props.className || '') + ' btn btn-light'} type="button" onClick={onClicked}>{text.sortbydate}</button>
    );
}
