import React from 'react';
import { useSelector } from 'react-redux';
import { usePostMovealbumentrydownMutation } from '../api';
import ChevronRight from './bootstrap/ChevronRight';

export default function RightButton(props) {
    const { item, className='' } = props;
    const showEditControls = useSelector(state => state.showEditControls);
    const albumchildcount = useSelector(state => (state.albumentries[item.parent] || {}).childcount || 0);
    const [ postMovealbumentrydown ] = usePostMovealbumentrydownMutation();
    const onClicked = async () => await postMovealbumentrydown(item);

    // Button doesn't show up if: 1. edit not allowed, 2: this is the last entry in the album
    if (!showEditControls || item.sort >= albumchildcount) {
        return null;
    }

    return(
        <div className={className} onClick={onClicked}>
            <ChevronRight/>
        </div>
    );
}
