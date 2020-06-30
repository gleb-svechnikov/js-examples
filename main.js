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

function loadBooks() {
  const books = fetch(url)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      console.log(data)
    })
    .catch((error) => {
      return error
    })
  console.log(books)
  return books
}

function loadAndShowBooks() {
  fetch(url)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      console.log(data)
      // document.getElementsByTagName('pre')[0].textContent = JSON.stringify(
      //   data,
      //   null,
      //   2
      // )
      const tableReference = document.getElementsByTagName('table')[0]
      const columns = ['Name', 'Author']
      let header = document.createElement('thead')
      header.insertRow()
      for (let i = 0; i < columns.length; i++) {
        let headerCell = document.createElement('th')
        headerCell.align = 'left'
        headerCell.innerHTML = columns[i]
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
    })
    .catch(function (err) {
      console.log(err)
    })
}
