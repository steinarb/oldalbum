import React from 'react';
import { useSelector } from 'react-redux';
import {
    useGetDefaultlocaleQuery,
    useGetDisplaytextsQuery,
    useGetReloadshiroconfigMutation,
} from '../api';

export default function ReloadShiroConfigButton() {
    const { isSuccess: defaultLocaleIsSuccess } = useGetDefaultlocaleQuery();
    const locale = useSelector(state => state.locale);
    const { data: text = {} } = useGetDisplaytextsQuery(locale, { skip: !defaultLocaleIsSuccess });
    const canModifyAlbum = useSelector(state => state.canModifyAlbum);
    const [ getReloadshiroconfig ] = useGetReloadshiroconfigMutation();
    const onReloadShiroFilterClicked = async () => { await getReloadshiroconfig() }

    if (!canModifyAlbum) {
        return null;
    }

    return (<span className="{props.styleName} alert" role="alert">
                <span className="alert-link" onClick={onReloadShiroFilterClicked}>{text.reloadshirofilter}</span>
            </span>);
}
