import React from 'react';
import TaskCard from './TaskCard';
import { Task } from './Board'; // Import Task interface from Board.tsx

interface ColumnProps {
  title: string;
  tasks: Task[];
  onAddTask?: (taskText: string) => void;
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
}

const Column: React.FC<ColumnProps> = ({ title, tasks, onAddTask, onDragOver, onDrop }) => {
  const handleButtonClick = () => {
    if (onAddTask) {
      const taskText = window.prompt('Enter task text:');
      // Ensure taskText is not null and not just whitespace
      if (taskText && taskText.trim() !== "") {
        onAddTask(taskText.trim());
      }
    }
  };

  return (
    <div className="column">
      <h2>{title}</h2>
      <div
        className="tasks"
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
      {title === 'To Do' && onAddTask && (
        <button className="add-task" onClick={handleButtonClick}>+ Add Task</button>
      )}
    </div>
  );
}

export default Column;
