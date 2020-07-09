let bookList = []
const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const addBook = document.getElementById('book-form');

class Book{
    constructor(title,author,pages){
        this.title = title;
        this.author = author;
        this.pages = pages;
    }
}
addBook.addEventListener('submit',(e)=>{
    e.preventDefault()
    const bookTitle = title.value;
    const bookAuthor = author.value;
    const bookPages = pages.value;
    const book = new Book(bookTitle,bookAuthor,bookPages);
    bookList.push(book);
    console.log(bookList);
});
class UserDisplay{
    static addBookToLibrary(book) {
        const bookDetails = document.getElementById('book-details');
        const tableRow = document.createElement('tr');
        tableRow.innerHTML = `
                                <td>${book.title}</td>
                                <td>${book.author}</td>
                                <td>${book.pages}</td>
        `
        bookDetails.appendChild(tableRow);
    }
    static displayBook(){

    }
}

class LocalStore {
    
}