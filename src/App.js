import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import ListBooks from './Components/ListBooks/ListBooks';
import SearchBooks from './Components/SearchBooks/SearchBooks';
import './App.css';

class BooksApp extends Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
  };

  render() {
    return (
      <div className='app'>
        <Route exact path='/' component={ListBooks} />
        <Route exact path='/search' component={SearchBooks} />
      </div>
    );
  }
}

export default BooksApp;
