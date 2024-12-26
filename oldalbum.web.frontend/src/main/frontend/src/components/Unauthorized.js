import React from 'react';
import { NavLink } from 'react-router';
import { Navigate } from 'react-router';
import { useSelector } from 'react-redux';
import {
    useGetDefaultlocaleQuery,
    useGetDisplaytextsQuery,
    useGetLogoutUnauthorizedMutation,
} from '../api';
import EditModeButton from './EditModeButton';
import LoginLogoutButton from './LoginLogoutButton';
import CopyLinkButton from './CopyLinkButton';


export default function Unauthorized() {
    const { isSuccess: defaultLocaleIsSuccess } = useGetDefaultlocaleQuery();
    const locale = useSelector(state => state.locale);
    const { data: text = {} } = useGetDisplaytextsQuery(locale, { skip: !defaultLocaleIsSuccess });
    const haveReceivedInitialLoginStatus = useSelector(state => state.haveReceivedInitialLoginStatus);
    const username = useSelector(state => state.username);
    const loggedIn = useSelector(state => state.loggedIn);
    const [ getLogoutUnauthorized ] = useGetLogoutUnauthorizedMutation();
    const onLogoutClicked = async () => { await getLogoutUnauthorized() }

    if (haveReceivedInitialLoginStatus && !loggedIn) {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            <nav className="navbar navbar-light bg-light">
                <NavLink className="btn btn-light left-align-cell" to="/"><span className="oi oi-chevron-left" title="chevron left" aria-hidden="true"></span>&nbsp;Go home!</NavLink>
                <h1>{text.unauthorized}</h1>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <div className="navbar-nav">
                        <CopyLinkButton className="nav-item" />
                        <EditModeButton className="nav-item" />
                        <LoginLogoutButton className="nav-item" item={{}}/>
                    </div>
                </div>
            </nav>
            <div className="container">
                <p>{text.hi} {username}! {text.unauthorizedtomodifyalbum}</p>
                <p>{text.navigatetotoporlogout}</p>
                <form onSubmit={ e => e.preventDefault() }>
                    <div className="form-group row">
                        <div className="col-5"/>
                        <div className="col-7">
                            <button className="btn btn-light" onClick={onLogoutClicked}>{text.logout}</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
