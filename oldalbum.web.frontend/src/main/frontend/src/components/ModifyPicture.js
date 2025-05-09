import React from 'react';
import { push } from 'redux-first-history';
import { useSelector, useDispatch } from 'react-redux';
import {
    useGetDefaultlocaleQuery,
    useGetDisplaytextsQuery,
    usePostModifypictureMutation,
} from '../api';
import {
    clearPicture,
    setParent,
    setBasename,
    setTitle,
    setDescription,
    setImageUrl,
    setThumbnailUrl,
    setLastModified,
    setRequireLogin,
    setGroupByYear,
} from '../reducers/pictureSlice'
import { NavLink } from 'react-router';
import ModifyFailedErrorAlert from './ModifyFailedErrorAlert';

export default function ModifyPicture() {
    const { isSuccess: defaultLocaleIsSuccess } = useGetDefaultlocaleQuery();
    const locale = useSelector(state => state.locale);
    const { data: text = {} } = useGetDisplaytextsQuery(locale, { skip: !defaultLocaleIsSuccess });
    const picture = useSelector(state => state.picture);
    const parentalbum = useSelector(state => state.albumentries[picture.parent]) || { path: '/' };
    const allroutes = useSelector(state => state.allroutes);
    const albums = allroutes.filter(r => r.album).filter(r => r.id !== picture.album) || [];
    const lastmodified = picture.lastModified ? picture.lastModified.split('T')[0] : '';
    const dispatch = useDispatch();
    const [ postModifypicture ] = usePostModifypictureMutation();
    const onModifyPictureClicked = async () => { await postModifypicture(picture); dispatch(push(picture.path)); }
    const onCancelClicked = () => { dispatch(clearPicture()); dispatch(push(parentalbum.path)); }

    return(
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <NavLink to={parentalbum.path}>
                    <div className="container">
                        <div className="column">
                            <span className="row oi oi-chevron-top" title="chevron top" aria-hidden="true"></span>
                            <div className="row">{text.up}</div>
                        </div>
                    </div>
                </NavLink>
                <h1>{text.modifypicture}</h1>
            </nav>
            <ModifyFailedErrorAlert/>
            <form onSubmit={ e => { e.preventDefault(); }}>
                <div className="container">
                    <div className="form-group row mb-2">
                        <img className="img-thumbnail fullsize-img-thumbnail" src={picture.imageUrl} />
                    </div>
                    <div className="form-group row mb-2">
                        <label htmlFor="parent" className="col-form-label col-5">{text.parent}</label>
                        <div className="col-7">
                            <select
                                id="parent"
                                className="form-control"
                                value={picture.parent}
                                onChange={e => dispatch(setParent(parseInt(e.target.value)))}>
                                { albums.map((val) => <option key={'album_' + val.id} value={val.id}>{val.title}</option>) }
                            </select>
                        </div>
                    </div>
                    <div className="form-group row mb-2">
                        <label htmlFor="path" className="col-form-label col-5">{text.path}</label>
                        <div className="col-7">
                            <input id="path" className="form-control" type="text" value={picture.path} readOnly={true} />
                        </div>
                    </div>
                    <div className="form-group row mb-2">
                        <label htmlFor="basename" className="col-form-label col-5">{text.basefilename}</label>
                        <div className="col-7">
                            <input
                                id="basename"
                                className="form-control"
                                type="text"
                                value={picture.basename}
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
                                value={picture.title}
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
                                value={picture.description}
                                onChange={e => dispatch(setDescription(e.target.value))} />
                        </div>
                    </div>
                    <div className="form-group row mb-2">
                        <label htmlFor="imageUrl" className="col-form-label col-5">{text.imageurl}</label>
                        <div className="col-7">
                            <input
                                id="imageUrl"
                                className="form-control"
                                type="text"
                                value={picture.imageUrl}
                                onChange={e => dispatch(setImageUrl(e.target.value))} />
                        </div>
                    </div>
                    <div className="form-group row mb-2">
                        <label htmlFor="thumbnailUrl" className="col-form-label col-5">{text.thumbnailurl}</label>
                        <div className="col-7">
                            <input
                                id="thumbnailUrl"
                                className="form-control"
                                type="text"
                                value={picture.thumbnailUrl}
                                onChange={e => dispatch(setThumbnailUrl(e.target.value))} />
                        </div>
                    </div>
                    <div className="form-group row mb-2">
                        <label htmlFor="contentLength" className="col-form-label col-5">{text.contentlengthinbytes}</label>
                        <div className="col-7">
                            <input id="contentLength" readOnly className="form-control" type="text" value={picture.contentLength}/>
                        </div>
                    </div>
                    <div className="form-group row mb-2">
                        <label htmlFor="contentType" className="col-form-label col-5">{text.contenttype}</label>
                        <div className="col-7">
                            <input id="contentType" readOnly className="form-control" type="text" value={picture.contentType}/>
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
                        <input
                            id="require-login"
                            className="form-check col-1"
                            type="checkbox"
                            checked={picture.requireLogin}
                            onChange={e => dispatch(setRequireLogin(e.target.checked))} />
                        <label htmlFor="require-login" className="form-check-label col-11">{text.requireloggedinuser}</label>
                    </div>
                    <div>
                        <button className="btn btn-light me-1" type="button" onClick={onModifyPictureClicked}>{text.update}</button>
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
