
var gTrans = {
    title: {
        en: 'Welcome to the bookshop',
        he: 'ברוכים הבאים לחנות הספרים',
    },
    'english': {
        en: 'English',
        he: 'אנגלית',
    },
    'hebrew': {
        en: 'Hebrew',
        he: 'עברית',
    },
    'new-book': {
        en: 'Book Name',
        he: 'שם הספר:',
    },
    'new-author': {
        en: 'Author Name',
        he: 'שם הסופר:',
    },
    'new-price': {
        en: 'Price',
        he: 'מחיר:',
    },
    'txt-new-book': {
        en: 'Create a new book',
        he: 'הוספת ספר חדש',
    },
    'modal-new-header': {
        en: 'Add a new Book',
        he: 'הוסף ספר חדש',
    },
    'modal-new-title': {
        en: 'Title',
        he: 'כותר'
    },
    'modal-new-price': {
        en: 'Price',
        he: 'מחיר'
    },
    'modal-new-btn': {
        en: 'Add Book',
        he: 'הוסף ספר'
    },
    'tbl-title': {
        en: 'Book details',
        he: 'פרטי הספר'
    },
    'tbl-price': {
        en: 'Price',
        he: 'מחיר'
    },
    'tbl-actions': {
        en: 'Actions',
        he: 'פעולות'
    },
    'btn-read': {
        en: 'Details',
        he: 'פרטים'
    },
    'btn-update': {
        en: 'Update',
        he: 'עדכן'
    },
    'btn-delete': {
        en: 'Delete',
        he: 'מחק',
    },
    'btn-prev': {
        en: 'Prev',
        he: 'הקודם'
    },
    'btn-next': {
        en: 'Next',
        he: 'הבא'
    },
    'modal-read-btn': {
        en: 'Close',
        he: 'סגור'
    },
    'modal-update-header': {
        en: 'Update price for',
        he: 'עדכן מחיר עבור',
    },
    'modal-update-title': {
        en: 'Please enter new price',
        he: 'הכנס את המחיר המעודכן',
    },
    'modal-update-btn': {
        en: 'Update price',
        he: 'עדכן מחיר',
    },
    'modal-delete-msg': {
        en: 'Are you sure you want to delete this item?',
        he: 'האם אתה בטוח שברצונך למחוק פריט זה?',
    }
}
var currency = {
    en: '$',
    he: 'ש״ח',
}

var gCurrLang = 'en';

function setCurrLang(val) {
    gCurrLang = val;
}

function getTrans(transKey) {
    var keyValues = gTrans[transKey];
    var val = keyValues[gCurrLang];
    return val;
}

function translateSite() {
    var elTrans = document.querySelectorAll('[data-trans]');
    var elSubtitleSec = document.querySelector(".subtitle-section");
    if (gCurrLang === 'he') elSubtitleSec.classList.add('rtl');
    else if (gCurrLang === 'en') elSubtitleSec.classList.remove('rtl');
    elTrans.forEach(function (el) {
        el.innerText = getTrans(el.dataset.trans);
    })

}