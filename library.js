
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

class UserDisplay{
    static displayBook(){
        const books = Saver.getBooks();
        books.forEach((book)=>UserDisplay.addBookToLibrary(book));
    }
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
   
    static clearField(){
         title.value = ' ';
         author.value =  ' ';
         pages.value = ' ';
    }
    
    static deleteBook(element){
        if(element.classList.contains('delete')){
            element.parentElement.parentElement.remove();
        }
    }
}


class Saver{
    static getBooks(){
        let books;
        // books = localStorage.getItem('books')===null ? [] : JSON.parse(localStorage.getItem('books'));
        // return books;
        if(localStorage.getItem('books') === null){
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static addBook(book){
        const books = Saver.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }
    static removeBook(title){
        const books = Saver.getBooks();
        books.forEach((element,index) => {
            if (element.title==title){
                element.splice(index,1);
            }
        });
        localStorage.setItem('books',JSON.stringify(books));
    }
}

document.addEventListener('DOMContentLoaded',UserDisplay.displayBook);

addBook.addEventListener('submit',(e)=>{
    e.preventDefault()
    const bookTitle = title.value;
    const bookAuthor = author.value;
    const bookPages = pages.value;
    const book = new Book(bookTitle,bookAuthor,bookPages);
    UserDisplay.addBookToLibrary(book);
    Saver.addBook(book);
    UserDisplay.clearField();
});

document.getElementById('book-details').addEventListener('click',(e)=>{
    
    UserDisplay.deleteBook(e.target);
    Saver.removeBook(e.target.parentElement.previousElementSibling.textContent);

})