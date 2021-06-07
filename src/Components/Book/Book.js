import React from 'react';
import { Link } from 'react-router-dom';
import BookShelfChanger from '../BookShelfChanger/BookShelfChanger';

const Book = ({ book, changeShelf, history }) => (
   <li>
      <div className="book">
         <div className="book-top">
            <Link to={`/book/${book.id}`} key={book.id}>
               <div
                  className="book-cover"
                  style={{
                     width: 128,
                     height: 193,
                     backgroundImage: `url(${book.imageLinks?.thumbnail})`,
                  }}
               ></div>
            </Link>
            <BookShelfChanger
               changeShelf={changeShelf}
               book={book}
               history={history}
            />
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
