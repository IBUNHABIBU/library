
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
    // static showAlert(message,className){
    //     const div = document.createElement('div');
    //     div.className = `alert alert-${className} `;
    //     div.appendChild(document.createTextNode(message));
    //     const container = document.querySelector('.header-container');
    //     const form = document.querySelector('#book-form');
    //     container.insertBefore(div, form);
    //     // vanish in 3 sec
    //     setTimeout(() => {
    //         document.querySelector('.alert').remove();
    //     }, 3000);

    // }
    static clearFields(){
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

document.getElementById('book-form').addEventListener('submit',(e)=>{
    e.preventDefault()
        const bookTitle = title.value;
        const bookAuthor = author.value;
        const bookPages = pages.value;
   
    //     checkRequired([bookTitle,bookAuthor,bookPages]);
       // validate 
    if(title === '' || author === '' || pages === ''){
        checkRequired([title,author,pages]);
        
    } else {

        // instatiate book
        const book = new Book(bookTitle,bookAuthor,bookPages);

        // add book to UI
        UserDisplay.addBookToLibrary(book);
        showAlert('Book added to the list','success');
        // add book to Store 
        Saver.addBook(book);
        // Clear fields 
        UserDisplay.clearFields();
     }
});

document.getElementById('book-details').addEventListener('click',(e)=>{
    
    UserDisplay.deleteBook(e.target);
    Saver.removeBook(e.target.parentElement.previousElementSibling.textContent);

})


// validation

// show input error message
function showError(input , message){
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
   }
   //show success outlite 
   function showSuccess(input){
       const formControl = input.parentElement;
       formControl.className = 'form-control success'
   }
// check required fields 
function checkRequired(inputArr){
    inputArr.forEach(input => {
        // console.log(input);
        if (input.value.trim() ===''){
            // showError(input,`${input.id} is required`);  it gives result in small letter
            // if we want to capitalize the word we use the method below
            
            showError(input,`${getFieldName(input)} is required `);
        } else {
            showSuccess(input);
        }
    });
    setTimeout(() => {
        document.querySelector('.alert').remove();
    }, 3000);
}
// Get field name 
function getFieldName(input){
    return input.id.charAt(0).toUpperCase()+input.id.slice(1)
}
// event listener
// form.addEventListener('submit', function(e){
//     e.preventDefault();
  
   
// });
function showAlert(message,className){
    const div = document.createElement('div');
    div.className = `alert alert-${className} `;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.header-container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);
    // vanish in 3 sec
    setTimeout(() => {
        document.querySelector('.alert').remove();
    }, 3000);

}