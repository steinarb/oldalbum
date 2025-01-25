import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    useGetDefaultlocaleQuery,
    useGetDisplaytextsQuery,
} from '../api';
import { closeWarningDialog } from '../reducers/displayPasswordProtectionWarningDialogSlice';
import { REMOVE_PASSWORD_PROTECTION_AND_CLOSE_WARNING_DIALOG } from '../reduxactions';

export default function PasswordProtectedWarningDialog() {
    const displayPasswordProtectionWarningDialog = useSelector(state => state.displayPasswordProtectionWarningDialog);
    const { isSuccess: defaultLocaleIsSuccess } = useGetDefaultlocaleQuery();
    const locale = useSelector(state => state.locale);
    const { data: text = {} } = useGetDisplaytextsQuery(locale, { skip: !defaultLocaleIsSuccess });
    const dispatch = useDispatch();

    if (!displayPasswordProtectionWarningDialog) {
        return null;
    }

    return(
        <dialog className="oldalbum-modal" open>
            <h5 className="modal-title">{text.passwordprotected}</h5>
            <p>{text.sharedlinkispasswordprotected}</p>
            <p>{text.removepassportprotection}</p>
            <p><em>{text.notedoesntaffectparentorsiblings}</em></p>
            <div className="row">
                <button type="button" className="btn btn-secondary col ms-5" onClick={() => dispatch(closeWarningDialog())}>{text.dontremove}</button>
                <button type="button" className="btn btn-primary col ms-5 me-5" onClick={() => dispatch(REMOVE_PASSWORD_PROTECTION_AND_CLOSE_WARNING_DIALOG())}>{text.remove}</button>
            </div>
        </dialog>
    );
}
