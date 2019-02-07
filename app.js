// Book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI constructor
function UI() {}

// Add book to list
UI.prototype.addBookToList = function(book) {
  const list = document.getElementById("book-list");

  // Create table row element
  const row = document.createElement("tr");
  // Insert cols
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X</a></td>
  `;
  list.appendChild(row);
};

// Show Alert
UI.prototype.showAlert = function(message, className) {
  // Create a div
  const div = document.createElement("div");
  // Add classes
  div.className = `alert ${className}`;
  // Add text
  div.appendChild(document.createTextNode(message));
  // Insert in the DOM
  document
    .querySelector(".container")
    .insertBefore(div, document.getElementById("book-form"));

  // Timeout after 3 seconds
  setTimeout(function() {
    document.querySelector(".alert").remove();
  }, 3000);
};

// Delete book
UI.prototype.deleteBook = function(target) {
  target.parentElement.parentElement.remove();
};

// Clear fields
UI.prototype.clearFields = function() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

// Local Storage

// Store constructor
function Store() {}

// Store methods
Store.prototype.getBooks = function() {
  let books;
  if (localStorage.getItem("books") === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem("books"));
  }
  return books;
};

Store.prototype.displayBooks = function() {
  const books = Store.prototype.getBooks();

  for (let i = 0; i < books.length; i++) {
    const ui = new UI();

    // Add book to UI
    ui.addBookToList(books[i]);
  }
};

Store.prototype.addBook = function(book) {
  const books = Store.prototype.getBooks();

  books.push(book);

  localStorage.setItem("books", JSON.stringify(books));
};

Store.prototype.removeBook = function(target) {
  const isbn = target.parentElement.previousElementSibling.textContent;
  const books = Store.prototype.getBooks();
  for (let i = 0; i < books.length; i++) {
    if (books[i].isbn === isbn) {
      books.splice(books[i], 1);
    }
  }
  localStorage.setItem("books", JSON.stringify(books));
};

// Event Listener for DOM Load Event
document.addEventListener("DOMContentLoaded", Store.prototype.displayBooks);

// Event Listener for add book
const form = document.getElementById("book-form");
form.addEventListener("submit", function(e) {
  e.preventDefault();
  // Get form values
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;
  // Instantiate book
  const book = new Book(title, author, isbn);

  // Instantiate UI
  const ui = new UI();

  // Instantiate Store
  const store = new Store();

  // Validate

  if (title === "" || author === "" || isbn === "") {
    // Error Alert
    ui.showAlert("Please fill in all fields.", "error");
  } else {
    // Add book to list
    ui.addBookToList(book);

    // Add book to store
    store.addBook(book);

    // Show Success
    ui.showAlert("Book added!", "success");

    // Clear fields
    ui.clearFields();
  }
});

// Event Listener for delete
const bookList = document.getElementById("book-list");
bookList.addEventListener("click", function(e) {
  e.preventDefault();

  // Instaniate UI
  const ui = new UI();

  // Instantiate Store
  const store = new Store();

  if (e.target.className === "delete") {
    // Delete books
    ui.deleteBook(e.target);

    // Remove from Local Storage
    store.removeBook(e.target);

    // Show Alert
    ui.showAlert("Book deleted!", "success");
  }
});
