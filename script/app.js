// Variables declaration
const myBooks = document.getElementById('myBooks')
const img = document.getElementsByTagName('img')[0]
const h1 = document.getElementsByClassName('title')[0]
const h2 = document.getElementsByClassName('h2')[0]
const hr = document.getElementsByTagName('hr')[0]
const content = document.getElementById('content')

// Create btn_add
const btn_add = document.createElement('button')
btn_add.innerText = 'Ajouter un livre'
btn_add.id = 'btn_add'
myBooks.insertBefore(btn_add, hr)
btn_add.addEventListener('click', btn_add_click)

// Create div hidden by default
const div_form = document.createElement('div')
div_form.setAttribute('id', 'div_form')
div_form.style.display = 'none'

// Title input and label
const label_title = document.createElement('label')
label_title.innerText = 'Titre du livre'
const input_title = document.createElement('input')
input_title.type = 'text'
div_form.append(label_title)
div_form.append(input_title)

// Author input and label
const label_author = document.createElement('label')
label_author.innerText = 'Auteur'
const input_author = document.createElement('input')
input_author.type = 'text'
div_form.append(label_author)
div_form.append(input_author)

// Create btn_search
const btn_search = document.createElement('button')
btn_search.innerText = 'Rechercher'
btn_search.id = "btn_search"
div_form.append(btn_search)


// Create btn_cancel
const btn_cancel = document.createElement('button')
btn_cancel.innerText = 'Annuler'
btn_cancel.id = "btn_cancel"
div_form.append(btn_cancel)
// Return in first page on click
btn_cancel.addEventListener('click', function (btn_cancel_click) {window.location = "../index.html"})