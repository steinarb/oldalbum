import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router';
import { pictureTitle } from './commonComponentCode';
import LeftButton from './LeftButton';
import RightButton from './RightButton';
import UpButton from './UpButton';
import DownButton from './DownButton';
import Thumbnail from './Thumbnail';

export default function AlbumEntryOfTypeAlbum(props) {
    const { entry, className='' } = props;
    const childentries = useSelector(state => state.childentries || {});
    const children = childentries[entry.id] || [];
    const title = pictureTitle(entry);
    const noOfThumbnails = title.length > 21 ? 3 : 2;
    const childrenWithThumbnails = findChildrenThumbnails(entry, children, childentries).slice(0, noOfThumbnails);
    const widthInCols =  noOfThumbnails===2 ?
          ' col-sm-12 col-md-4 col-lg-3 col-xl-3 col-xxl-2' :
          ' col-sm-12 col-md-7 col-lg-6 col-xl-4 col-xxl-3';
    const pathFragments = entry.path.split('/');
    pathFragments.pop(); // Remove empty element caused by trailing slash
    const anchor = pathFragments.pop();

    return (
        <div id={anchor} className={className + widthInCols + ' album-entry-album mx-1 my-1 album-scroll-below-fixed-header'}>
            <div className="column w-100 btn btn-light">
                <div className="d-none d-md-flex">
                    <LeftButton item={entry} />
                    <div className="flex-grow-1"/>
                    <RightButton item={entry} />
                </div>
                <div className="d-flex d-md-none">
                    <UpButton className="align-self-center m-auto" item={entry} />
                </div>
                <div className="row w-100">
                    <NavLink className="btn btn-light p-2 text-left" to={entry.path}>Album: {title}</NavLink>
                    <div className="d-none d-md-flex">
                        { childrenWithThumbnails.map(c => <Thumbnail key={'entry_' + c.id} entry={c} />) }
                    </div>
                </div>
                <div className="d-flex d-md-none">
                    <DownButton className="align-self-center m-auto" item={entry} />
                </div>
            </div>
        </div>
    );
}

function findChildrenThumbnails(entry, children, childitems) {
    // First try to find thumbnails of direct children of the album
    const directChildren = children.filter(c => !c.album).filter(c => c.thumbnailUrl || c.imageUrl).sort((a,b) => a.sort - b.sort);
    if (directChildren.length) { return directChildren; }

    // If the children of the album have no thumbnails, find the first thumbnail of each child
    // and set the navigation link on thumbnails the to the album itself
    const indirectChildren = children
          .filter(c => c.album)
          .sort((a,b) => a.sort - b.sort)
          .map(c => childitems[c.id] && childitems[c.id].slice().sort((a,b) => a.sort - b.sort).find(t => t.thumbnailUrl || c.imageUrl))
          .map(c => ( { ...c, path: entry.path } ));
    return indirectChildren;
}
