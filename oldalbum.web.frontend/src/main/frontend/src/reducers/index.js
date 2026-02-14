import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import { api } from '../api';
import messageBanner from './messageBannerSlice';
import allroutes from './allroutesReducer';
import albumentries from './albumentriesReducer';
import selectedentries from './selectedentriesSlice';
import childentries from './childentriesReducer';
import childentriesByYear from './childentriesByYearReducer';
import previousentry from './previousentryReducer';
import nextentry from './nextentryReducer';
import album from './albumSlice';
import picture from './pictureSlice';
import albumGroupByYear from './albumGroupByYearSlice';
import batchAdd from './batchAddSlice';
import locale from './localeReducer';
import haveReceivedInitialLoginStatus from './haveReceivedInitialLoginStatusReducer';
import loggedIn from './loggedInReducer';
import username from './usernameReducer';
import sortingStatus from './sortingStatusReducer';
import showEditControls from './showEditControlsSlice';
import editMode from './editModeSlice';
import updateLoginRequirementForChildItems from './updateLoginRequirementForChildItemsSlice';
import canModifyAlbum from './canModifyAlbumReducer';
import canLogin from './canLoginReducer';
import displayPasswordProtectionWarningDialog from './displayPasswordProtectionWarningDialogSlice';
import sharedLinkItem from './sharedLinkItemSlice';

export default (basename) => combineReducers({
    [api.reducerPath]: api.reducer,
    messageBanner,
    allroutes,
    albumentries,
    selectedentries,
    childentries,
    childentriesByYear,
    previousentry,
    nextentry,
    albumGroupByYear,
    album,
    picture,
    batchAdd,
    locale,
    haveReceivedInitialLoginStatus,
    loggedIn,
    username,
    sortingStatus,
    showEditControls,
    editMode,
    updateLoginRequirementForChildItems,
    canModifyAlbum,
    canLogin,
    displayPasswordProtectionWarningDialog,
    sharedLinkItem,
    basename: createReducer(basename, (builder) => builder),
});
