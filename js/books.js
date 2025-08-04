document.addEventListener('DOMContentLoaded', function() {
    // Sample book data (in a real app, this would come from an API)
    const books = [
        {
            id: 1,
            title: "Introduction to Algorithms",
            author: "Thomas H. Cormen",
            isbn: "978-0262033848",
            category: "computer-science",
            publisher: "MIT Press",
            year: 2009,
            copies: 5,
            available: 3
        },
        {
            id: 2,
            title: "Clean Code: A Handbook of Agile Software Craftsmanship",
            author: "Robert C. Martin",
            isbn: "978-0132350884",
            category: "computer-science",
            publisher: "Prentice Hall",
            year: 2008,
            copies: 3,
            available: 1
        },
        {
            id: 3,
            title: "Design Patterns: Elements of Reusable Object-Oriented Software",
            author: "Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides",
            isbn: "978-0201633610",
            category: "computer-science",
            publisher: "Addison-Wesley",
            year: 1994,
            copies: 4,
            available: 2
        },
        {
            id: 4,
            title: "The Pragmatic Programmer: Your Journey to Mastery",
            author: "Andrew Hunt, David Thomas",
            isbn: "978-0135957059",
            category: "computer-science",
            publisher: "Addison-Wesley",
            year: 2019,
            copies: 2,
            available: 2
        },
        {
            id: 5,
            title: "Structure and Interpretation of Computer Programs",
            author: "Harold Abelson, Gerald Jay Sussman",
            isbn: "978-0262510875",
            category: "computer-science",
            publisher: "MIT Press",
            year: 1996,
            copies: 3,
            available: 0
        }
    ];

    const booksTableBody = document.getElementById('books-table-body');
    const bookForm = document.getElementById('book-form');
    const bookModal = document.getElementById('book-modal');
    const modalTitle = document.getElementById('modal-title');
    const bookSearch = document.getElementById('book-search');
    const bookCategory = document.getElementById('book-category');
    const bookStatus = document.getElementById('book-status');

    // Display books in the table
    function displayBooks(booksToDisplay) {
        booksTableBody.innerHTML = '';
        
        booksToDisplay.forEach(book => {
            const status = book.available > 0 ? 'Available' : 'Checked Out';
            const statusClass = book.available > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
            
            const row = document.createElement('tr');
            row.className = 'hover:bg-gray-50';
            row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="font-medium text-gray-900">${book.title}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-gray-900">${book.author}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-gray-900">${book.isbn}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-gray-900">${formatCategory(book.category)}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 py-1 rounded-full text-xs ${statusClass}">${status}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button class="text-blue-600 hover:text-blue-900 mr-3 edit-book" data-id="${book.id}">Edit</button>
                    <button class="text-red-600 hover:text-red-900 delete-book" data-id="${book.id}">Delete</button>
                </td>
            `;
            booksTableBody.appendChild(row);
        });

        // Add event listeners to edit and delete buttons
        document.querySelectorAll('.edit-book').forEach(button => {
            button.addEventListener('click', function() {
                const bookId = parseInt(this.getAttribute('data-id'));
                editBook(bookId);
            });
        });

        document.querySelectorAll('.delete-book').forEach(button => {
            button.addEventListener('click', function() {
                const bookId = parseInt(this.getAttribute('data-id'));
                deleteBook(bookId);
            });
        });
    }

    // Format category for display
    function formatCategory(category) {
        const categories = {
            'computer-science': 'Computer Science',
            'mathematics': 'Mathematics',
            'physics': 'Physics',
            'engineering': 'Engineering',
            'literature': 'Literature'
        };
        return categories[category] || category;
    }

    // Edit book
    function editBook(id) {
        const book = books.find(b => b.id === id);
        if (book) {
            modalTitle.textContent = 'Edit Book';
            document.getElementById('book-id').value = book.id;
            document.getElementById('title').value = book.title;
            document.getElementById('author').value = book.author;
            document.getElementById('isbn').value = book.isbn;
            document.getElementById('category').value = book.category;
            document.getElementById('publisher').value = book.publisher || '';
            document.getElementById('year').value = book.year || '';
            document.getElementById('copies').value = book.copies;
            bookModal.classList.remove('hidden');
        }
    }

    // Delete book
    function deleteBook(id) {
        if (confirm('Are you sure you want to delete this book?')) {
            const index = books.findIndex(b => b.id === id);
            if (index !== -1) {
                books.splice(index, 1);
                displayBooks(books);
            }
        }
    }

    // Add new book
    function addBook() {
        modalTitle.textContent = 'Add New Book';
        bookForm.reset();
        document.getElementById('book-id').value = '';
        bookModal.classList.remove('hidden');
    }

    // Handle form submission
    bookForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const id = document.getElementById('book-id').value;
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const isbn = document.getElementById('isbn').value;
        const category = document.getElementById('category').value;
        const publisher = document.getElementById('publisher').value;
        const year = document.getElementById('year').value;
        const copies = document.getElementById('copies').value;
        
        if (id) {
            // Update existing book
            const book = books.find(b => b.id === parseInt(id));
            if (book) {
                book.title = title;
                book.author = author;
                book.isbn = isbn;
                book.category = category;
                book.publisher = publisher;
                book.year = year;
                book.copies = copies;
            }
        } else {
            // Add new book
            const newId = books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1;
            books.push({
                id: newId,
                title,
                author,
                isbn,
                category,
                publisher,
                year,
                copies,
                available: copies
            });
        }
        
        displayBooks(books);
        bookModal.classList.add('hidden');
    });

    // Filter books based on search and filters
    function filterBooks() {
        const searchTerm = bookSearch.value.toLowerCase();
        const category = bookCategory.value;
        const status = bookStatus.value;
        
        const filteredBooks = books.filter(book => {
            const matchesSearch = book.title.toLowerCase().includes(searchTerm) || 
                                book.author.toLowerCase().includes(searchTerm) || 
                                book.isbn.includes(searchTerm);
            const matchesCategory = category === 'all' || book.category === category;
            let matchesStatus = true;
            
            if (status === 'available') {
                matchesStatus = book.available > 0;
            } else if (status === 'checked-out') {
                matchesStatus = book.available === 0;
            }
            
            return matchesSearch && matchesCategory && matchesStatus;
        });
        
        displayBooks(filteredBooks);
    }

    // Event listeners for search and filters
    bookSearch.addEventListener('input', filterBooks);
    bookCategory.addEventListener('change', filterBooks);
    bookStatus.addEventListener('change', filterBooks);

    // Add book button
    const addBookButton = document.querySelector('a[href="books.html?action=add"]');
    if (addBookButton) {
        addBookButton.addEventListener('click', function(e) {
            e.preventDefault();
            addBook();
        });
    }

    // Initialize with all books
    displayBooks(books);
});