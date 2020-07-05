let bookList = []
class Book{
    constructor(title,author,pages){
        this.title = title;
        this.author = author;
        this.pages = pages;
    }
}
let book = new Book('Grow rich',"napolion",48);

const addForm = document.getElementById('form');
console.log(addForm);
addForm.addEventListener('submit',function(event){
    event.preventDefault();
    let valu = addForm.querySelector('#title').value;
    
    const authervalu = addForm.querySelector('#author').value;
    
    const pagesvalu = addForm.querySelector('#pages').value;
    console.log(valu);
   
})