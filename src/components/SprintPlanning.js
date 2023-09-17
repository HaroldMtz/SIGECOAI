import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

function SprintPlanning() {
  const [sprints, setSprints] = useState(() => {
    const storedSprints = localStorage.getItem('sprints');
    return storedSprints ? JSON.parse(storedSprints) : [];
  });

  const [newSprint, setNewSprint] = useState({
    startDate: '',
    endDate: '',
    tasks: '',
  });

  const [selectedSprintIndex, setSelectedSprintIndex] = useState(null);

  const handleSprintChange = (event) => {
    const { name, value } = event.target;
    setNewSprint({
      ...newSprint,
      [name]: value,
    });
  };

  const handleAddSprint = () => {
    setSprints([...sprints, newSprint]);
    setNewSprint({
      startDate: '',
      endDate: '',
      tasks: '',
    });
  };

  const handleEditSprint = () => {
    if (selectedSprintIndex !== null) {
      const updatedSprints = [...sprints];
      updatedSprints[selectedSprintIndex] = newSprint;
      setSprints(updatedSprints);
      setSelectedSprintIndex(null);
      setNewSprint({
        startDate: '',
        endDate: '',
        tasks: '',
      });
    }
  };

  const handleDeleteSprint = () => {
    if (selectedSprintIndex !== null) {
      const updatedSprints = sprints.filter((_, index) => index !== selectedSprintIndex);
      setSprints(updatedSprints);
      setSelectedSprintIndex(null);
      setNewSprint({
        startDate: '',
        endDate: '',
        tasks: '',
      });
    }
  };

  const generateAndDownloadFile = () => {
    const fileContent = sprints.map((sprint, index) => {
      return `Sprint ${index + 1}:\nFecha de inicio: ${sprint.startDate}\nFecha de finalización: ${sprint.endDate}\nTareas: ${sprint.tasks}\n\n`;
    }).join('\n');

    const blob = new Blob([fileContent], { type: 'text/plain' });
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'sprints.txt';

    downloadLink.click();
  };

  useEffect(() => {
    localStorage.setItem('sprints', JSON.stringify(sprints));
  }, [sprints]);

  const events = sprints.map((sprint, index) => ({
    id: index,
    title: `Sprint ${index + 1}`,
    start: new Date(sprint.startDate),
    end: new Date(sprint.endDate),
  }));

  return (
    <div className="SprintPlanning">
      <h2>Sprint Planning</h2>
      
      <form>
  <label htmlFor="startDate">Fecha de inicio:</label>
  <input
    type="date"
    name="startDate"
    id="startDate"
    value={newSprint.startDate}
    onChange={handleSprintChange}
  />
  <br />

  <label htmlFor="endDate">Fecha de finalización:</label>
  <input
    type="date"
    name="endDate"
    id="endDate"
    value={newSprint.endDate}
    onChange={handleSprintChange}
  />
  <br />

  <label htmlFor="tasks">Tareas:</label>
  <textarea
    name="tasks"
    id="tasks"
    value={newSprint.tasks}
    onChange={handleSprintChange}
  />
  <br />

  {selectedSprintIndex === null ? (
    <button type="button" onClick={handleAddSprint}>
      Agregar Sprint
    </button>
  ) : (
    <div>
      <button type="button" onClick={handleEditSprint}>
        Guardar Cambios
      </button>
      <button type="button" onClick={handleDeleteSprint}>
        Eliminar Sprint
      </button>
    </div>
  )}
</form>


      <div>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          className="custom-calendar" // Aplica los estilos específicos de SprintPlanning
          defaultView="month"
          onSelectEvent={(event) => {
            setSelectedSprintIndex(event.id);
            setNewSprint(sprints[event.id]);
          }}
        />
      </div>

      <h3>Lista de Sprints</h3>
      <ul>
        {sprints.map((sprint, index) => (
          <li key={index}>
            Sprint {index + 1}: {sprint.startDate} - {sprint.endDate}
          </li>
        ))}
      </ul>
      <button className="download-button" onClick={generateAndDownloadFile}>
        Generar y Descargar Archivo
      </button>
    </div>
  );
}

export default SprintPlanning;
