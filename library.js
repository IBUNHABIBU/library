let bookList = [];
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
class Saver {
    static getBooks(){
        let books;
        books = localStorage.getItem('books')===null ? [] : JSON.parse(localStorage.getItem('books'));
        return books;
    }
    static addBook(book){
        const books = Saver.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }
    static removeBook(title){
        const book = Saver.getBooks();
        books.forEach((element,index) => {
            if (element.title==title){
                element.splice(index,1);
            }
        });
        localStorage.setItem('books',JSON.stringify(books));
    }
}

class UserDisplay{
    static addBookToLibrary(book) {
       
        const bookDetails = document.getElementById('book-details');
        const tableRow = document.createElement('tr');
        tableRow.innerHTML = `
                                <td>${book.title}</td>
                                <td>${book.author}</td>
                                <td>${book.pages}</td>
                                <td><a href="#" class="btn btn-danger btn-sm delete">Delete Book</a></td>
        `
        bookDetails.appendChild(tableRow);
    }
    static displayBook(){
        const books = Saver.getBooks();
        books.forEach(element=>UserDisplay.addBookToLibrary(element))
    }
    static deleteBook(element){
        if(element.classList.contains('delete')){
            element.parentElement.parentElement.remove();
        }
    }
    static clearField(){
         title.value = ' ';
         author.value =  ' ';
         pages.value = ' ';
    }
}
