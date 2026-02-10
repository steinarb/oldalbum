import React from 'react';
import { useSelector } from 'react-redux';
import { usePostModifypictureMutation } from '../api';

function PictureDescription(props) {
    const { className, item, metadata } = props;
    const canModifyAlbum = useSelector(state => state.canModifyAlbum);
    const loggedIn = useSelector(state => state.loggedIn);
    const editMode = useSelector(state => state.editMode);
    const editable = canModifyAlbum && loggedIn && editMode;
    const [ postModifypicture ] = usePostModifypictureMutation();
    const onSaveDescription = async (e) =>
          {
              if (e.key === 'Enter') {
                  await postModifypicture({ ...item, description: e.target.innerText });
                  e.target.blur();
              }
          }

    if (!item.description && !metadata) {
        return null;
    }

    return (
        <div className={className}>
            <div className="alert alert-primary d-flex justify-content-center" role="alert">
                <span contentEditable={editable} onKeyDown={onSaveDescription}>{item.description}</span>
                {metadata}
            </div>
        </div>
    );
}

export default PictureDescription;
