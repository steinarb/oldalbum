import { isAnyOf } from '@reduxjs/toolkit';
import { api } from './api';
import {
    MODIFY_ALBUM_CANCEL_BUTTON_CLICKED,
    ADD_ALBUM_CANCEL_BUTTON_CLICKED,
    MODIFY_PICTURE_CANCEL_BUTTON_CLICKED,
    ADD_PICTURE_CANCEL_BUTTON_CLICKED,
} from './reduxactions';

export const isAllroutes = isAnyOf(
    api.endpoints.getAllroutes.matchFulfilled,
    api.endpoints.getTogglepasswordprotection.matchFulfilled,
    api.endpoints.postModifyalbum.matchFulfilled,
    api.endpoints.postAddalbum.matchFulfilled,
    api.endpoints.postBatchAddPictures.matchFulfilled,
    api.endpoints.postModifypicture.matchFulfilled,
    api.endpoints.postAddpicture.matchFulfilled,
    api.endpoints.postDeleteentry.matchFulfilled,
    api.endpoints.postDeleteselection.matchFulfilled,
    api.endpoints.postSortalbumbydate.matchFulfilled,
    api.endpoints.postMovealbumentryup.matchFulfilled,
    api.endpoints.postMovealbumentrydown.matchFulfilled,
);

export const cancelAlbumClicked = isAnyOf(
    MODIFY_ALBUM_CANCEL_BUTTON_CLICKED,
    ADD_ALBUM_CANCEL_BUTTON_CLICKED,
);

export const cancelPictureClicked = isAnyOf(
    MODIFY_PICTURE_CANCEL_BUTTON_CLICKED,
    ADD_PICTURE_CANCEL_BUTTON_CLICKED,
);
