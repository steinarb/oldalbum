import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectPicture, unselectPicture } from '../reducers/selectedentriesSlice';

export default function PictureCheckbox(props) {
    const { entry, className='' } = props;
    const pictureIsSelected = useSelector(state => state.selectedentries.findIndex(e => e.id === entry.id) > -1);
    const dispatch = useDispatch();
    const completeClassName = className + ' picture-checkbox';

    return (
        <input type="checkbox" className={completeClassName} checked={pictureIsSelected} onChange={e => e.target.checked ? dispatch(selectPicture(entry)) : dispatch(unselectPicture(entry))}/>
    );
}
