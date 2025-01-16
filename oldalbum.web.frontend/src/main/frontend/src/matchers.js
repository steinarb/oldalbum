import { isAnyOf } from '@reduxjs/toolkit';
import { api } from './api';

export const isSavedAlbum = isAnyOf(
    api.endpoints.postModifyalbum.matchFulfilled,
    api.endpoints.postAddalbum.matchFulfilled,
);

export const isSavedPicture = isAnyOf(
    api.endpoints.postModifypicture.matchFulfilled,
    api.endpoints.postAddpicture.matchFulfilled,
);

export const isAllroutes = isAnyOf(
    api.endpoints.getAllroutes.matchFulfilled,
    api.endpoints.getTogglepasswordprotection.matchFulfilled,
    api.endpoints.postModifyalbum.matchFulfilled,
    api.endpoints.postAddalbum.matchFulfilled,
    api.endpoints.postBatchAddPictures.matchFulfilled,
    isSavedPicture,
    api.endpoints.postDeleteentry.matchFulfilled,
    api.endpoints.postDeleteselection.matchFulfilled,
    api.endpoints.postSortalbumbydate.matchFulfilled,
    api.endpoints.postMovealbumentryup.matchFulfilled,
    api.endpoints.postMovealbumentrydown.matchFulfilled,
);
