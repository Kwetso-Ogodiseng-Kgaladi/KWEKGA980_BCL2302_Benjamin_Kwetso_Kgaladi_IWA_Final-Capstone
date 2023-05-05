  //imported the data from data.js to scripts.js
  import { authors, genres, books, } from "./data.js"
 
const matches = books
let page = 1;

if (!books && !Array.isArray(books)) {throw new Error('Source required') }
if (!page && page.length < 2) {throw new Error('Range must be an array with two numbers')}

//declared the variables
const day = {
    dark: '10, 10, 20',
    light: '255, 255, 255',
}
const night = {
    dark: '255, 255, 255',
    light: '10, 10, 20',
}
const fragment = document.createDocumentFragment()
let startIndex = 0;
let endIndex = 36;
const extracted = books.slice(startIndex, endIndex)

for (let i = 0; i < extracted.length; i++) {
    const preview = document.createElement('dl')
    preview.className = 'preview'
    preview.dataset.id = books[i].id
    preview.dataset.title = books[i].title
    preview.dataset.image = books[i].image
    preview.dataset.subtitle = `${authors[books[i].author]} (${(new Date(books[i].published)).getFullYear()})`
    preview.dataset.description = books[i].description
    preview.dataset.genre = books[i].genres

    //creates a template to structure the html then append the preview to fragment
    preview.innerHTML= /*html*/`
    <div>
    <image class='preview__image' src="${books[i].image}" alt="book pic"}/>
    </div>
    <div class='preview__info'>
    <dt class='preview__title'>${books[i].title}<dt>
    <dt class='preview__author'> By ${authors[books[i].author]}</dt>
    </div>`
     //console.log(preview)
    fragment.appendChild(preview)
    }
const booklist1 = document.querySelector('[data-list-items]')
booklist1.appendChild(fragment)
//for the buttons
const searchbutton = document.querySelector("[data-header-search]");
searchbutton.addEventListener('click', (event) => {
 document.querySelector("[data-search-overlay]").style.display = "block";
})
const searchCancel = document.querySelector("[data-search-cancel]");
searchCancel.addEventListener('click', (event) => {
 document.querySelector("[data-search-overlay]").style.display = "none";
})
//Settings
const settingbutton = document.querySelector("[data-header-settings]")
settingbutton.addEventListener('click', (event) => {
 document.querySelector("[data-settings-overlay]").style.display = "block";
})
const settingCancel = document.querySelector('[data-settings-cancel]')
settingCancel.addEventListener('click', (event) => {
document.querySelector("[data-settings-overlay]").style.display = "none";
})

//to change theme to dark or light
const dataSettingsTheme = document.querySelector('[data-settings-theme]')
const saveButton = document.querySelector("body > dialog:nth-child(5) > div > div > button.overlay__button.overlay__button_primary")
saveButton.addEventListener('click', (event) =>{
    event.preventDefault()

  if (dataSettingsTheme.value === 'day') {
    document.querySelector('body').style.setProperty('--color-dark', day.dark)
    document.querySelector('body').style.setProperty('--color-light', day.light)
    document.querySelector("[data-settings-overlay]").style.display = "none";
  }
  if (dataSettingsTheme.value === 'night') {
    document.querySelector('body').style.setProperty('--color-dark', night.dark)
    document.querySelector('body').style.setProperty('--color-light', night.light)
    document.querySelector("[data-settings-overlay]").style.display = "none";
      }
} )
//search options
const authorSelect = document.querySelector("[data-search-authors]");
for (const authorId in authors) {
  const optionElement = document.createElement('option')
  optionElement.value = authorId
  optionElement.textContent = authors[authorId]
  authorSelect.appendChild(optionElement)
}
const genreSelect = document.querySelector("[data-search-genres]");
for (const genreId in genres) {
  const optionElement = document.createElement('option')
  optionElement.value = genreId
  optionElement.textContent = genres[genreId]
//   console.log( optionElement.value +' '+ optionElement.textContent)
  genreSelect.appendChild(optionElement)
}
//for the books to display their details
//code to display book details
const detailsToggle = (event) => {
    const overlay1 = document.querySelector('[data-list-active]');
    const title = document.querySelector('[data-list-title]')
    const subtitle = document.querySelector('[data-list-subtitle]')
 const description = document.querySelector('[data-list-description]')
    const image1 = document.querySelector('[data-list-image]')
    const imageblur = document.querySelector('[data-list-blur]')

    event.target.dataset.id ? overlay1.style.display = "block" : undefined;
    event.target.dataset.description ? description.innerHTML = event.target.dataset.description : undefined;
    event.target.dataset.subtitle ? subtitle.innerHTML = event.target.dataset.subtitle : undefined;
    event.target.dataset.title ? title.innerHTML = event.target.dataset.title : undefined;
    event.target.dataset.image ? image1.setAttribute ('src', event.target.dataset.image) : undefined;
    event.target.dataset.image ? imageblur.setAttribute ('src', event.target.dataset.image) : undefined;
};
const detailsClose = document.querySelector('[data-list-close]')
detailsClose.addEventListener('click', (event) => {
document.querySelector("[data-list-active]").style.display = "none";
})
const bookclick = document.querySelector('[data-list-items]')
bookclick.addEventListener('click', detailsToggle)

const showMoreButton = document.querySelector('[data-list-button]')
    // Update the text of the "Show More" button to display how many more items will be displayed
    const numItemsToShow = Math.min(books.length - endIndex,)
    const showMoreButtonText = `Show More <span style="opacity: 0.5">(${numItemsToShow})</span>`
    showMoreButton.innerHTML = showMoreButtonText
showMoreButton.addEventListener('click', () => {
    const fragment = document.createDocumentFragment()
    startIndex += 36;
    endIndex += 36;
    const startIndex1 = startIndex
    const endIndex1 = endIndex
    //console.log(startIndex1)
    //console.log(endIndex1)
    const extracted = books.slice(startIndex1, endIndex1)

    for (const {author ,image, title, id , description, published} of extracted) {
        const preview = document.createElement('dl')
        preview.className = 'preview'
        preview.dataset.id = id
        preview.dataset.title = title
        preview.dataset.image = image
        preview.dataset.subtitle = `${authors[author]} (${(new Date(published)).getFullYear()})`
        preview.dataset.description = description

        // preview.dataset.genre = genres
        preview.innerHTML= /*html*/`
        <div>
        <image class='preview__image' src="${image}" alt="book pic"}/>
        </div>
        <div class='preview__info'>
        <dt class='preview__title'>${title}<dt>
        <dt class='preview__author'> By ${authors[author]}</dt>
        </div>`
        fragment.appendChild(preview)
    }

    booklist1.appendChild(fragment)

})

// const booklist1 = document.querySelector('[data-list-items]')
//     booklist1.appendChild(fragment)
//     // Update the text of the "Show More" button to display how many more items will be displayed
//     const numItemsToShow = Math.min(books.length - endIndex,)
// const showMoreButtonText = `Show More <span style="opacity: 0.5">(${numItemsToShow})</span>`
// showMoreButton.innerHTML = showMoreButtonText;


dataSearchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    searchOverlay.open = false
    dataListItems.innerHTML = '';
    dataSearchResults.innerHTML = '';
const formData = new FormData(event.target)
const title = formData.get('title');
const genre = formData.get('genre');
const author = formData.get('author');
const filteredBooks = [];
for (let i = 0; i < books.length; i++) {
  const book = books[i];
  if (genre === 'any' && author === 'any') {
   if (book.title.toLowerCase().includes(title.toLowerCase())){
    filteredBooks.push(book);
   }
  }
  if (genre === 'any') {
    if (book.title.toLowerCase().includes(title.toLowerCase()) && book.author === author){
     filteredBooks.push(book);
    }
   }
   if (title === '') {
    if (book.author === author && book.genres.includes(genre)){
     filteredBooks.push(book);
    }
   }
   if (title === '' && author === 'any' ) {
    if (book.genres.includes(genre)){
     filteredBooks.push(book);
    }
   }
   if(filteredBooks.length > 0 ){
    dataErrorMessage.style.display = 'none'
}else{
    dataErrorMessage.style.display = 'block'
}
}
for(const { author, image, title, id }of filteredBooks){
    let element = document.createElement('button');
    element.classList = 'preview';
    element.setAttribute('data-preview', id);
    element.innerHTML =
     `<img
        class="preview__image"
        src="${image}"
        />
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[author]}</div>
        </div>
        `;
    fragment.appendChild(element);
    dataSearchResults.appendChild(fragment);}
    document.querySelector('[data-search-form]').reset()
    document.querySelector("[data-backdrop]").style.display = "none";
})






