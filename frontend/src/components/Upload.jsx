import React, { useEffect, useState } from 'react';
import { useInRouterContext, useNavigate } from 'react-router-dom';

const Upload = () => {
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [response, setResponse] = useState('');

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER}api/enrich`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('user__token')}` 
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      // console.log(data.enrichedText);
      setResponse(data.enrichedText);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    console.log(response)
  }, [response]);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={text} onChange={handleInputChange} />
        <button type="submit">Upload</button>
      </form>
      <div>{response}</div>
      <button onClick={() => {
        navigator.clipboard.writeText(response);
        navigate("/createDocument");
      }}>Copy text and edit in collaboration</button>
    </div>
  );
};

export default Upload;