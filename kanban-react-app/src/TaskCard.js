import React from 'react';

function TaskCard({ task }) { // Changed props to accept full task object
  const handleDragStart = (event) => {
    event.dataTransfer.setData("taskId", task.id);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      id={task.id}
      className="task-card"
      draggable="true"
      onDragStart={handleDragStart} // Added onDragStart handler
    >
      <p>{task.text}</p>
    </div>
  );
}

export default TaskCard;
