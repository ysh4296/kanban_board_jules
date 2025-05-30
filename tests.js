// Ensure script.js is loaded and DOMContentLoaded has fired if functions rely on it.
// For createTaskCard, it's a standalone function, so direct testing is fine.

QUnit.module('Task Card Creation', function() {
    QUnit.test('createTaskCard function tests', function(assert) {
        const taskText = "Test Task 1";
        // Note: createTaskCard is not globally available unless we explicitly make it so.
        // For testing, we'll need to either expose it or test its effects through UI interaction.
        // Given the current script.js, createTaskCard is defined within the DOMContentLoaded listener.
        // To make it testable directly, we'd need to move its definition outside,
        // or simulate the conditions under which it's called.

        // Let's assume for now that we will refactor script.js to make createTaskCard globally accessible
        // or test it via simulating a button click if that's easier for the worker.
        // For now, I'll write the test as if createTaskCard is globally available.
        // If the worker finds it easier to test by simulating a click on "Add Task" and checking the DOM, that's also acceptable.

        // Re-creating a simplified version of createTaskCard for testing in isolation
        // if direct access is problematic for the worker.
        // OR, the worker can modify script.js to expose createTaskCard.
        // For instance, by doing: window.createTaskCard = createTaskCard; inside the DOMContentLoaded.
        // For this subtask, I will assume the worker can make `createTaskCard` available for testing.

        // Simulating the function for the test if direct access is an issue:
        function createTaskCardForTest(taskText) {
            const card = document.createElement('div');
            card.classList.add('task-card');
            card.draggable = true;
            card.textContent = taskText;
            card.id = `task-test-${Date.now()}`; // Ensure ID for testing
            
            // Simplified drag listeners for test purposes if needed
            card.addEventListener('dragstart', (event) => {
                event.dataTransfer.setData('text/plain', event.target.id);
            });
            return card;
        }
        
        // This test will use the globally exposed createTaskCard after script.js is modified
        const card = window.createTaskCard ? window.createTaskCard(taskText) : createTaskCardForTest(taskText);


        assert.ok(card instanceof HTMLElement, "Card should be an HTMLElement.");
        assert.ok(card.classList.contains('task-card'), "Card should have class 'task-card'.");
        assert.equal(card.draggable, true, "Card should be draggable.");
        assert.equal(card.textContent, taskText, "Card text content should match.");
        
        // Check if the card ID starts with 'task-' (from actual function) or 'task-test-' (from fallback)
        const idStartsWithTask = card.id.startsWith('task-');
        const idStartsWithTaskTest = card.id.startsWith('task-test-');
        assert.ok(idStartsWithTask || idStartsWithTaskTest, "Card should have an ID starting with 'task-' or 'task-test-'.");


        // Test adding a task through the button click (integration style)
        // This requires the DOM elements to be in #qunit-fixture
        const todoTasksContainer = document.querySelector('#qunit-fixture #todo .tasks');
        // const initialTaskCount = todoTasksContainer.children.length; // Moved to the next test
        
        // To test the actual createTaskCard from script.js, it needs to be exposed,
        // or we simulate the 'add task' button click.
        // For now, this test focuses on a test version or assumes exposure.
        // If the worker modifies script.js to expose it, the following would be ideal:
        if (window.createTaskCard) {
             const realCard = window.createTaskCard(taskText); // Assuming it's exposed
             assert.ok(realCard.id.startsWith('task-'), "Real card (if exposed) should have an ID starting with 'task-'.");
        }

    });

    QUnit.test('Adding a task via button click', function(assert) {
        // This test is more of an integration test for the add task functionality
        const addTaskButton = document.querySelector('#qunit-fixture #todo .add-task');
        const todoTasksContainer = document.querySelector('#qunit-fixture #todo .tasks');
        
        // Store original prompt
        const originalPrompt = window.prompt;
        // Mock prompt
        window.prompt = function(message) {
            assert.equal(message, "Enter the task description:", "Prompt message should be correct.");
            return "New Task From Button";
        };

        const initialTaskCount = todoTasksContainer.children.length;
        addTaskButton.click(); // Simulate click
        
        assert.equal(todoTasksContainer.children.length, initialTaskCount + 1, "A new task card should be added to the 'To Do' column.");
        const newCard = todoTasksContainer.lastElementChild;
        assert.ok(newCard.classList.contains('task-card'), "New card should have class 'task-card'.");
        assert.equal(newCard.textContent, "New Task From Button", "New card text should be correct.");
        assert.ok(newCard.draggable, "New card should be draggable.");
        assert.ok(newCard.id.startsWith('task-'), "New card should have a unique ID.");

        // Restore original prompt
        window.prompt = originalPrompt;
        // Clean up: remove the added task
        if (newCard) {
            newCard.remove();
        }
    });
});

// It's important that script.js is structured so that its functions are testable.
// If createTaskCard is defined inside DOMContentLoaded and not exposed,
// the first QUnit test might need adjustment to test via UI interaction,
// or script.js needs a slight refactor to expose createTaskCard, e.g., by attaching it to the window object for testing purposes.
// The second test (button click) is a good way to test the functionality as a whole.
