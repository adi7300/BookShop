'use strict'
const STORAGE_BOOKS_KEY = 'booksDB';
const PAGE_SIZE = 4;
var gPageIdx = 0;
var gBooks;


_createBooks();

function _createBooks() {
    var dbBooks = loadFromStorage(STORAGE_BOOKS_KEY);
    if (!dbBooks || !dbBooks.length) {
        dbBooks = [{
            id: makeId(),
            name: 'A Promised Land',
            author: 'Barack Obama',
            price: 89.99,
            imgUrl: 'img/promisedLand.jpg',
            rate: 4,
        }, {
            id: makeId(),
            name: 'Modern Comfort Food: A Barefoot Contessa Cookbook',
            author: 'Ina Garten',
            price: 29.99,
            imgUrl: 'img/modernComfortFood.jpg',
            rate: 2,
        }, {
            id: makeId(),
            name: 'Becoming',
            author: 'Michelle Obama',
            price: 59.99,
            imgUrl: 'img/becoming.jpg',
            rate: 5,
        }, {
            id: makeId(),
            name: 'Midnight Sun',
            author: 'Stephenie Meyer',
            price: 59.99,
            imgUrl: 'img/MidnightSun.jpg',
            rate: 5,
        },
        {
            id: makeId(),
            name: 'Star Wars Origami',
            author: 'Matthew McConaughey',
            price: 79.99,
            imgUrl: 'img/starWars.jpg',
            rate: 2,
        },
        {
            id: makeId(),
            name: 'Caste (Oprah\'s Book Club)',
            author: 'Isabel Wilkerson',
            price: 39.99,
            imgUrl: 'img/Caste.jpg',
            rate: 4,
        }, {
            id: makeId(),
            name: 'The Miracle Morning',
            author: 'Mac Barnett',
            price: 49.99,
            imgUrl: 'img/morning.jpg',
            rate: 3,
        }, {
            id: makeId(),
            name: 'Lullabies',
            author: 'Lynne Olson',
            price: 44.99,
            imgUrl: 'img/lullabies.jpg',
            rate: 4,
        }, {
            id: makeId(),
            name: 'Metro 2033',
            author: 'Mac Barnett',
            price: 57.99,
            imgUrl: 'img/metro.jpg',
            rate: 2,
        }, {
            id: makeId(),
            name: 'Curly Girl',
            author: 'Alison A. Armstrong',
            price: 139.99,
            imgUrl: 'img/curlyGirl.jpg',
            rate: 5,
        }, {
            id: makeId(),
            name: 'The End Of The Affair',
            author: 'Molesey Crawford',
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
    if (gPageIdx * PAGE_SIZE >= gBooks.length) return;
    return gPageIdx;
}

function prevPage() {
    gPageIdx--;
    if (gPageIdx < 0) return;
    return gPageIdx;

}

function getBookData() {
    var idxStart = gPageIdx * PAGE_SIZE;
    var books = gBooks.slice(idxStart, idxStart + PAGE_SIZE);
    return books;
}

function updateRate(bookId, diff) {
    var book = getBookById(bookId)
    if (book.rate === 0 && diff === -1 || book.rate === 5 && diff === 1) return book.rate
    book.rate += diff;
    saveToStorage(STORAGE_BOOKS_KEY, gBooks);
    return book.rate
}

function getBookById(bookId) {
    var currBook = gBooks.find(function (book) {
        return (book.id === bookId);
    });
    return currBook;
}

function getBooks() {
    return gBooks;
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

function addBook(title, author, price) {
    var newBook = {
        id: makeId(),
        name: title,
        author: author,
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

