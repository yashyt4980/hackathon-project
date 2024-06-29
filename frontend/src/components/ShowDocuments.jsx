import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Loader from './Loader';
import Document from './Document';

function ShowDocuments() {
const [documents, setDocuments] = useState([]);
const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function fetchDocuments() {
            const response = await axios.get(`${import.meta.env.VITE_SERVER}api/getDocs`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('user__token')}`
                }
            });
            // console.log(response.data.documents);
            setDocuments(response.data.documents);
            setLoading(false);
        }
        fetchDocuments();
    }, []);

    useEffect(() => {
        console.log(documents);
    },[documents]);
  return (
    <div>
        {
            documents?.map((document) => {
                // document.data.ops.length > 0 ? document.data.ops[0].insert = document.data.ops[0].insert.replace(/\n/g, '<br>') : undefined
                return <Document key={document._id} content={document.data.ops[0].insert}></Document>
            })
        }
    </div>
  )
}

export default ShowDocuments