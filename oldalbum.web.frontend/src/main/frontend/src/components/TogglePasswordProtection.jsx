import React from 'react';
import { useSelector } from 'react-redux';
import {
    useGetDefaultlocaleQuery,
    useGetDisplaytextsQuery,
    useGetTogglepasswordprotectionMutation,
} from '../api';

export default function TogglePasswordProtection(props) {
    const item = props.item;
    const { isSuccess: defaultLocaleIsSuccess } = useGetDefaultlocaleQuery();
    const locale = useSelector(state => state.locale);
    const { data: text = {} } = useGetDisplaytextsQuery(locale, { skip: !defaultLocaleIsSuccess });
    const loggedIn = useSelector(state => state.loggedIn);
    const commandText = item.requireLogin ?
          text.removepasswordprotection :
          (item.album ? text.protectalbumwithpassword : text.protectpicturewithpassword);
    const [ getTogglepasswordprotection ] = useGetTogglepasswordprotectionMutation();
    const onTogglePasswordProtectionClicked = async () => { await getTogglepasswordprotection(item.id) }

    if (!loggedIn) {
        return null;
    }

    return (<span className="{props.styleName} alert" role="alert">
                <span className="alert-link" onClick={onTogglePasswordProtectionClicked}>{commandText}</span>
            </span>);
}
