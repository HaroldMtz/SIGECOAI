import React, { useState } from 'react';
import './App.css';
import ProjectNameForm from './components/ProjectNameForm';
import SprintPlanning from './components/SprintPlanning';

function App() {
  const [projectName, setProjectName] = useState('');

  const handleProjectNameSave = (name) => {
    setProjectName(name);
  };

  return (
    <div className="App">
      {projectName ? (
        <div className="saved-project-name">
          {projectName}
        </div>
      ) : (
        <ProjectNameForm onSave={handleProjectNameSave} />
      )}

      <SprintPlanning />
    </div>
  );
}

export default App;
