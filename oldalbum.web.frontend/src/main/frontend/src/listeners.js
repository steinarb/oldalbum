import { createListenerMiddleware } from '@reduxjs/toolkit';
import { isAnyOf } from '@reduxjs/toolkit';
import { parse } from 'qs';
import { api } from './api';
import { albumPrepare } from './reducers/albumSlice';
import { picturePrepare } from './reducers/pictureSlice';
import { setMessage, clearMessage } from './reducers/messageBannerSlice';
import { toggleOn, toggleOff } from './reducers/editModeSlice';
import { show, hide } from './reducers/showEditControlsSlice';
import { clearSelection, setSelection } from './reducers/selectedentriesSlice';
import { openWarningDialog, closeWarningDialog } from './reducers/displayPasswordProtectionWarningDialogSlice';
import { shareLink, clearSharedLink } from './reducers/sharedLinkItemSlice';
import { LOCATION_CHANGE } from 'redux-first-history';
import {
    SUCCESSFULL_CHANGE_OF_PASSWORD_REQUIREMENT,
    REMOVE_PASSWORD_PROTECTION_AND_CLOSE_WARNING_DIALOG,
    ALBUM_SELECT_ALL,
    START_SELECTION_DOWNLOAD,
} from './reduxactions';
import { isAllroutes } from './matchers';
import { extractBasename } from './pathutilities';

const listeners = createListenerMiddleware();

listeners.startListening({
    matcher: api.endpoints.getLogout.matchFulfilled,
    effect: (action, listenerApi) => {
        location.reload(true); // Stay in current location after logout
    }
})

listeners.startListening({
    matcher: api.endpoints.getLogoutUnauthorized.matchFulfilled,
    effect: (action, listenerApi) => {
        const basename = listenerApi.getState().basename;
        location.href = basename + '/'; // Go to top instead of reload to avoid ending up in /unauthorized on logout
    }
})

listeners.startListening({
    matcher: isAnyOf(
        api.endpoints.getLogin.matchFulfilled,
        toggleOn,
        toggleOff,
    ),
    effect: (action, listenerApi) => {
        const loggedIn = listenerApi.getState().loggedIn;
        const editMode = listenerApi.getState().editMode;
        const canModifyAlbum = listenerApi.getState().canModifyAlbum;
        const showEditControl = loggedIn && editMode && canModifyAlbum;
        if (showEditControl) {
            listenerApi.dispatch(show());
        } else {
            listenerApi.dispatch(hide());
        }
    }
})

listeners.startListening({
    actionCreator: shareLink,
    effect: async (action, listenerApi) => {
        const item = action.payload;
        if (item.requireLogin) {
            listenerApi.dispatch(openWarningDialog());
        }

        copyCurrentUrlToClipboard();
        const locale = listenerApi.getState().locale;
        const text = api.endpoints.getDisplaytexts.select(locale)(listenerApi.getState()).data;
        listenerApi.dispatch(setMessage(text.urlcopiedtoclipboard));
        await listenerApi.delay(2000); // 2s wait before taking down the banner
        listenerApi.dispatch(clearMessage());
    }
})

listeners.startListening({
    actionCreator: SUCCESSFULL_CHANGE_OF_PASSWORD_REQUIREMENT,
    effect: async (action, listenerApi) => {
        const albumEntryId = action.payload;
        const albumEntry = listenerApi.getState().albumentries[albumEntryId];
        const locale = listenerApi.getState().locale;
        const text = api.endpoints.getDisplaytexts.select(locale)(listenerApi.getState()).data;
        const messageText = formatMessageText(albumEntry, text);
        listenerApi.dispatch(setMessage(messageText));
        await listenerApi.delay(5000); // 5s wait before taking down the banner
        listenerApi.dispatch(clearMessage());
    }
})

listeners.startListening({
    actionCreator: REMOVE_PASSWORD_PROTECTION_AND_CLOSE_WARNING_DIALOG,
    effect: async (action, listenerApi) => {
        const sharedItem = listenerApi.getState().sharedLinkItem;
        listenerApi.dispatch(api.endpoints.getTogglepasswordprotection.initiate(sharedItem.id));
        listenerApi.dispatch(closeWarningDialog());
        listenerApi.dispatch(clearSharedLink());
    }
})

listeners.startListening({
    matcher: api.endpoints.getTogglepasswordprotection.matchFulfilled,
    effect: async (action, listenerApi) => {
        listenerApi.dispatch(api.endpoints.getReloadshiroconfig.initiate());
    }
})

listeners.startListening({
    actionCreator: ALBUM_SELECT_ALL,
    effect: (action, listenerApi) => {
        const album = action.payload;
        const allroutes = listenerApi.getState().allroutes;
        const picturesInAlbum = allroutes.filter(r => r.parent === album.id).filter(r => !r.album);
        listenerApi.dispatch(setSelection(picturesInAlbum));
    }
})

listeners.startListening({
    actionCreator: START_SELECTION_DOWNLOAD,
    effect: async (action, listenerApi) => {
        await listenerApi.delay(1000);
        listenerApi.dispatch(clearSelection());
    }
})

// Fill forms from redux state values based on form location
listeners.startListening({
    type: LOCATION_CHANGE,
    effect: async (action, listenerApi) => {
        const { location = {} } = action.payload || {};
        const basename = listenerApi.getState().basename;
        const pathname = findPathname(location, basename);
        const queryParams = parse(location.search, { ignoreQueryPrefix: true });

        listenerApi.dispatch(clearSelection());

        if (pathname === '/modifyalbum') {
            if (await listenerApi.condition(isAnyOf(allroutesHasData(listenerApi), isAllroutes))) {
                const { id } = queryParams;
                const albumentries = findAlbumentries(listenerApi.getState());
                const idInt = parseInt(id, 10);
                const album = albumentries[idInt];
                const basename = extractBasename(album.path);
                const lastModified = album.lastModified ? new Date(album.lastModified).toISOString() : album.lastModified;
                listenerApi.dispatch(albumPrepare({ ...album, basename, lastModified }));
            }
        }

        if (pathname === '/addalbum') {
            if (await listenerApi.condition(isAnyOf(allroutesHasData(listenerApi), isAllroutes))) {
                const { parent } = queryParams;
                const albumentries = findAlbumentries(listenerApi.getState());
                const parentId = parseInt(parent, 10);
                const parentalbum = albumentries[parentId];
                const path = (parentalbum.path ? parentalbum.path : '/') + '/';
                const sort = (parentalbum.childcount || 0) + 1;
                listenerApi.dispatch(albumPrepare({ parent: parentId, path, sort }));
            }
        }

        if (pathname === '/modifypicture') {
            if (await listenerApi.condition(isAnyOf(allroutesHasData(listenerApi), isAllroutes))) {
                const { id } = queryParams;
                const albumentries = findAlbumentries(listenerApi.getState());
                const idInt = parseInt(id, 10);
                const picture = albumentries[idInt];
                const basename = extractBasename(picture.path);
                const lastModified = new Date(picture.lastModified).toISOString();
                listenerApi.dispatch(picturePrepare({ ...picture, basename, lastModified }));
            }
        }

        if (pathname === '/addpicture') {
            if (await listenerApi.condition(isAnyOf(allroutesHasData(listenerApi), isAllroutes))) {
                const { parent } = queryParams;
                const albumentries = findAlbumentries(listenerApi.getState());
                const parentId = parseInt(parent, 10);
                const parentalbum = albumentries[parentId];
                const path = parentalbum.path || '';
                const sort = (parentalbum.childcount || 0) + 1;
                const lastModified = new Date().toISOString();
                listenerApi.dispatch(picturePrepare({ parent: parentId, path, sort, lastModified }));
            }
        }
    }
})

function allroutesHasData(listenerApi) {
    return () =>  !!(listenerApi.getState().allroutes && listenerApi.getState().allroutes.length);
}

function findPathname(location, basename) {
    if (basename === '/') {
        return location.pathname;
    }

    return location.pathname.replace(new RegExp('^' + basename + '(.*)'), '$1');
}

function findAlbumentries(state) {
    return state.albumentries || [];
}

function copyCurrentUrlToClipboard() {
    const currentLocation = document.createElement('textarea');
    currentLocation.value = window.location.href;
    document.body.appendChild(currentLocation);
    currentLocation.select();
    document.execCommand("copy");
    document.body.removeChild(currentLocation);
}

function formatMessageText(albumEntry, text) {
    const requireLogin = albumEntry.requireLogin;
    const entryType = albumEntry.album ? text.album : text.picture;
    const path = albumEntry.path;
    if (requireLogin) {
        return text.successfullyaddedpasswordprotection + ' ' + entryType + ' \'' + path + '\'';
    } else {
        return text.successfullyremovedpasswordprotection + ' ' + entryType + ' \'' + path + '\'';
    }
}

export default listeners;
