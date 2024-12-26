import { createReducer } from '@reduxjs/toolkit';
import { isAllroutes } from '../matchers';

// Creates a map from id to array of children
const childentriesByYearReducer = createReducer({}, builder => {
    builder
        .addMatcher(isAllroutes, (state, action) => createMapFromIdToMapOfYearWithArrayOfChildren(action));
});

export default childentriesByYearReducer;

function createMapFromIdToMapOfYearWithArrayOfChildren(action) {
    const allroutes = action.payload;
    const dateOfLastChildOfAlbum = findDateOfLastChildOfEachAlbum(allroutes);
    const children = {};
    allroutes.forEach(e => addChildToParent(children, e, dateOfLastChildOfAlbum));
    return children;
}

function addChildToParent(state, item, dateOfLastChildOfAlbum) {
    const { id, parent, lastModified } = item;
    const year = lastModified ?
          new Date(lastModified).getFullYear().toString() :
          dateOfLastChildOfAlbum[id] ?
          new Date(dateOfLastChildOfAlbum[id]).getFullYear().toString() :
          new Date().getFullYear().toString();
    if (parent) {
        if (parent in state) {
            if (year in state[parent]) {
                state[parent][year].push({ ...item });
            } else {
                state[parent][year] = [{ ...item }];
            }
        } else {
            state[parent] = {};
            state[parent][year] = [{ ...item }];
        }
    }
}

function scanAlbumsForLastDateOfChild(dateOfLastChildOfEachAlbum, albums) {
    for (const album of albums) {
        const lastDateOfChild = dateOfLastChildOfEachAlbum[album.parent];
        if (lastDateOfChild === undefined) {
            if (album.lastModified) {
                dateOfLastChildOfEachAlbum[album.parent] = new Date(album.lastModified).toISOString();
            } else {
                dateOfLastChildOfEachAlbum[album.parent] = dateOfLastChildOfEachAlbum[album.id];
            }
        } else {
            if (album.lastModified) {
                if (lastDateOfChild < album.lastModified) {
                    dateOfLastChildOfEachAlbum[album.parent] = new Date(album.lastModified).toISOString();
                }
            } else {
                if (lastDateOfChild < dateOfLastChildOfEachAlbum[album.id]) {
                    dateOfLastChildOfEachAlbum[album.parent] = dateOfLastChildOfEachAlbum[album.id];
                }
            }
        }
    }
}

function findDateOfLastChildOfEachAlbum(allroutes) {
    const dateOfLastChildOfEachAlbum = {};
    for (const picture of allroutes.filter(r => !r.album)) {
        const lastDateOfChild = dateOfLastChildOfEachAlbum[picture.parent];
        if (lastDateOfChild === undefined) {
            dateOfLastChildOfEachAlbum[picture.parent] = new Date(picture.lastModified).toISOString();
        } else {
            const pictureLastModified = new Date(picture.lastModified).toISOString();
            if (lastDateOfChild < pictureLastModified) {
                dateOfLastChildOfEachAlbum[picture.parent] = pictureLastModified;
            }
        }
    }

    // Have to loop over albums as many times as there are levelse
    // of albums containing only albums
    const albums = allroutes.filter(r => r.album);
    for (let i = 0; i < 5; i++) {
        scanAlbumsForLastDateOfChild(dateOfLastChildOfEachAlbum, albums);
    }


    return dateOfLastChildOfEachAlbum;
}
