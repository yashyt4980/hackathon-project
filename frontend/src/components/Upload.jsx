import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';

const Upload = () => {
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER}api/enrich`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('user__token')}`,
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      setResponse(data.enrichedText);
      toast.success('Text uploaded successfully!');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to upload text.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(response);
  }, [response]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <Toaster />
      <h1 className="text-4xl font-bold mb-6 text-gray-800 transform transition-transform duration-500 hover:scale-110">Writer's Page</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <input
          type="text"
          value={text}
          onChange={handleInputChange}
          className="w-full p-4 mb-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
          placeholder="Enter your text here"
        />
        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-transform duration-300 transform hover:scale-105"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="spinner-border animate-spin inline-block w-5 h-5 border-4 rounded-full text-white"></div>
              <span className="ml-3">Loading...</span>
            </div>
          ) : (
            'Upload'
          )}
        </button>
      </form>
      {response && (
        <div className="mt-8 p-6 bg-white rounded-lg shadow-lg w-full max-w-md transform transition-transform duration-500 hover:scale-105">
          <p className="mb-4 text-lg text-gray-700">{response}</p>
          <button
            onClick={() => {
              navigator.clipboard.writeText(response);
              navigate('/createDocument');
            }}
            className="w-full py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-transform duration-300 transform hover:scale-105"
          >
            Copy text and edit in collaboration
          </button>
        </div>
      )}
    </div>
  );
};

export default Upload;
