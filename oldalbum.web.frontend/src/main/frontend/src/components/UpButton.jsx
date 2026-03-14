import React from 'react';
import { useSelector } from 'react-redux';
import { usePostMovealbumentryupMutation } from '../api';

export default function UpButton(props) {
    const { item } = props;
    const showEditControls = useSelector(state => state.showEditControls);
    const [ postMovealbumentryup ] = usePostMovealbumentryupMutation();
    const onClicked = async () => await postMovealbumentryup(item);

    // Button doesn't show up if: 1. edit not allowed, 2: this is the first entry in the album
    if (!showEditControls || item.sort < 2) {
        return null;
    }

    return(
        <div className={props.className} onClick={onClicked}>
            <span className="oi oi-chevron-top" title="chevron top" aria-hidden="true"></span>
        </div>
    );
}
