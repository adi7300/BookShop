'use strict'
console.log('Ex - Book Store Adi M.');

function onInit() {
    renderBooks();
}

function renderBooks() {
    var strHTML = `<thead><tr><th scope="col" class="id"></th><th scope="col" data-trans="tbl-title" class="title">${getTrans('tbl-title')}</th><th scope="col" data-trans="tbl-actions" class="actions">${getTrans('tbl-actions')}</th></tr></thead><tbody>`;
    var books = getBookData();
    books.forEach(function (book) {
        strHTML += `<tr><th scope="row"><img src=${book.imgUrl}></th><td><strong>${book.name}</strong> <br> by ${book.author}<br>${book.price} $<br>
        <div class="div-rating">
        <span class="fa fa-star star-0-${book.id} ${book.rate > 0 ? 'stared' : ''}"></span>
        <span class="fa fa-star star-1-${book.id} ${book.rate > 1 ? 'stared' : ''}"></span>
        <span class="fa fa-star star-2-${book.id} ${book.rate > 2 ? 'stared' : ''}"></span>
        <span class="fa fa-star star-3-${book.id} ${book.rate > 3 ? 'stared' : ''} "></span>
        <span class="fa fa-star star-4-${book.id} ${book.rate > 4 ? 'stared' : ''}"></span></div>
        </td><td>            
        <button onclick={onReadBook(event,'${book.id}')} data-toggle="modal" data-target="#exampleModal" data-trans="btn-read" class="tbl-btn btn-primary">${getTrans('btn-read')}</button>
        <button data-trans="btn-update" class="tbl-btn  btn-primary" onclick="onUpdateBook(event,'${book.id}')">${getTrans('btn-update')}</button>
        <button data-trans="btn-delete" class="tbl-btn  btn-primary" onclick="onRemoveBook(event,'${book.id}')">${getTrans('btn-delete')}</button></td></tr>`
    });
    strHTML += '<tbody>';
    document.querySelector('.book-shelf').innerHTML = strHTML;
}

function onSetLang(val) {
    setCurrLang(val);
    renderBooks();
    translateSite();
}
function onAddBook() {
    var elNewBookName = document.querySelector(".txt-new-book-name");
    var elNewBookAuthor = document.querySelector(".txt-new-book-author");
    var elNewBookPrice = document.querySelector(".txt-new-book-price");
    if (!elNewBookName.value || !elNewBookAuthor.value || !elNewBookPrice.value) alert('All Fields must be filled');
    else {
        addBook(elNewBookName.value, elNewBookAuthor.value, elNewBookPrice.value);
        console.log('elNewBookName is:', elNewBookName);
        elNewBookName.value = '';
        elNewBookAuthor.value = '';
        elNewBookPrice.value = '';
    }
}

function onReadBook(ev, id) {
    console.log('on read pressed');
    var strHtml = '';
    //ev.stopPropagation();
    var currBook = getBookById(id);
    console.log('currBook is:', currBook);
    document.querySelector(".modal-title").innerText = `${currBook.name}`;
    document.querySelector(".modal-details-img").innerHTML = `<img src="${currBook.imgUrl}">`;
    document.querySelector(".modal-details-author").innerText = 'Author: ' + currBook.author;
    document.querySelector(".modal-details-price").innerText = 'Price: ' + currBook.price;
    document.querySelector(".modal-details-rate").innerHTML = `<div class="rating-box"><button class="minus-plus-box" onclick="onRate('${currBook.id}' , -1)">-</button><input class="rate-box" type="number" min="0" max="5" placeholder="${currBook.rate}"><button class="minus-plus-box" onclick="onRate('${currBook.id}',1)">+</button></div>`
}

function onRate(id, diff) {
    var newRate = updateRate(id, diff)
    document.querySelector('.modal-details-rate input').value = newRate;
    renderStars(id, newRate);
    renderBooks();
}



function renderStars(id, starsNum) {
    for (var i = 0; i < starsNum; i++) {
        document.querySelector(`.star-${i}-${id}`).classList.add('stared');
    }
    for (i; i <= 5; i++) {
        if (document.querySelector(`.star-${i}-${id}`).classList.contains('stared')) {
            console.log(document.querySelector(`.star-${i}-${id}`));
            document.querySelector(`.star-${i}-${id}`).classList.remove('stared');
        }
    }
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
    var pageNum = nextPage();
    if (pageNum) {
        document.querySelector('.next').classList.remove("eol");
        document.querySelector(`.page${pageNum}`).classList.remove("selected-page");
        document.querySelector(`.page${pageNum + 1}`).classList.add("selected-page");
    }
    else {
        console.log('End of list');
        document.querySelector('.next').classList.add("eol");
    }
    renderBooks();
}

function onPrevPage() {
    var pageNum = prevPage() + 1;
    console.log('pageNum is:', pageNum);
    if (pageNum) {
        document.querySelector('.prev').classList.remove("eol");
        document.querySelector(`.page${pageNum}`).classList.add("selected-page");
        document.querySelector(`.page${pageNum + 1}`).classList.remove("selected-page");
    }
    else {
        console.log('End of list');
        document.querySelector('.prev').classList.add("eol");
    }
    renderBooks();
}