import React from 'react';

const ShowDocs = ({ documentId, content }) => {
    return (
        <div className="card">
            <p>{content}</p>
        </div>
    );
};

export default ShowDocs;