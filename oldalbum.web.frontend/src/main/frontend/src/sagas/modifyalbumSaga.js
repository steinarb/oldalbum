import { takeLatest, call, put, select } from 'redux-saga/effects';
import axios from 'axios';
import {
    MODIFY_ALBUM_UPDATE,
    ALLROUTES_RECEIVE,
    MODIFY_ALBUM_ERROR,
} from '../reduxactions';
import { stripFieldsNotInAlbumEntryJavaBean } from './commonSagaCode';

function updateModifiedAlbum(album) {
    const body = stripFieldsNotInAlbumEntryJavaBean(album);
    return axios.post('/api/modifyalbum', body);
}

function* updateAlbumAndReceiveRoutes() {
    try {
        const modifyalbum = yield select(state => state.modifyalbum);
        const response = yield call(updateModifiedAlbum, modifyalbum);
        const routes = (response.headers['content-type'] === 'application/json') ? response.data : [];
        yield put(ALLROUTES_RECEIVE(routes));
    } catch (error) {
        yield put(MODIFY_ALBUM_ERROR(error));
    }
}

export default function* allroutesSaga() {
    yield takeLatest(MODIFY_ALBUM_UPDATE, updateAlbumAndReceiveRoutes);
}
