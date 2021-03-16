// ------------------A) Constructors---------------------
// 1) Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// 2a) UI Constructor
function UI() {}

// 2b) Add Book to list
UI.prototype.addBookToList = function (book) {
  // Get the element
  const list = document.getElementById('book-list');
  // Create tr element
  const row = document.createElement('tr');
  // Add book values to tr
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X<a></td>
  `;
  //Append row to list
  list.appendChild(row);
};

// 2c) Show alert
UI.prototype.showAlert = function (message, className) {
  // Create an empty div
  const div = document.createElement('div');
  // Add class on div
  div.className = `alert ${className}`;
  // Add a text node to div
  div.appendChild(document.createTextNode(message));
  // Get container
  const container = document.querySelector('.container');
  // Get form
  const form = document.querySelector('#book-form');
  // insert div before form
  container.insertBefore(div, form);
  // Make the alert dissapear after 3 seconds
  setTimeout(function () {
    document.querySelector('.alert').remove();
  }, 3000);
};

// 2d) Delete Book
UI.prototype.deleteBook = function (target) {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
};

// 2e) Clear fields
UI.prototype.clearFields = function () {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
};

// ------------------B) Event Listeners-----------------
// 1) Add Book - Submit Listener
document.getElementById('book-form').addEventListener('submit', function (e) {
  // Get entered values
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const isbn = document.getElementById('isbn').value;

  // Instantiate book
  const book = new Book(title, author, isbn);

  // Instantiate UI
  const ui = new UI();

  // Validate
  if (title === '' || author === '' || isbn === '') {
    // Error alert
    ui.showAlert('Please fill in all the fields', 'error');
  } else {
    // Add book to list
    ui.addBookToList(book);
    // Show success
    ui.showAlert('Book Added!', 'success');
    // Clear fields
    ui.clearFields();
  }

  e.preventDefault();
});

// 2) Remove book entry (X)
document.getElementById('book-list').addEventListener('click', function (e) {
  // Instantiate UI
  const ui = new UI();
  // Remove book entry
  ui.deleteBook(e.target);
  // Show alert
  ui.showAlert('Book Removed!', 'success');

  e.preventDefault();
});
