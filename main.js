const url = 'https://js-examples.vercel.app/books.json'
// const url =
//     'https://gist.githubusercontent.com/nanotaboada/6396437/raw/82dca67cc3b6a5ccfcf8af012664cdaa0025d999/books.json'
function getGBasedonLocation() {
  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position.coords)
    const height = position.coords.altitude
    const latitude = position.coords.latitude
    const sin2Φ = Math.sin(2 * latitude)
    const equatorGravity = 9.780327
    const GRS80_A = 0.0053024 * Math.pow(sin2Φ, 2)
    const GRS80_B = 0.0000058 * sin2Φ
    const IGF = equatorGravity * (1 + GRS80_A - GRS80_B)
    const FAC = -3.086e-6 * height
    const localG = IGF + FAC
    console.log(IGF, FAC)

    document.getElementsByTagName('output')[0].textContent = localG
  })
}

async function loadBooks() {
  const books = fetch(url)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      return data
    })
    .catch((error) => {
      return error
    })
  console.log(books)
  return books
}
let bookList = []

function showBooks(columns, tableReference, data) {
  let header = document.createElement('thead')
  header.insertRow()
  for (const column of columns) {
    let headerCell = document.createElement('th')
    const sortButton = `
    <button name="sort" onclick="updateSort()">
      ↓
    </button>
    `
    headerCell.innerHTML =
      column === 'Name' ? `${column} ${sortButton}` : column
    header.appendChild(headerCell)
  }
  tableReference.appendChild(header)
  let body = document.createElement('tbody')
  data.forEach((book) => {
    let row = document.createElement('TR')
    let cell1 = row.insertCell(0)
    let cell2 = row.insertCell(1)
    cell1.innerHTML = book.title
    cell2.innerHTML = book.author

    body.appendChild(row)
  })
  tableReference.appendChild(body)
}
function updateBooks(tableReference, data) {
  let newBody = document.createElement('tbody')
  data.forEach((book) => {
    let row = document.createElement('TR')
    let cell1 = row.insertCell(0)
    let cell2 = row.insertCell(1)
    cell1.innerHTML = book.title
    cell2.innerHTML = book.author

    newBody.appendChild(row)
  })
  tableReference.replaceChild(newBody, tableReference.tBodies[0])
}

async function loadAndShowBooks() {
  bookList = await loadBooks()
  let uniquebookList = getUnique(bookList)
  const columns = ['Name', 'Author']
  const tableReference = document.getElementsByTagName('table')[0]
  if (bookList.length > 0) {
    showBooks(columns, tableReference, uniquebookList)
  }
}
// function sleep(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms))
// }
function updateSort() {
  const tableReference = document.getElementsByTagName('table')[0]
  const newList = getUnique(bookList).sort((a, b) =>
    a.title > b.title ? 1 : b.title > a.title ? -1 : 0
  )
  updateBooks(tableReference, newList)
}
function updateSearch(value) {
  const newList = getUnique(bookList).filter((book) => {
    return book.title.includes(value)
  })
  const tableReference = document.getElementsByTagName('table')[0]
  updateBooks(tableReference, newList)
}

getUnique = (array) => {
  const arrayStringified = array.map((item) => JSON.stringify(item))
  return [...new Set(arrayStringified)].map((item) => JSON.parse(item))
}
