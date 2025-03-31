import React, { useState, useEffect } from 'react';
import './booklist.css'
import axios from 'axios';

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/books/')
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => console.error("Error fetching books!", error));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Book Store</h2>
      <div className="row">
        {books.map(book => (
          <div className="col-md-3 mb-4" key={book.bookid}>
            <div className="card h-100 shadow">
              <img src={`http://127.0.0.1:8000${book.photo}`} className="card-img-top" alt={book.name} />
              <div className="card-body">
                <h5 className="card-title">{book.name}</h5>
                <p className="card-text"><strong>Author:</strong> {book.author}</p>
                <p className="card-text"><strong>Price:</strong> ${book.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
