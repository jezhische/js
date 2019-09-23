class Fetch {
  constructor(baseUrl) {
      this.baseUrl = baseUrl;
  }

  get(url) {
      return new Promise((resolve, reject) => {
          let xhr = new XMLHttpRequest();
          xhr.open('GET', this.baseUrl+url);
          xhr.onload = () => {
              const response = JSON.parse(xhr.responseText);
              resolve(response);
          }
          xhr.onerror = () => {
              const err = JSON.parse(xhr.responseText);
              reject(err)
          }
          xhr.send()
      });
  }
};


const booksApi = new Fetch('https://www.googleapis.com/books/v1/volumes?:keyes&key=AIzaSyCWhSFi3B68kaQO97mpJw-dUnxXnM47aDc&q=quilting=');



let books = [];
let authorsArr = [];

class Author {
  constructor(name) {
    this.name = name;
    this.id = authorsArr.length;
  };
};

const getBooks = async () => {
  for (let i = 0; i < 5; i++) {
    booksObj = await booksApi.get(i);
    let tenBooks = await booksObj.items;
    tenBooks.forEach(book => {

      if (book.volumeInfo.authors && book.volumeInfo.authors.length) {
        book.volumeInfo.authors.forEach((author, authorIndex, arr) => {
          let foundAuth = authorsArr.find(auth => auth.name == author);

          if (!foundAuth) {
            foundAuth = new Author(author);
            authorsArr.push(foundAuth);
          }

          arr[authorIndex] = foundAuth.id;
        });
      }

    });
    books.push(...tenBooks);
  }
  console.log(books.length, books, authorsArr);
};