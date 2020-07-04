let bookList = []
class Book{
    constructor(title,author,pages){
        this.title = title;
        this.author = author;
        this.pages = pages;
    }
}
let book = new Book('Grow rich',"napolion",48);

function addBook(name,author,page){
    bookList.push(new Book(name,author,page));
}

console.log(bookList)