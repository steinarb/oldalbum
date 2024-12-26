import React from 'react';
import { useSelector } from 'react-redux';
import { usePostMovealbumentryupMutation } from '../api';
import ChevronLeft from './bootstrap/ChevronLeft';

export default function LeftButton(props) {
    const { item, className='' } = props;
    const showEditControls = useSelector(state => state.showEditControls);
    const [ postMovealbumentryup ] = usePostMovealbumentryupMutation();
    const onClicked = async () => await postMovealbumentryup(item);

    // Button doesn't show up if: 1. edit not allowed, 2: this is the first entry in the album
    if (!showEditControls || item.sort < 2) {
        return null;
    }

    return(
        <div className={className} onClick={onClicked}>
            <ChevronLeft/>
        </div>
    );
}
