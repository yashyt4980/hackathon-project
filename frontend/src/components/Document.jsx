import React from 'react';

const Document = ({ documentId, content }) => {
    return (
        <div className="card">
            <p>{content}</p>
        </div>
    );
};

export default Document;