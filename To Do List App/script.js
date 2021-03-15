// Define UI Variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//------------- A) Load all event listeners--------------

loadEventListeners();

//------------- B) All event listeners Function ---------

function loadEventListeners() {
  // 1) Add task event
  form.addEventListener('submit', addTask);
  // 2) Remove task event
  taskList.addEventListener('click', removeTask);
  // 3) Clear Task Event - All
  clearBtn.addEventListener('click', clearTasks);
  // 4) Filter Task Events
  filter.addEventListener('keyup', filterTasks);
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

// 4) Filter Tasks
function filterTasks(e) {
  // Assing value being entere to text
  const text = e.target.value.toLowerCase();
  // ForEach for all the entries in the list
  document.querySelectorAll('.collection-item').forEach(
    // Create function to check each task to the entered value
    function (task) {
      // Assign the list items to a variable
      const item = task.firstChild.textContent;
      // if item is = to indexof text => display - block
      // -1 returns no match
      if (item.toLowerCase().indexOf(text) != -1) {
        task.style.display = 'block';
      } else {
        // else display - none
        task.style.display = 'none';
      }
    }
  );
}
