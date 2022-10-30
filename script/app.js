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
btn_cancel.addEventListener('click', function (btn_cancel_click) {window.location = "../Pochlib/index.html"})

// Display div_form on click
function btn_add_click() {
	if (div_form.style.display == 'none') {
		div_form.style.display = 'flex'
	}
}

// Insert div_form before content
myBooks.insertBefore(div_form, content)

// Retrieve information from the API
btn_search.addEventListener('click', function (e) {
	e.preventDefault();
	try {
	if (input_title.value != 0 && input_author.value != 0) {
		const result = document.createElement('h2')
		result.className = 'result'
		result.innerText = 'Résultats de recherche'
		div_form.appendChild(result)
		let title = input_title.value
		let author = input_author.value
		let api = `https://www.googleapis.com/books/v1/volumes?q=${title}+inauthor:${author}`

		fetch(api)
			.then(res => res.json())
			.then(res => 
			{
				if (res.totalItems == 0) {
					alert("Aucun résultat");
				} else {
					 res.items.map(book => {
						let bookName = book.volumeInfo.title
						let id = book.id
						let author = (book.volumeInfo?.authors == null || book.volumeInfo?.authors == undefined ? 'Information manquante' : book.volumeInfo?.authors[0])
						let description = (book.volumeInfo?.description == null || book.volumeInfo?.description == undefined ? 'Information manquante': book.volumeInfo?.description.substring(0,200)) 
						let image = (book.volumeInfo?.imageLinks?.thumbnail == null || book.volumeInfo?.imageLinks?.thumbnail == undefined ? 'images/unavailable.png': book.volumeInfo?.imageLinks?.thumbnail)
						displayBook(bookName, id, author, description, image)
					})				
				}
			})
	} else {
		alert("Veuillez renseigner tous les champs")
	}
	} catch (error){
		console.error("erreur :" + error);
	}
})

// Display search result
function displayBook(Title, Id, Author, Description, Image) {
	const container = document.createElement('div')
	const bookTitle = document.createElement('h3')
	const bookAuthor = document.createElement('h3')
	const bookId = document.createElement('h3')
	const bookDescription = document.createElement('p')
	const bookImage = document.createElement('img')
	const bookIcon = document.createElement('img')
	bookTitle.innerText = 'Titre : ' + Title
	bookId.innerText = 'Id : ' + Id
	bookAuthor.innerText = 'Auteur : ' + Author
	bookDescription.innerText = 'Description : ' + Description
	bookTitle.classList = 'bookTitle'
	bookId.classList = 'id'
	bookAuthor.classList = 'author'
	bookDescription.classList = 'description'
	bookImage.classList = 'image'
	bookImage.src = Image
	bookImage.alt = Title
	bookImage.width = 50
	bookImage.height = 100
	bookIcon.src = './images/bookmark.png'
	bookIcon.width = 30
	bookIcon.height = 30
	bookIcon.id= 'icon'
	bookIcon.addEventListener("click", saveBook)
	container.appendChild(bookIcon)
	container.appendChild(bookTitle)
	container.appendChild(bookAuthor)
	container.appendChild(bookId)
	container.appendChild(bookDescription)
	container.appendChild(bookImage)
	container.classList = 'book'
	myBooks.insertBefore(container, content)
}

function saveBook(e){
	let title = e.target.parentElement.getElementsByClassName('bookTitle')[0].innerText.substring(7)
	let id = e.target.parentElement.getElementsByClassName('id')[0].innerText.substring(4)

	if (sessionStorage.getItem(id)) {
		alert('Vous ne pouvez pas ajouter deux fois le même livre')
	} else {
		sessionStorage.setItem(title, id)
	}
}
