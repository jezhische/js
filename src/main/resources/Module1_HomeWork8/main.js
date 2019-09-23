class Fetch {
  constructor(baseUrl) {
      this.baseUrl = baseUrl;
  }

  // get(url) {
  //     return new Promise((resolve, reject) => {
  //         let xhr = new XMLHttpRequest();
  //         xhr.open('GET', this.baseUrl+url);
  //         xhr.onload = () => {
  //             const response = JSON.parse(xhr.responseText);
  //             resolve(response);
  //         };
  //         xhr.onerror = () => {
  //             const err = JSON.parse(xhr.responseText);
  //             reject(err)
  //         };
  //         xhr.send()
  //     });
  // }
  get(url) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
// 'this' is new Promise object here
      xhr.open('GET', this.baseUrl + url);
      xhr.onload = function () {
// NB: 'this' in this function is an object located before the dot, i.e. xhr. If we want to use 'this' we cannot use
// an arrow function here as it hasn't own 'this'.
// If everything is ok:
        if (this.status >= 200 && this.status < 300) resolve(JSON.parse(this.responseText));
// if we HAVE RECEIVED some response, but response status shows that we cannot obtain the desired result
// (i.e. status code < 200 or >= 300), we can send an object with error data
        else reject ({
          status: this.status,
          statusText: this.statusText
        });
// if we HAVEN'T GOT ANY RESPONSE from server (for example due to disabled internet connection) or our request
// was rejected according cross-site limitations, we still can obtain a certain info about error happened from xhr.onerror:
        xhr.onerror = function () {
          reject({
            status: this.status,
            statusText: this.statusText
          });
        };
      };
      xhr.send();
    });
  }
}


const booksApi = new Fetch('https://www.googleapis.com/books/v1/volumes?:keyes&key=AIzaSyCWhSFi3B68kaQO97mpJw-dUnxXnM47aDc&q=quilting=');



let books = [];
let authorsArr = [];

class Author {
  constructor(name) {
    this.name = name;
    this.id = authorsArr.length;
  };
}

const getBooks = async () => {
  for (let i = 0; i < 5; i++) {
    booksObj = await booksApi.get(i)
// add error handling:
        .then(onfulfilled => onfulfilled, onrejected => {
          console.log(`An error has occurred: ${onrejected.status}: ${onrejected.statusText}`);
        });
    if(!booksObj) return;
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