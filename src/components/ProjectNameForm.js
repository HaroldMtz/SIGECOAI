import React, { useState } from 'react';
import '../App.css'; // Importar primero tus estilos globales

function ProjectNameForm() {
  const [projectName, setProjectName] = useState('');
  const [isNameProvided, setIsNameProvided] = useState(false);

  const handleProjectNameChange = (event) => {
    setProjectName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsNameProvided(true);
  };

  return (
    <div className="ProjectNameForm">
      {/* Mostrar el formulario solo si el nombre aún no se ha proporcionado */}
      {!isNameProvided ? (
        <div>
          <h2>Nombre del Proyecto</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="projectName">Nombre del Proyecto:</label>
            <input
              type="text"
              name="projectName"
              id="projectName"
              value={projectName}
              onChange={handleProjectNameChange}
            />
            <button type="submit">Guardar</button>
          </form>
        </div>
      ) : null}

      {/* Mostrar el nombre del proyecto si se ha proporcionado */}
      {isNameProvided && (
        <div>
          <p>{projectName}</p>
        </div>
      )}
    </div>
  );
}

export default ProjectNameForm;
