import React from 'react';
import TaskCard from './TaskCard';

// Added onDragOver and onDrop props
function Column({ title, tasks, onAddTask, onDragOver, onDrop }) {
  const handleButtonClick = () => {
    if (onAddTask) {
      const taskText = window.prompt('Enter task text:');
      if (taskText) { // Check if the user entered text
        onAddTask(taskText);
      }
    }
  };

  return (
    <div className="column">
      <h2>{title}</h2>
      {/* Added onDragOver and onDrop event handlers to the tasks container */}
      <div
        className="tasks"
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} /> // Pass full task object
        ))}
      </div>
      {title === 'To Do' && (
        <button className="add-task" onClick={handleButtonClick}>+ Add Task</button>
      )}
    </div>
  );
}

export default Column;
