import React from 'react';

const Document = ({ content }) => {
    return (
        <div className="max-w-xs w-full bg-gray-800 text-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
            <p className="text-sm">{content}</p>
        </div>
    );
};

export default Document;
