import React, { useState } from 'react';
import Amplify, { Storage, API } from 'aws-amplify';
import awsconfig from './aws-exports';
import './App.css';

// Configure Amplify with the aws-exports.js configuration
Amplify.configure(awsconfig);

function App() {
  const [inputText, setInputText] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleTextChange = (event) => {
    setInputText(event.target.value);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log('Selected file:', event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert('Please select a file.');
      return;
    }

    console.log('Submitting form with inputText:', inputText);
    console.log('Submitting form with selectedFile:', selectedFile);

    try {
      // Ensure the file is read correctly
      const fileArrayBuffer = await selectedFile.arrayBuffer();
      console.log('File array buffer byte length:', fileArrayBuffer.byteLength);

      // Upload the file to S3
      const s3Key = `uploadfilejson/${selectedFile.name}`;
      console.log('Uploading file to S3 with key:', s3Key);
      await Storage.put(s3Key, selectedFile, {
        contentType: selectedFile.type,
      });

      // Call the API to save data in DynamoDB
      const apiName = 'FileUploadAPI'; // Replace with your API Gateway name
      const path = '/upload'; // Replace with your API Gateway path
      const myInit = {
        body: {
          id: '1',
          input_text: inputText,
          input_file_path: s3Key,
        },
      };

      console.log('Calling API with data:', myInit);
      await API.post(apiName, path, myInit);
      alert('File uploaded successfully.');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file. Please try again.');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>File Upload App</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Text input:
            <input type="text" value={inputText} onChange={handleTextChange} />
          </label>
          <label>
            File input:
            <input type="file" onChange={handleFileChange} />
          </label>
          <button type="submit">Submit</button>
        </form>
      </header>
    </div>
  );
}

export default App;
