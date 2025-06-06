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
    setParent,
    setBasename,
    setTitle,
    setDescription,
    setLastModified,
    setLastModifiedToCurrentDate,
    clearLastModified,
    setRequireLogin,
    setGroupByYear,
    clearAlbum,
} from '../reducers/albumSlice';

export default function ModifyAlbum() {
    const { isSuccess: defaultLocaleIsSuccess } = useGetDefaultlocaleQuery();
    const locale = useSelector(state => state.locale);
    const { data: text = {} } = useGetDisplaytextsQuery(locale, { skip: !defaultLocaleIsSuccess });
    const album = useSelector(state => state.album);
    const uplocation = album.path;
    const allroutes = useSelector(state => state.allroutes);
    const dispatch = useDispatch();
    const albums = allroutes.filter(r => r.album).filter(r => r.id !== album.id);
    const lastmodified = album.lastModified ? album.lastModified.split('T')[0] : '';
    const [ postModifyalbum ] = usePostModifyalbumMutation();
    const onModifyAlbumClicked = async () => { await postModifyalbum(album); dispatch(push(uplocation)); }
    const onCancelClicked = () => { dispatch(clearAlbum()); dispatch(push(uplocation)); }

    return(
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <NavLink to={album.path}>
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
                                value={album.parent}
                                onChange={e => dispatch(setParent(albums.find(a => a.id === parseInt(e.target.value))))}>
                                { albums.map((val) => <option key={'album_' + val.id} value={val.id}>{val.title}</option>) }
                            </select>
                        </div>
                    </div>
                    <div className="form-group row mb-2">
                        <label htmlFor="path" className="col-form-label col-5">{text.path}</label>
                        <div className="col-7">
                            <input id="path" className="form-control" type="text" value={album.path} readOnly={true} />
                        </div>
                    </div>
                    <div className="form-group row mb-2">
                        <label htmlFor="basename" className="col-form-label col-5">{text.basefilename}</label>
                        <div className="col-7">
                            <input
                                id="basename"
                                disabled={album.path === '/'}
                                className="form-control"
                                type="text"
                                value={album.basename}
                                onChange={e => dispatch(setBasename(e.target.value))} />
                        </div>
                    </div>
                    <div className="form-group row mb-2">
                        <label htmlFor="title" className="col-form-label col-5">{text.title}</label>
                        <div className="col-7">
                            <input
                                id="title"
                                className="form-control"
                                type="text"
                                value={album.title}
                                onChange={e => dispatch(setTitle(e.target.value))} />
                        </div>
                    </div>
                    <div className="form-group row mb-2">
                        <label htmlFor="description" className="col-form-label col-5">{text.description}</label>
                        <div className="col-7">
                            <input
                                id="description"
                                className="form-control"
                                type="text"
                                value={album.description}
                                onChange={e => dispatch(setDescription(e.target.value))} />
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
                                onChange={e => dispatch(setLastModified(e.target.value))} />
                        </div>
                    </div>
                    <div className="form-group row mb-2">
                        <div className="col-5" />
                        <div className="col-7">
                            <button
                                className="btn btn-light me-1"
                                type="button"
                                onClick={() => dispatch(setLastModifiedToCurrentDate())}
                            >
                                {text.setTodaysDate}
                            </button>
                            <button
                                className="btn btn-light me-1"
                                type="button"
                                onClick={() => dispatch(clearLastModified())}
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
                            checked={album.requireLogin}
                            onChange={e => dispatch(setRequireLogin(e.target.checked))} />
                        <label htmlFor="require-login" className="form-check-label col-11">{text.requireloggedinuser}</label>
                    </div>
                    <div className="form-group row mb-2">
                        <input
                            id="require-login"
                            className="form-check col-1"
                            type="checkbox"
                            checked={album.groupByYear}
                            onChange={e => dispatch(setGroupByYear(e.target.checked))} />
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
                            onClick={onCancelClicked}>
                            {text.cancel}</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
