import React from 'react';

const Document = ({ documentId, content }) => {
    return (
        <div className='m-6 rounded-lg'>
            <p className='border-l-zinc-950 rounded-lg p-5 card h-auto w-96 text-sm bg-gray-800 text-white'>{content}</p>
        </div>
    );
};

export default Document;