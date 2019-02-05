// Book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI constructor
function UI() { }

// Add book to list
UI.prototype.addBookToList = function (book) {
  const list = document.getElementById('book-list')

  // Create table row element
  const row = document.createElement('tr');
  console.log(row);
  // Insert cols
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X</a></td>
  `;
  list.appendChild(row);
}

// Show Alert
UI.prototype.showAlert = function (message, className) {
  // Create a div
  const div = document.createElement('div');
  // Add classes
  div.className = `alert ${className}`;
  // Add text
  div.appendChild(document.createTextNode(message));
  // Insert in the DOM
  document.querySelector('.container').insertBefore(div, document.getElementById('book-form'))

  // Timeout after 3 seconds
  setTimeout(function () {
    document.querySelector('.alert').remove();
  }, 3000);
}

// Clear fields
UI.prototype.clearFields = function () {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

//Event Listeners
const form = document.getElementById('book-form');
form.addEventListener('submit', function (e) {
  e.preventDefault();
  // Get form values
  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value;
  // Instantiate book
  const book = new Book(title, author, isbn);

  // Instantiate UI
  const ui = new UI();

  // Validate

  if (title === '' || author === '' || isbn === '') {
    // Error Alert
    ui.showAlert('Please fill in all fields.', 'error');
  } else {
    // Add book to list
    ui.addBookToList(book);

    // Show Success
    ui.showAlert('Book added successfully.', 'success')

    // Clear fields
    ui.clearFields();
  }
})