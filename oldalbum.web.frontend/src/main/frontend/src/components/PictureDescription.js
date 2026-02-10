import React from 'react';

function PictureDescription(props) {
    const { className, item, metadata } = props;

    if (!item.description && !metadata) {
        return null;
    }

    return (
        <div className={className}>
            <div className="alert alert-primary d-flex justify-content-center" role="alert">{item.description} {metadata}</div>
        </div>
    );
}

export default PictureDescription;
