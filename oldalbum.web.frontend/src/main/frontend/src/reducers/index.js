import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import { api } from '../api';
import alert from './alertReducer';
import messageBanner from './messageBannerReducer';
import modifyFailedError from './modifyFailedErrorReducer';
import allroutes from './allroutesReducer';
import albumentries from './albumentriesReducer';
import selectedentries from './selectedentriesReducer';
import childentries from './childentriesReducer';
import childentriesByYear from './childentriesByYearReducer';
import previousentry from './previousentryReducer';
import nextentry from './nextentryReducer';
import albumentryid from './albumentryidReducer';
import albumGroupByYear from './albumGroupByYearReducer';
import albumentryParent from './albumentryParentReducer';
import albumentryPath from './albumentryPathReducer';
import albumentryBasename from './albumentryBasenameReducer';
import albumentryTitle from './albumentryTitleReducer';
import albumentryDescription from './albumentryDescriptionReducer';
import albumentryImageUrl from './albumentryImageUrlReducer';
import albumentryThumbnailUrl from './albumentryThumbnailUrlReducer';
import albumentryLastModified from './albumentryLastModifiedReducer';
import albumentryContentLength from './albumentryContentLengthReducer';
import albumentryContentType from './albumentryContentTypeReducer';
import albumentryRequireLogin from './albumentryRequireLoginReducer';
import albumentryGroupByYear from './albumentryGroupByYearReducer';
import albumentrySort from './albumentrySortReducer';
import batchAddUrl from './batchAddUrlReducer';
import batchAddImportYear from './batchAddImportYearReducer';
import batchAddDefaultTitle from './batchAddDefaultTitleReducer';
import locale from './localeReducer';
import haveReceivedInitialLoginStatus from './haveReceivedInitialLoginStatusReducer';
import loggedIn from './loggedInReducer';
import username from './usernameReducer';
import sortingStatus from './sortingStatusReducer';
import logstatusMessage from './logstatusMessageReducer';
import showEditControls from './showEditControlsReducer';
import editMode from './editModeReducer';
import canModifyAlbum from './canModifyAlbumReducer';
import canLogin from './canLoginReducer';
import originalRequestUri from './originalRequestUriReducer';
import dateOfLastChildOfAlbum from './dateOfLastChildOfAlbumReducer';
import displayPasswordProtectionWarningDialog from './displayPasswordProtectionWarningDialogReducer';
import sharedLinkItem from './sharedLinkItemReducer';

export default (routerReducer, basename) => combineReducers({
    router: routerReducer,
    [api.reducerPath]: api.reducer,
    alert,
    messageBanner,
    modifyFailedError,
    allroutes,
    albumentries,
    selectedentries,
    childentries,
    childentriesByYear,
    previousentry,
    nextentry,
    albumGroupByYear,
    albumentryid,
    albumentryParent,
    albumentryPath,
    albumentryBasename,
    albumentryTitle,
    albumentryDescription,
    albumentryImageUrl,
    albumentryThumbnailUrl,
    albumentryLastModified,
    albumentryContentLength,
    albumentryContentType,
    albumentryRequireLogin,
    albumentryGroupByYear,
    albumentrySort,
    batchAddUrl,
    batchAddImportYear,
    batchAddDefaultTitle,
    locale,
    haveReceivedInitialLoginStatus,
    loggedIn,
    username,
    sortingStatus,
    logstatusMessage,
    showEditControls,
    editMode,
    canModifyAlbum,
    canLogin,
    originalRequestUri,
    dateOfLastChildOfAlbum,
    displayPasswordProtectionWarningDialog,
    sharedLinkItem,
    basename: createReducer(basename, (builder) => builder),
});
