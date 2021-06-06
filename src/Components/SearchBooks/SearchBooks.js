import React, { Component } from 'react';
import { search } from '../../BooksAPI';
import Book from '../Book/Book';

class SearchBooks extends Component {
  state = {
    query: '',
    results: [],
    noResults: false,
  };

  handleSearch = (inputQuery) => {
    this.setState({
      query: inputQuery,
    });

    if (inputQuery)
      search(inputQuery).then((res) => {
        console.log('Search', res);
        res?.error
          ? this.setState({ noResults: true })
          : this.setState({
              results: res,
              noResults: false,
            });
      });
    else
      this.setState({
        results: [],
      });
  };

  render() {
    const { changeShelf } = this.props;

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
              onChange={(event) => this.handleSearch(event.target.value)}
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
                <Book book={book} changeShelf={changeShelf} key={book.id} />
              ))}
            </ol>
          )}
        </div>
      </div>
    );
  }
}
export default SearchBooks;
