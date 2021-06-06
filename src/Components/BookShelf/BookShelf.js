import React from 'react';
import Book from '../Book/Book';

const BookShelf = ({ shelfName, books, changeShelf }) => (
   <section className="bookshelf">
      <h2 className="bookshelf-title">{shelfName}</h2>
      <div className="bookshelf-books">
         <ol className="books-grid">
            {books.map((book) => (
               <Book book={book} changeShelf={changeShelf} key={book.id} />
            ))}
         </ol>
      </div>
   </section>
);

export default BookShelf;
