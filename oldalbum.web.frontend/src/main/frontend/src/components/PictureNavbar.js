import React from 'react';
import { useSelector } from 'react-redux';
import {
    useGetDefaultlocaleQuery,
    useGetDisplaytextsQuery,
} from '../api';
import { NavLink } from 'react-router';
import Locale from './Locale';
import EditModeButton from './EditModeButton';
import CopyLinkButton from './CopyLinkButton';
import ReloadShiroConfigButton from './ReloadShiroConfigButton';
import TogglePasswordProtection from './TogglePasswordProtection';
import DownloadButton from './DownloadButton';
import LoginLogoutButton from './LoginLogoutButton';

export default function PictureNavbar(props) {
    const { className, item, parent, title } = props;
    const { isSuccess: defaultLocaleIsSuccess } = useGetDefaultlocaleQuery();
    const locale = useSelector(state => state.locale);
    const { data: text = {} } = useGetDisplaytextsQuery(locale, { skip: !defaultLocaleIsSuccess });
    const anchor = item.path.split('/').pop();

    return (
        <div className={className}>
            <nav className="navbar navbar-light bg-light">
                <NavLink className="nav-link" to={parent + '#' + anchor}>
                    <div className="container">
                        <div className="column">
                            <span className="row oi oi-chevron-top" title="chevron top" aria-hidden="true"></span>
                            <div className="row">{text.up}</div>
                        </div>
                    </div>
                </NavLink>
                <h1 className="navbar-text">{title}</h1>
                <div className="d-flex flex-row">
                    <DownloadButton className="nav-link float-right" item={item} />
                    <Locale className="form-inline" />
                    <div className="dropdown">
                        <button className="dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end">
                            <li><CopyLinkButton className="dropdown-item" item={item} /></li>
                            <li><ReloadShiroConfigButton className="dropdown-item"/></li>
                            <li><TogglePasswordProtection className="dropdown-item" item={item}/></li>
                            <li><EditModeButton className="dropdown-item" /></li>
                            <li><LoginLogoutButton className="dropdown-item" item={item}/></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}
