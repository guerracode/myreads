import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import ListBooks from './Pages/ListBooks/ListBooks';
import SearchBooks from './Pages/SearchBooks/SearchBooks';
import BookDescription from './Pages/BookDescription/BookDescription';
import './App.css';

class BooksApp extends Component {
   state = {
      allBooks: [],
      currentlyReading: [],
      wantToRead: [],
      read: [],
   };

   filterBooks = (array, type) =>
      array.filter((item) => {
         return item.shelf === type;
      });

   deleteBook = (book) => {
      this.setState((currentState) => ({
         [book.shelf]: currentState[book.shelf].filter(
            (item) => item.id !== book.id
         ),
      }));
   };

   updateBook = (book, newShelf, errorMessage = 'Error at updating') => {
      BooksAPI.update(book, newShelf).catch(() => window.alert(errorMessage));
   };

   changeShelf = (book, newShelf) => {
      // Delete book
      if (book.shelf && newShelf === 'none') {
         this.deleteBook(book);
         this.updateBook(
            book,
            newShelf,
            "Sorry we had an error, we couldn't remove your book"
         );
         return;
      }

      // Move book to another shelf
      let newBook = '';
      if (book.shelf) this.deleteBook(book);

      newBook = { ...book, shelf: newShelf };

      this.setState((currentState) => ({
         allBooks: [...currentState.allBooks, newBook],
         [newShelf]: [...currentState[newShelf], newBook],
      }));

      this.updateBook(
         newBook,
         newShelf,
         "Sorry we had an error, we couldn't move your book to another shelf"
      );
   };

   componentDidMount() {
      BooksAPI.getAll()
         .then((books) => {
            this.setState({
               allBooks: books,
               currentlyReading: this.filterBooks(books, 'currentlyReading'),
               wantToRead: this.filterBooks(books, 'wantToRead'),
               read: this.filterBooks(books, 'read'),
            });
            console.log('Books', books);
         })
         .catch(() =>
            window.alert("Sorry we had an error, we couldn't get your books")
         );
   }

   render() {
      return (
         <div className="app">
            <Route
               exact
               path="/"
               render={(props) => (
                  <ListBooks
                     changeShelf={this.changeShelf}
                     {...this.state}
                     {...props}
                  />
               )}
            />
            <Route
               exact
               path="/search"
               component={(props) => (
                  <SearchBooks
                     changeShelf={this.changeShelf}
                     allBooks={this.state.allBooks}
                     {...props}
                  />
               )}
            />
            <Route
               path="/book/:id"
               component={(props) => <BookDescription {...props} />}
            />
         </div>
      );
   }
}

export default BooksApp;
