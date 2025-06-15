import React from 'react';
import { Task } from './Board'; // Import Task from Board.tsx

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("taskId", task.id); // task.id is already string from Board's Task interface
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      id={task.id}
      className="task-card"
      draggable="true"
      onDragStart={handleDragStart}
    >
      <p>{task.text}</p>
    </div>
  );
}

export default TaskCard;
