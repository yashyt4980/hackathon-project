import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import Document from './Document';

function ShowDocuments() {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchDocuments() {
            const response = await axios.get(`${import.meta.env.VITE_SERVER}api/getDocs`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('user__token')}`
                }
            });
            setDocuments(response.data.documents);
            setLoading(false);
        }
        fetchDocuments();
    }, []);

    useEffect(() => {
        console.log(documents);
    }, [documents]);

    const handleLogout = () => {
        localStorage.removeItem('user__token');
        navigate('/login');
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-center">Top Stories</h1>
                <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700">
                    Logout
                </button>
            </div>
            <div className="flex flex-wrap justify-center gap-8">
                {documents.map((document) => (
                    <Document key={document._id} content={document.data.ops[0].insert} />
                ))}
            </div>
        </div>
    );
}

export default ShowDocuments;