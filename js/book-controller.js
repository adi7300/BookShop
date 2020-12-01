'use strict'
console.log('Ex - Book Store Adi M.');

function onInit() {
    renderBooks();
}

function renderBooks() {
    var strHTML = '<tr><th class="id">Id</th><th class="title">Title</th><th class=""price>Price</th><th class="actions">Actions</th></tr>';
    var books = getBookData();
    books.forEach(function (book) {
        strHTML += `<tr><td>${book.id}</td><td>${book.name}</td><td>${book.price} $</td><td>
            <button class="btn-read" onclick="OnReadBook(event,'${book.id}')">Read</button>
            <button class="btn-update" onclick="onUpdateBook(event,'${book.id}')">Update</button>
            <button class="btn-delete" onclick="onRemoveBook(event,'${book.id}')">Delete</button></td></tr>`
    });
    document.querySelector('.book-shelf').innerHTML = strHTML;
}


function onAddBook() {
    document.querySelector(".modal-add").style.display = 'block';
}
function onSubmitAdd(event) {
    event.stopPropagation();
    var title = document.querySelector("input[name=title]").value;
    var price = document.querySelector("input[name=price]").value;
    console.log('title is:', title);
    document.querySelector(".modal-add").style.display = 'none';
    addBook(title, price);
    renderBooks();

}

function OnReadBook(ev, id) {
    var tempRate;
    ev.stopPropagation();
    var currBook = getBook(id);
    console.log('currBook is:', currBook);
    document.querySelector(".modal-read-header").innerText = `${currBook.name} - ${currBook.price}$ `;
    document.querySelector(".modal-read-body").innerHTML = `<img src="${currBook.imgUrl}">`;
    document.querySelector(".book-rate").value = currBook.rate;
    document.querySelector(".minus").onclick = function () { decRate(id) };
    document.querySelector(".plus").onclick = function () { incRate(id) };
    document.querySelector(".modal-read").style.display = 'flex';
    tempRate = document.querySelector(".book-rate").value;
    console.log('tempRate is:', tempRate);
}

function onUpdateBook(ev, id) {
    ev.stopPropagation();
    var newPrice = prompt("Enter a new price");
    console.log('newPrice is:', newPrice);
    if (newPrice) {
        updatePrice(id, newPrice);
        renderBooks();
    }
}

function closeReadModal() {
    document.querySelector(".modal-read").style.display = 'none';

}

function incRate(id) {
    var newRate = document.querySelector(".book-rate").value++;
    console.log('newRate is:', newRate);
    setBookRate(id, newRate + 1);
}

function decRate(id) {
    document.querySelector(".book-rate").value--;
    setBookRate(id, newRate - 1);
}


function onRemoveBook(ev, id) {
    ev.stopPropagation();
    removeBook(id);
    renderBooks();
}

function closeModal() {
    document.querySelector(".modal-add").style.display = 'none';
    document.querySelector(".modal-update").style.display = 'none';
}

function onNextPage() {
    nextPage();
    renderBooks();
}

function onPrevPage() {
    prevPage();
    renderBooks();
}