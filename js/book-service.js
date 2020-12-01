'use strict'
const STORAGE_BOOKS_KEY = 'booksDB';
const PAGE_SIZE = 5;
var gPageIdx = 0;
var gBooks;

_createBooks();

function _createBooks() {
    var dbBooks = loadFromStorage(STORAGE_BOOKS_KEY);
    if (!dbBooks || !dbBooks.length) {
        dbBooks = [{
            id: makeId(),
            name: 'Stardust',
            price: 89.99,
            imgUrl: 'img/stardust.jpg',
            rate: 4,
        }, {
            id: makeId(),
            name: 'Star Wars Origami',
            price: 79.99,
            imgUrl: 'img/starWars.jpg',
            rate: 4,
        }, {
            id: makeId(),
            name: 'The Miracle Morning',
            price: 49.99,
            imgUrl: 'img/morning.jpg',
            rate: 4,
        }, {
            id: makeId(),
            name: 'Lullabies',
            price: 44.99,
            imgUrl: 'img/lullabies.jpg',
            rate: 4,
        }, {
            id: makeId(),
            name: 'Metro 2033',
            price: 57.99,
            imgUrl: 'img/metro.jpg',
            rate: 4,
        }, {
            id: makeId(),
            name: 'Curly Girl',
            price: 139.99,
            imgUrl: 'img/curlyGirl.jpg',
            rate: 3,
        }, {
            id: makeId(),
            name: 'The End Of The Affair',
            price: 29.99,
            imgUrl: 'img/TheEndOfTheAffair.jpg',
            rate: 4,
        },
        ];
        gBooks = dbBooks;
        saveToStorage(STORAGE_BOOKS_KEY, gBooks);
    };
    gBooks = dbBooks;
}

function nextPage() {
    gPageIdx++;
    if (gPageIdx * PAGE_SIZE >= gBooks.length) gPageIdx = 0;
}

function prevPage() {
    gPageIdx--;
    if (gPageIdx * PAGE_SIZE < gBooks.length) gPageIdx = gBooks.length;
}

function getBookData() {
    var idxStart = gPageIdx * PAGE_SIZE;
    var books = gBooks.slice(idxStart, idxStart + PAGE_SIZE);
    return books;
}

function setBookRate(bookId, newRate) {
    var currBookIdx = gBooks.findIndex(function (book) {
        return (book.id === bookId);
    });
    gBooks[currBookIdx].rate = newRate;
    saveToStorage(STORAGE_BOOKS_KEY, gBooks);
}

function getBook(bookId) {
    var currBook = gBooks.find(function (book) {
        return (book.id === bookId);
    });
    return currBook;
}

function removeBook(bookId) {
    console.log('bookId is:', bookId);
    var currBookIdx = gBooks.findIndex(function (book) {
        return (book.id === bookId);
    });
    console.log('currBookIdx is:', currBookIdx);
    gBooks.splice(currBookIdx, 1);
    saveToStorage(STORAGE_BOOKS_KEY, gBooks);
}

function addBook(title, price) {
    var newBook = {
        id: makeId(),
        name: title,
        price: price,
        imgUrl: 'img/default.jpg',
        rate: 0,
    };
    gBooks.push(newBook);
    saveToStorage(STORAGE_BOOKS_KEY, gBooks);
}

function updatePrice(id, price) {
    var currBookIdx = gBooks.findIndex(function (book) {
        return book.id === id;
    });
    gBooks[currBookIdx].price = +price;
    saveToStorage(STORAGE_BOOKS_KEY, gBooks);
}

