import './App.css';
import React, { useState } from 'react';
import QuestionForm from './components/questionForm.js';
import Result from './components/result.js';
import TopBar from './components/topBar.js';
 
const App = () => {
  const [ apiData, setApiData ] = useState(null)
  const setParentState = (data) => {
    setApiData(data)
  }

  return (
    <div className="background"  >
      <TopBar />
      
      <br/>
      <br/>
      { apiData === null ? null : <Result apiData={apiData}/>}
      {apiData === null ? <QuestionForm setParentState={setParentState}/> : null}
      <p></p>
    </div>
  );
};

export default App;