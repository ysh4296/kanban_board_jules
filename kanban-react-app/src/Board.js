import React, { useState } from 'react';
import Column from './Column';

function Board() {
  // Hardcoded initial tasks
  const [tasks, setTasks] = useState([
    { id: 'task-1', text: 'Example Task 1', status: 'todo' },
    { id: 'task-2', text: 'Example Task 2', status: 'todo' },
    { id: 'task-3', text: 'Example Task 3', status: 'in-progress' },
    { id: 'task-4', text: 'Example Task 4', status: 'done' },
  ]);

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  const handleAddTask = (taskText) => {
    if (!taskText) return; // Do not add empty tasks

    const newTask = {
      id: `task-${Date.now()}`, // Simple unique ID
      text: taskText,
      status: 'todo', // Default status for new tasks
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const handleDragOver = (event) => {
    event.preventDefault(); // Necessary to allow dropping
  };

  const handleDrop = (event, targetStatus) => {
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
