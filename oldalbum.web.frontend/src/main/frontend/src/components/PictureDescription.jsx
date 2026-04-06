import { useState } from 'react';
import { useSelector } from 'react-redux';
import { usePostModifypictureMutation } from '../api';
import { datePartOfDateTime, replaceDateAndKeepTime } from '../isodate';

function PictureDescription(props) {
    const { className, item, metadata } = props;
    const [isEditingLastModified, setIsEditingLastModified] = useState(false);
    const canModifyAlbum = useSelector(state => state.canModifyAlbum);
    const loggedIn = useSelector(state => state.loggedIn);
    const editMode = useSelector(state => state.editMode);
    const editable = canModifyAlbum && loggedIn && editMode;
    const [ postModifypicture ] = usePostModifypictureMutation();
    const onSaveDescription = async (e) => {
        if (e.key === 'Enter') {
            await postModifypicture({ ...item, description: e.target.innerText });
            e.target.blur();
        }
    }
    const lastModified = item.lastModified ? datePartOfDateTime(item.lastModified) : '';
    const handleLastModifiedEditClick = () => {
        setIsEditingLastModified(true);
    }
    const handleLastModifiedBlur = () => {
        setIsEditingLastModified(false);
    }
    const onSaveLastModified = async (e) => {
        await postModifypicture({ ...item, lastModified: replaceDateAndKeepTime(item.lastModified, e.target.value) });
    }

    if (!item.description && !metadata) {
        return null;
    }

    return (
        <div className={className}>
            <div className="alert alert-primary d-flex justify-content-center" role="alert">
                <span contentEditable={editable} onKeyDown={onSaveDescription}>{item.description}</span>
                &nbsp;
                <span onClick={handleLastModifiedEditClick}>
                    {editable && isEditingLastModified ? (
                        <input
                            type="date"
                            value={lastModified}
                            onChange={onSaveLastModified}
                            onBlur={handleLastModifiedBlur}
                        />
                    ) : (
                        <span>{metadata}</span>
                    )}
                </span>
            </div>
        </div>
    );
}

export default PictureDescription;
