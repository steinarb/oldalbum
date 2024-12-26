import React from 'react';
import { useSelector } from 'react-redux';
import {
    useGetDefaultlocaleQuery,
    useGetDisplaytextsQuery,
    useGetLogoutMutation,
} from '../api';
import { stringify } from 'qs';

export default function LoginLogoutButton() {
    const { isSuccess: defaultLocaleIsSuccess } = useGetDefaultlocaleQuery();
    const locale = useSelector(state => state.locale);
    const { data: text = {} } = useGetDisplaytextsQuery(locale, { skip: !defaultLocaleIsSuccess });
    const loggedIn = useSelector(state => state.loggedIn);
    const username = useSelector(state => state.username);
    const canLogin = useSelector(state => state.canLogin);
    const routerBasename = useSelector(state => state.router.basename);
    const [ getLogout ] = useGetLogoutMutation();
    const onLogoutClicked = async () => { await getLogout() }

    if (!canLogin) {
        return null;
    }

    if (loggedIn) {
        return (<span className="{props.styleName} alert" role="alert">
                    {text.loggedinas} {username} <span className="alert-link" onClick={onLogoutClicked}>{text.logout}</span>
                </span>);
    }

    const originalUri = window.location.href;
    const basename = routerBasename == '/' ? '' : routerBasename;
    const loginpath = basename + '/auth/login?' + stringify({ originalUri });
    return(<span className="alert" role="alert">{text.notloggedin} <a className="alert-link" href={loginpath}>{text.login}</a></span>);
}
