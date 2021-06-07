import React, { Component } from 'react';
import { debounce } from 'throttle-debounce';
import { search } from '../../BooksAPI';
import Book from '../../Components/Book/Book';
import '../BookDescription/BookDescription.css';

class SearchBooks extends Component {
   state = {
      query: '',
      results: [],
      noResults: false,
   };

   search = debounce(500, (inputQuery) => {
      if (inputQuery)
         search(inputQuery).then((searchResult) => {
            if (searchResult?.error) this.setState({ noResults: true });
            else {
               searchResult.forEach((searchItem) => {
                  this.props.allBooks.forEach((all) => {
                     if (all.id === searchItem.id) searchItem.shelf = all.shelf;
                  });
               });

               this.setState({
                  results: searchResult,
                  noResults: false,
               });
            }
         });
      else
         this.setState({
            results: [],
         });
   });

   updateQuery = (query) => {
      this.setState({
         query,
      });
      this.search(query);
   };

   render() {
      const { changeShelf, history } = this.props;

      return (
         <div className="search-books">
            <div className="search-books-bar">
               <button
                  className="close-search"
                  onClick={() => this.props.history.push('/')}
               >
                  Close
               </button>
               <div className="search-books-input-wrapper">
                  <input
                     type="text"
                     placeholder="Search by title or author"
                     onChange={(event) => this.updateQuery(event.target.value)}
                     value={this.state.query}
                  />
               </div>
            </div>
            <div className="search-books-results">
               {this.state.noResults ? (
                  <ol className="books-grid">No Results Found...</ol>
               ) : (
                  <ol className="books-grid">
                     {this.state.results.map((book) => (
                        <Book
                           book={book}
                           changeShelf={changeShelf}
                           key={book.id}
                           history={history}
                        />
                     ))}
                  </ol>
               )}
            </div>
         </div>
      );
   }
}
export default SearchBooks;
