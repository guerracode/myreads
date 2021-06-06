import React from 'react';
import BookShelfChanger from '../BookShelfChanger/BookShelfChanger';

const Book = ({ book, changeShelf }) => (
  <li>
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${book.imageLinks?.thumbnail})`,
          }}
        ></div>
        <BookShelfChanger changeShelf={changeShelf} book={book} />
      </div>
      <div className="book-title">{book.title && book.title}</div>
      {book.authors?.map((author) => (
        <div className="book-authors" key={author}>
          {author}
        </div>
      ))}
    </div>
  </li>
);

export default Book;
