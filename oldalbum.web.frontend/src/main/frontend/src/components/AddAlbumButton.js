import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { stringify } from 'qs';
import { webcontext } from '../constants';

function AddAlbumButton(props) {
    const { loginresult, item } = props;
    if (!loginresult.canModifyAlbum) {
        return null;
    }


    const { id } = item;
    const parent = id; // The new album will have this as a parent
    const addalbum = webcontext + '/addalbum?' + stringify({ parent });

    return(<NavLink className="btn btn-default" to={addalbum} >Add album</NavLink>);
}

function mapStateToProps(state) {
    const login = state.login || {};
    const loginresult = login.loginresult || { success: false };
    return {
        loginresult,
    };
}

export default connect(mapStateToProps)(AddAlbumButton);