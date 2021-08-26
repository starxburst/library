let myLibrary = [];

//constructor
function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.info = function() {
        console.log(`${this.title} by ${this.author}, ${this.pages} pages, ${this.isRead?"Read":"Not read yet"}.`)
    }
}

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295', false);
console.log(theHobbit.info());

//add book to database
function addBookToLibrary(e) {
    // do stuff here
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const isRead = document.querySelector("#isRead").checked;
    const book = new Book(title, author, pages, isRead);
    myLibrary.push(book);
    populateStorage();
    renderBookCard()
  }

//open form
const btnOpenForm = document.querySelector("#openForm");
btnOpenForm.addEventListener('click', openForm);

function openForm() {
    document.getElementById("addBookForm").style.display = "block";
}

//close form
const btnCloseForm = document.querySelector("#closeForm");
btnCloseForm.addEventListener('click', closeForm);

function closeForm() {
    document.getElementById("addBookForm").style.display = "none";
}

//submit book
const btnAddBook = document.querySelector("#addBook");
btnAddBook.addEventListener('click', addBookToLibrary);

//reset book grid
function resetBookGrid() {
    const bookGrid = document.querySelector(".book-card-grid");
    bookGrid.innerHTML = "";
}

//render book card grid
const bookGrid = document.querySelector(".book-card-grid");

//render book card
function renderBookCard() {
    resetBookGrid();
    for (i = 0; i < myLibrary.length; i++) {
        const bookCard = document.createElement("div");
        const h1 = document.createElement("h1");
        const h2 = document.createElement("h2");
        const h3 = document.createElement("h3");
        const btnIsRead = document.createElement("button");
        const btnRemove = document.createElement("button");

        h1.textContent = myLibrary[i].title;
        h2.textContent = myLibrary[i].author;
        h3.textContent = `Pages: ${myLibrary[i].pages}`;
        btnRemove.textContent = "Remove";
        btnRemove.setAttribute("data-id", i);
        btnRemove.addEventListener("click", removeBook);

        btnIsRead.setAttribute("data-id", i);
        if (myLibrary[i].isRead) {
            btnIsRead.textContent = "Read";
            btnIsRead.classList.add("btn-green");
            btnIsRead.classList.add("btn-green:hover");
            btnIsRead.addEventListener("click", toggleReadButton);
        } else {
            btnIsRead.textContent = "Not read";
            btnIsRead.classList.add("btn-red");
            btnIsRead.classList.add("btn-red:hover");
            btnIsRead.addEventListener("click", toggleReadButton);
        }
    

        bookCard.appendChild(h1);
        bookCard.appendChild(h2);
        bookCard.appendChild(h3);
        bookCard.appendChild(btnIsRead);
        bookCard.appendChild(btnRemove);

        h1.classList.add("h1");
        h2.classList.add("h2");
        h3.classList.add("h3");
        btnRemove.classList.add("btn-red")
        btnRemove.classList.add("btn-red:hover")
        bookCard.classList.add("book-card");

        bookGrid.appendChild(bookCard);
    }
}

//Remove Book
function removeBook(e) {
    console.log(e.target.getAttribute("data-id"));
    myLibrary.splice(e.target.getAttribute("data-id"), 1);
    populateStorage();
    renderBookCard();
}

//After pressing Read button
function toggleReadButton(e) {
    console.log(e.target.getAttribute("data-id"));
    if (myLibrary[e.target.getAttribute("data-id")].isRead) {
        myLibrary[e.target.getAttribute("data-id")].isRead = false;
    } else {
        myLibrary[e.target.getAttribute("data-id")].isRead = true;
    }
    populateStorage();
    renderBookCard();
}

//local storage
function checkLocalStorage() {
    if(!localStorage.getItem("savedData")) {
        populateStorage();
    } else {
        setStyles();
    }
}

function populateStorage() {
    localStorage.setItem("savedData", JSON.stringify(myLibrary));
    setStyles();
}

function setStyles() {
    myLibrary = JSON.parse(localStorage.getItem("savedData"));
}

checkLocalStorage();
console.log(localStorage);

//render book card when refresh page
renderBookCard();