import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BookShelf from '../BookShelf/BookShelf';

class ListBooks extends Component {
   static propTypes = {
      currentlyReading: PropTypes.array.isRequired,
      wantToRead: PropTypes.array.isRequired,
      read: PropTypes.array.isRequired,
   };

   render() {
      const { currentlyReading, wantToRead, read, changeShelf, history } =
         this.props;

      return (
         <div className="list-books">
            <div className="list-books-title">
               <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
               <BookShelf
                  shelfName="Currently Reading"
                  books={currentlyReading}
                  changeShelf={changeShelf}
                  history={history}
               />
               <BookShelf
                  shelfName="Want to Read"
                  books={wantToRead}
                  changeShelf={changeShelf}
                  history={history}
               />
               <BookShelf
                  shelfName="Read"
                  books={read}
                  changeShelf={changeShelf}
                  history={history}
               />
            </div>
            <div className="open-search">
               <button onClick={() => this.props.history.push('/search')}>
                  Add a book
               </button>
            </div>
         </div>
      );
   }
}

export default ListBooks;
