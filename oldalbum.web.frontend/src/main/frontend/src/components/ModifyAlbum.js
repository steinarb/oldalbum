import React from 'react';
import { push } from 'redux-first-history';
import { useSelector, useDispatch } from 'react-redux';
import {
    useGetDefaultlocaleQuery,
    useGetDisplaytextsQuery,
    usePostModifyalbumMutation,
} from '../api';
import { NavLink } from 'react-router';
import ModifyFailedErrorAlert from './ModifyFailedErrorAlert';
import {
    MODIFY_ALBUM_PARENT_SELECTED,
    MODIFY_ALBUM_BASENAME_FIELD_CHANGED,
    MODIFY_ALBUM_TITLE_FIELD_CHANGED,
    MODIFY_ALBUM_DESCRIPTION_FIELD_CHANGED,
    MODIFY_ALBUM_LASTMODIFIED_FIELD_CHANGED,
    MODIFY_ALBUM_SET_LASTMODIFIED_FIELD_TO_CURRENT_DATE,
    MODIFY_ALBUM_CLEAR_LASTMODIFIED_FIELD,
    MODIFY_ALBUM_REQUIRE_LOGIN_FIELD_CHANGED,
    MODIFY_ALBUM_GROUP_BY_YEAR_FIELD_CHANGED,
    MODIFY_ALBUM_CANCEL_BUTTON_CLICKED,
    CLEAR_ALBUM_FORM,
} from '../reduxactions';

export default function ModifyAlbum() {
    const { isSuccess: defaultLocaleIsSuccess } = useGetDefaultlocaleQuery();
    const locale = useSelector(state => state.locale);
    const { data: text = {} } = useGetDisplaytextsQuery(locale, { skip: !defaultLocaleIsSuccess });
    const albumentryid = useSelector(state => state.albumentryid);
    const parent = useSelector(state => state.albumentryParent);
    const path = useSelector(state => state.albumentryPath);
    const basename = useSelector(state => state.albumentryBasename);
    const title = useSelector(state => state.albumentryTitle);
    const description = useSelector(state => state.albumentryDescription);
    const lastModified = useSelector(state => state.albumentryLastModified);
    const requireLogin = useSelector(state => state.albumentryRequireLogin);
    const groupByYear = useSelector(state => !!state.albumentryGroupByYear);
    const sort = useSelector(state => state.albumentrySort);
    const allroutes = useSelector(state => state.allroutes);
    const albumentries = useSelector(state => state.albumentries);
    const dispatch = useDispatch();
    const albums = allroutes.filter(r => r.album).filter(r => r.id !== albumentryid);
    const uplocation = (albumentries[albumentryid] || {}).path || '/';
    const lastmodified = lastModified ? lastModified.split('T')[0] : '';
    const [ postModifyalbum ] = usePostModifyalbumMutation();
    const onModifyAlbumClicked = async () => {
        await postModifyalbum({
            id: albumentryid,
            parent,
            path,
            album: true,
            title,
            description,
            lastModified,
            requireLogin,
            groupByYear,
            sort,
        });
        dispatch(push(path));
        dispatch(CLEAR_ALBUM_FORM());
    }

    return(
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <NavLink to={uplocation}>
                    <div className="container">
                        <div className="column">
                            <span className="row oi oi-chevron-top" title="chevron top" aria-hidden="true"></span>
                            <div className="row">{text.up}</div>
                        </div>
                    </div>
                </NavLink>
                <h1>{text.modifyalbum}</h1>
            </nav>
            <ModifyFailedErrorAlert/>
            <form onSubmit={ e => { e.preventDefault(); }}>
                <div className="container mt-2">
                    <div className="form-group row mb-2">
                        <label htmlFor="parent" className="col-form-label col-5">{text.parent}</label>
                        <div className="col-7">
                            <select
                                id="parent"
                                className="form-control"
                                value={parent}
                                onChange={e => dispatch(MODIFY_ALBUM_PARENT_SELECTED(albums.find(a => a.id === parseInt(e.target.value))))}>
                                { albums.map((val) => <option key={'album_' + val.id} value={val.id}>{val.title}</option>) }
                            </select>
                        </div>
                    </div>
                    <div className="form-group row mb-2">
                        <label htmlFor="path" className="col-form-label col-5">{text.path}</label>
                        <div className="col-7">
                            <input id="path" className="form-control" type="text" value={path} readOnly={true} />
                        </div>
                    </div>
                    <div className="form-group row mb-2">
                        <label htmlFor="basename" className="col-form-label col-5">{text.basefilename}</label>
                        <div className="col-7">
                            <input
                                id="basename"
                                disabled={path === '/'}
                                className="form-control"
                                type="text"
                                value={basename}
                                onChange={e => dispatch(MODIFY_ALBUM_BASENAME_FIELD_CHANGED(e.target.value))} />
                        </div>
                    </div>
                    <div className="form-group row mb-2">
                        <label htmlFor="title" className="col-form-label col-5">{text.title}</label>
                        <div className="col-7">
                            <input
                                id="title"
                                className="form-control"
                                type="text"
                                value={title}
                                onChange={e => dispatch(MODIFY_ALBUM_TITLE_FIELD_CHANGED(e.target.value))} />
                        </div>
                    </div>
                    <div className="form-group row mb-2">
                        <label htmlFor="description" className="col-form-label col-5">{text.description}</label>
                        <div className="col-7">
                            <input
                                id="description"
                                className="form-control"
                                type="text"
                                value={description}
                                onChange={e => dispatch(MODIFY_ALBUM_DESCRIPTION_FIELD_CHANGED(e.target.value))} />
                        </div>
                    </div>
                    <div className="form-group row mb-2">
                        <label htmlFor="lastmodified" className="col-form-label col-5">{text.lastmodified}</label>
                        <div className="col-7">
                            <input
                                id="lastmodified"
                                className="form-control"
                                type="date"
                                value={lastmodified}
                                onChange={e => dispatch(MODIFY_ALBUM_LASTMODIFIED_FIELD_CHANGED(e.target.value))} />
                        </div>
                    </div>
                    <div className="form-group row mb-2">
                        <div className="col-5" />
                        <div className="col-7">
                            <button
                                className="btn btn-light me-1"
                                type="button"
                                onClick={() => dispatch(MODIFY_ALBUM_SET_LASTMODIFIED_FIELD_TO_CURRENT_DATE())}
                            >
                                {text.setTodaysDate}
                            </button>
                            <button
                                className="btn btn-light me-1"
                                type="button"
                                onClick={() => dispatch(MODIFY_ALBUM_CLEAR_LASTMODIFIED_FIELD())}
                            >
                                {text.clearDate}
                            </button>
                        </div>
                    </div>
                    <div className="form-group row mb-2">
                        <input
                            id="require-login"
                            className="form-check col-1"
                            type="checkbox"
                            checked={requireLogin}
                            onChange={e => dispatch(MODIFY_ALBUM_REQUIRE_LOGIN_FIELD_CHANGED(e.target.checked))} />
                        <label htmlFor="require-login" className="form-check-label col-11">{text.requireloggedinuser}</label>
                    </div>
                    <div className="form-group row mb-2">
                        <input
                            id="require-login"
                            className="form-check col-1"
                            type="checkbox"
                            checked={groupByYear}
                            onChange={e => dispatch(MODIFY_ALBUM_GROUP_BY_YEAR_FIELD_CHANGED(e.target.checked))} />
                        <label htmlFor="require-login" className="form-check-label col-11">{text.albumGroupByYear}</label>
                    </div>
                    <div className="container">
                        <button
                            className="btn btn-light me-1"
                            type="button"
                            onClick={() => dispatch(onModifyAlbumClicked)}>
                            {text.update}</button>
                        <button
                            className="btn btn-light me-1"
                            type="button"
                            onClick={() => dispatch(MODIFY_ALBUM_CANCEL_BUTTON_CLICKED())}>
                            {text.cancel}</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
