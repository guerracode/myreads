import React, { Component } from 'react';
import { get } from '../../BooksAPI';

class BookDescription extends Component {
   constructor(props) {
      super(props);

      this.paramId = this.props.match.params.id;
   }

   state = {
      book: {},
      loading: true,
   };

   componentDidMount() {
      get(this.paramId)
         .then((book) => {
            this.setState({
               book,
               loading: false,
            });
         })
         .catch(() => {
            window.alert("Sorry we couldn't get the book");
         });
   }

   render() {
      const { book } = this.state;

      return this.state.loading ? (
         <h4>Loading</h4>
      ) : (
         <section className="bookDescription">
            <div className="bookDescription-back">
               <button
                  className="close-search"
                  onClick={() => this.props.history.push('/')}
               >
                  Close
               </button>
            </div>
            <article className="bookDescription-description">
               <div className="bookDescription-left-side">
                  <div className="leftSide-categories">
                     <h4>Categories:</h4>
                     {book.categories?.map((category) => (
                        <p key={category}>{category}</p>
                     ))}
                  </div>
                  <figure className="leftSide-image">
                     <img src={book.imageLinks?.thumbnail} alt="Book" />
                  </figure>
                  <div className="leftSide-authors">
                     <h4>Authors:</h4>
                     {book.authors?.map((author) => (
                        <p key={author}>{author}</p>
                     ))}
                  </div>
               </div>
               <div className="bookDescription-right-side">
                  <div className="rightSide-titles">
                     <p>
                        <span>Section: </span>
                        {book.shelf[0].toUpperCase() +
                           book.shelf
                              .slice(1)
                              .split(/(?=[A-Z])/)
                              .join(' ')}
                     </p>
                     <h1>{book.title}</h1>
                     <h3>{book.subtitle}</h3>
                  </div>
                  <div className="rightSide-info">
                     <p>Language: {book.language}</p>
                     <p>Pages: {book.pageCount}</p>
                     <p>Publisher: {book.publisher}</p>
                  </div>
                  <p>{book.description}</p>
               </div>
            </article>
         </section>
      );
   }
}

export default BookDescription;
