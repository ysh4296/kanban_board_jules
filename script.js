document.addEventListener('DOMContentLoaded', () => {
    const addTaskButton = document.querySelector('#todo .add-task');
    const todoTasksContainer = document.querySelector('#todo .tasks');

    // Function to create a new task card
    function createTaskCard(taskText) {
        const card = document.createElement('div');
        card.classList.add('task-card');
        card.draggable = true; // Make the card draggable
        card.textContent = taskText;

        // Add drag start event listener
        card.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', event.target.id); // Store card ID
            event.target.style.opacity = '0.5'; // Make it semi-transparent while dragging
            // We'll need a unique ID for each card to properly handle drops
            if (!event.target.id) {
                event.target.id = `task-${Date.now()}`;
            }
            event.dataTransfer.setData('text/plain', event.target.id);
        });

        // Add drag end event listener
        card.addEventListener('dragend', (event) => {
            event.target.style.opacity = '1'; // Reset opacity
        });
        
        // Add a unique ID to the card for drag and drop
        if (!card.id) {
            card.id = `task-${Date.now()}`;
        }

        return card;
    }
    window.createTaskCard = createTaskCard; // Expose function for testing

    // Event listener for adding a new task
    if (addTaskButton) {
        addTaskButton.addEventListener('click', () => {
            const taskText = prompt("Enter the task description:");
            if (taskText && taskText.trim() !== "") {
                const newCard = createTaskCard(taskText.trim());
                if (todoTasksContainer) {
                    todoTasksContainer.appendChild(newCard);
                } else {
                    console.error("To Do tasks container not found!");
                }
            }
        });
    } else {
        console.error("Add task button in To Do column not found!");
    }

    // Add drag and drop functionality to columns
    const columns = document.querySelectorAll('.column .tasks');
    columns.forEach(column => {
        column.addEventListener('dragover', (event) => {
            event.preventDefault(); // Allow dropping
            // Optionally, add some visual feedback for droppable area
            column.classList.add('drag-over'); 
        });

        column.addEventListener('dragleave', (event) => {
            // Remove visual feedback
            column.classList.remove('drag-over');
        });

        column.addEventListener('drop', (event) => {
            event.preventDefault();
            column.classList.remove('drag-over');
            const cardId = event.dataTransfer.getData('text/plain');
            const draggableElement = document.getElementById(cardId);
            if (draggableElement && event.currentTarget.classList.contains('tasks')) {
                event.currentTarget.appendChild(draggableElement);
            }
        });
    });
});
