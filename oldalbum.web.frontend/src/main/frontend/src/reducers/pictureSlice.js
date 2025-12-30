import { createSlice } from '@reduxjs/toolkit';
import { isSavedPicture } from '../matchers';
import { api } from '../api';
import { ADD_PICTURE_IMAGE_URL_SUCCESSFULLY_LOADED } from '../reduxactions';
import { extractBasename } from '../pathutilities';

const initialState = {
    id: -1,
    parent: -1,
    path: '',
    basename: '',
    album: false,
    title: '',
    description: '',
    imageUrl: '',
    thumbnailUrl: '',
    lastModified: new Date().toISOString(),
    contentType: '',
    contentLength: 0,
    requireLogin: false,
    groupByYear: false,
};

export const pictureSlice = createSlice({
    name: 'picture',
    initialState,
    reducers: {
        selectPicture: (_, action) => ({ ...action.payload, lastModified: new Date(action.payload.lastModified).toISOString(), basename: extractBasename(action.payload.path) }),
        clearPicture: () => initialState,
        picturePrepare: (_, action) => ({ ...initialState, ...action.payload }),
        setParent: (state, action) => ({ ...state, parent: parseInt(action.payload) }),
        setBasename: (state, action) => replaceLastElementInPathWithBasename(state, action.payload, false),
        setTitle: (state, action) => ({ ...state, title: action.payload }),
        setDescription: (state, action) => ({ ...state, description: action.payload }),
        setImageUrl: (state, action) => ({ ...state, imageUrl: action.payload }),
        setThumbnailUrl: (state, action) => ({ ...state, thumbnailUrl: action.payload }),
        setLastModified: (state, action) => ({ ...state, lastModified: action.payload }),
        setContentType: (state, action) => ({ ...state, contentType: action.payload }),
        setContentLength: (state, action) => ({ ...state, contentLength: parseInt(action.payload) }),
        setRequireLogin: (state, action) => ({ ...state, requireLogin: !!action.payload }),
        setGroupByYear: (state, action) => ({ ...state, groupByYear: !!action.payload }),
    },
    extraReducers: builder => {
        builder
            .addCase(ADD_PICTURE_IMAGE_URL_SUCCESSFULLY_LOADED, (state, action) => replaceLastElementInPathWithBasenameFromLoadedUrl(state, action.payload, false))
            .addMatcher(api.endpoints.postImageMetadata.matchFulfilled, setMetadata)
            .addMatcher(isSavedPicture, () => initialState)
    },
});

export const {
    selectPicture,
    clearPicture,
    picturePrepare,
    setParent,
    setBasename,
    setAlbum,
    setTitle,
    setDescription,
    setImageUrl,
    setThumbnailUrl,
    setLastModified,
    setContentType,
    setContentLength,
    setRequireLogin,
    setGroupByYear,
} = pictureSlice.actions;

export default pictureSlice.reducer;

function replaceLastElementInPathWithBasename(state, basename, endsWithSlash) {
    const pathElements = (endsWithSlash ? state.path.replace(/\/$/, '') : state.path).split(/\//);
    pathElements.pop();
    pathElements.push(basename);
    const path = pathElements.join('/') + (endsWithSlash ? '/' : '');
    return { ...state, path, basename };
}

function replaceLastElementInPathWithBasenameFromLoadedUrl(state, imageUrl, endsWithSlash) {
    const basename = extractBasename(imageUrl);
    return replaceLastElementInPathWithBasename(state, basename, endsWithSlash);
}

function setMetadata(state, action) {
    const { contentLength=0, contentType='', description='', lastModified:epochSeconds=0, status=0, title='' } = action.payload;
    const lastModified = new Date(epochSeconds).toISOString();
    return { ...state, contentLength, contentType, description, lastModified, status, title };
}
