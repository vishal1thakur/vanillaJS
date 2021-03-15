// Define UI Variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//------------- A) Load all event listeners--------------

loadEventListeners();

//------------- B) All event listeners Function ----

function loadEventListeners() {
  // 1) Add task event
  form.addEventListener('submit', addTask);
  // 2) Remove task event
  taskList.addEventListener('click', removeTask);
  // 3) Clear Task Event - All
  clearBtn.addEventListener('click', clearTasks);
}

//-------------- C) Callback functions ------------------

// 1) Add Task
function addTask(e) {
  // For empty entry
  if (taskInput.value === '') {
    alert('Add a Task');
  }

  // For a new entry
  // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  // Create a text node on li and append
  li.appendChild(document.createTextNode(taskInput.value));
  // Create a new link element
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-item secondary-content';
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append link to li
  li.appendChild(link);
  // Append li to ul
  taskList.appendChild(li);
  // Clear Task field
  taskInput.value = '';

  e.preventDefault();
}

// 2) Remove Task
function removeTask(e) {
  // Event delegation - if the element being clicked (X icon) contains a parent element with class 'delete-item' => link
  if (e.target.parentElement.classList.contains('delete-item')) {
    // Show a confirmation window
    if (confirm('Do you want to remove this entry?')) {
      // Remove the elements parents parent => entire list entry
      e.target.parentElement.parentElement.remove();
    }
  }
}

// 3) Clear Task Event - All
function clearTasks() {
  // Method 1 - This is slower
  // taskList.innerHTML = '';
  // Method 2 - This is faster (jsperform)
  // Ask confirmation
  if (confirm('Do you want to clear your entire list?')) {
    // while tasklist has a firstchild remove it
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
  }
}
