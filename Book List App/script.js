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

// 2c) Clear fields
UI.prototype.clearFields = function () {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
};

// ------------------B) Event Listeners-----------------
//Submit Listener
document.getElementById('book-form').addEventListener('submit', function (e) {
  // Get entered values
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const isbn = document.getElementById('isbn').value;

  // Instantiate book
  const book = new Book(title, author, isbn);

  // Instantiate UI
  const ui = new UI();

  // Add book to list
  ui.addBookToList(book);

  // Clear fields
  ui.clearFields();

  e.preventDefault();
});
