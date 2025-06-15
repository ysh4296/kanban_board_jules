import React, { useState } from 'react';
import Column from './Column';
// TaskCard is used by Column, Board doesn't need to import it directly if types are handled.

// Define TaskStatus and Task interface centrally in Board.tsx
export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface Task {
  id: string; // Standardize to string for consistency, Date.now() can be converted
  text: string;
  status: TaskStatus;
}

const initialTasks: Task[] = [
  { id: 'task-1', text: 'Example Task 1', status: 'todo' },
  { id: 'task-2', text: 'Example Task 2', status: 'todo' },
  { id: 'task-3', text: 'Example Task 3', status: 'in-progress' },
  { id: 'task-4', text: 'Example Task 4', status: 'done' },
];

const Board: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const getTasksByStatus = (status: TaskStatus): Task[] => {
    return tasks.filter(task => task.status === status);
  };

  const handleAddTask = (taskText: string): void => {
    if (!taskText) return;

    const newTask: Task = {
      id: `task-${Date.now()}`,
      text: taskText,
      status: 'todo',
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>, targetStatus: TaskStatus): void => {
    event.preventDefault();
    const taskId = event.dataTransfer.getData("taskId");

    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, status: targetStatus } : task
      )
    );
  };

  return (
    <div className="kanban-board">
      <Column
        title="To Do"
        tasks={getTasksByStatus('todo')}
        onAddTask={handleAddTask}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, 'todo')}
      />
      <Column
        title="In Progress"
        tasks={getTasksByStatus('in-progress')}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, 'in-progress')}
      />
      <Column
        title="Done"
        tasks={getTasksByStatus('done')}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, 'done')}
      />
    </div>
  );
}

export default Board;
