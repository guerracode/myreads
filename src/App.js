import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import ListBooks from './Components/ListBooks/ListBooks';
import SearchBooks from './Components/SearchBooks/SearchBooks';
import './App.css';

class BooksApp extends Component {
  state = {
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

  changeShelf = (book, newShelf) => {
    let newBook = '';
    if (book.shelf) {
      this.deleteBook(book);
      newBook = { ...book, shelf: newShelf };
    }
    this.setState((currentState) => ({
      [newShelf]: [...currentState[newShelf], newBook || book],
    }));

    BooksAPI.update(book, newShelf)
      .then((res) => {
        console.log('Update', res);
      })
      .catch(() =>
        window.alert(
          "Sorry we had an error we couldn't move your book to another shelf"
        )
      );
  };

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({
          currentlyReading: this.filterBooks(books, 'currentlyReading'),
          wantToRead: this.filterBooks(books, 'wantToRead'),
          read: this.filterBooks(books, 'read'),
        });
        console.log('Books', books);
      })
      .catch(() =>
        window.alert("Sorry we had an error we couldn't get your books")
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
              {...this.state}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
