
const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const addBook = document.getElementById('book-form');
const status = document.getElementById('status-btn');
class Book{
    constructor(title,author,pages){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }
}

// toggle button 
let clicked = false;
function toggle(){
    if(!clicked){
        clicked = true;
        document.getElementById('toggle-btn').innerHTML = "Unread";
        document.getElementById('output').innerHTML = "Unread";
    } else {
        clicked = false;
        document.getElementById('toggle-btn').innerHTML = "read";
        document.getElementById('output').innerHTML = "read";
    }
}





class UserDisplay{
    static renderBook(){
        const books = Saver.getBooks();
        books.forEach((book)=>UserDisplay.addBookToLibrary(book));
    }
    static addBookToLibrary(book) {
       let counter = 0;
        const bookDetails = document.getElementById('book-details');
        const tableRow = document.createElement('tr');
        tableRow.innerHTML = `
                                <td>${book.title}</td>
                                <td>${book.author}</td>
                                <td>${book.pages}</td>
                                <td>${book.status}</td>
                                
                                <td><a href="#" class="btn btn-danger btn-sm delete"><i class="fas fa-trash"></i>  Delete Book</a></td>
        `
        bookDetails.appendChild(tableRow);
    }
   
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
        let myLibrary;
        myLibrary = localStorage.getItem('myLibrary')===null ? [] : JSON.parse(localStorage.getItem('myLibrary'));
         return myLibrary;
    }
    static addBook(book){
        const myLibrary = Saver.getBooks();
        myLibrary.push(book);
        localStorage.setItem('myLibrary',JSON.stringify(myLibrary));
    }
    static removeBook(title){
        const myLibrary = Saver.getBooks();
        myLibrary.forEach((element,index) => {
            if (element.title===title){
                element.splice(index,1);
            }
        });
        localStorage.setItem('myLibrary',JSON.stringify(myLibrary));
    }
}

// validation
class Validate{
    // show input error message
        static  showError(input , message){
            const formControl = input.parentElement;
            formControl.className = 'form-control error';
            const small = formControl.querySelector('small');
            small.innerText = message;
        }
        //show success outlite 
        static  showSuccess(input){
            const formControl = input.parentElement;
            formControl.className = 'form-control success'
        }
        // check required fields 
        static  checkRequired(inputArr){
            inputArr.forEach(input => {
                // console.log(input);
                if (input.value.trim() ===''){
                    Validate.showError(input,`${Validate.getFieldName(input)} is required `);
                } else {
                    Validate.showSuccess(input);
                }
            });
            setTimeout(() => {
                let small = document.querySelectorAll('.small-error');
                small.forEach(node=>node.remove());
            }, 3000);
        }
        // Get field name 
        static  getFieldName(input){
            return input.id.charAt(0).toUpperCase()+input.id.slice(1)
        }
    
        static showAlert(message,className){
            const div = document.createElement('div');
            div.className = `alert alert-${className} `;
            div.style.zIndex = '10';
            div.appendChild(document.createTextNode(message));
            const container = document.querySelector('.header-container');
            const form = document.querySelector('#book-form');
            container.insertBefore(div, form);
            // vanish in 3 sec
            setTimeout(() => {
                document.querySelector('.alert').remove();
            }, 3000);
    
        }
    }
document.addEventListener('DOMContentLoaded',UserDisplay.renderBook);

document.getElementById('book-form').addEventListener('submit',(e)=>{
    e.preventDefault()
        const bookTitle = title.value;
        const bookAuthor = author.value;
        const bookPages = pages.value;
   
    //     checkRequired([bookTitle,bookAuthor,bookPages]);
       // validate 
    if(bookTitle === '' || bookAuthor === '' || bookPages === ''){
        Validate.checkRequired([title,author,pages]);
    } else {

        // instatiate book
        const book = new Book(bookTitle,bookAuthor,bookPages,status);

        // add book to UI
        UserDisplay.addBookToLibrary(book);
        Validate.showAlert('Book added to the list','success');
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


// pop up form
document.getElementById('add-new-book').addEventListener('click',function(){
    document.querySelector('.header-container').style.display = 'flex';
});
document.querySelector('#hide').addEventListener('click', function(){
    
    document.querySelector('.header-container').style.display = 'none';
})