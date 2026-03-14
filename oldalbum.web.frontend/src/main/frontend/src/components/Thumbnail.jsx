import React from 'react';
import { NavLink } from 'react-router';
import ThumbnailImg from './ThumbnailImg';

export default function Thumbnail(props) {
    const { entry, className='' } = props;

    return (
        <div className={className}>
            <NavLink to={entry.path}>
                <ThumbnailImg entry={entry} />
            </NavLink>
        </div>
    );
}
