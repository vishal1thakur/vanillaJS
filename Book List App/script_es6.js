// -----------------------A) Classes---------------------------
// 1) Book class
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// 2) UI class
class UI {
  // 2b) Add Book to list
  addBookToList(book) {
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
  }
  // 2c) Show alert
  showAlert(message, className) {
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
  }
  // 2d) Delete Book
  deleteBook(target) {
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }
  // 2e) Clear fields
  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}

// 2c) Local Storage
class Store {
  // Create/Receive books array from LS
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }
  // Display added book entries on UI from LS
  static displayBooks() {
    // Create/Receive books array from LS
    const books = Store.getBooks();
    // Loop through the books array
    books.forEach(function (book) {
      // Instantiate UI
      const ui = new UI();
      // Add book to ui
      ui.addBookToList(book);
    });
  }
  // Add book entries to LS
  static addBook(book) {
    // Create/Receive books array from LS
    const books = Store.getBooks();
    // Add book to books
    books.push(book);
    // Set LS back
    localStorage.setItem('books', JSON.stringify(books));
  }
  //
  static removeBook(isbn) {
    // Create/Receive books array from LS
    const books = Store.getBooks();
    // Loop through the books array
    books.forEach(function (book, index) {
      // if isbn matches, delete it
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
      // Set LS back
      localStorage.setItem('books', JSON.stringify(books));
    });
  }
}

// ------------------B) Event Listeners-----------------
// 0) On page loading - DOM oad event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

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
    // Save to LS
    Store.addBook(book);
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
  // Remove from LS
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  // Show alert
  ui.showAlert('Book Removed!', 'success');

  e.preventDefault();
});
