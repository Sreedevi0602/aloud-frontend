import React, { useState, useEffect } from 'react';
import './BookDetail.css'
import { useParams } from 'react-router-dom'; // To access the dynamic route parameter
import axios from 'axios';
import Loader from '../../components/loader/Loader';

const BookDetail = () => {
  const { id } = useParams(); // Get the book id from the URL
  const [book, setBook] = useState(null);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/books/${id}/`)
      .then(response => {
        setBook(response.data);
      })
      .catch(error => console.error("Error fetching book details!", error));
  }, [id]);

  if (!book) return <div><Loader/></div>; // Show loading state while fetching data

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Book Details</h2>
      <div className="row">
        <div className="col-md-6">
          <img src={`http://127.0.0.1:8000${book.photo}`} alt={book.name} className="img-fluid" />
        </div>
        <div className="col-md-6">
          <h3>{book.name}</h3>
          <p><strong>Book ID:</strong> {book.bookid}</p>
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Price:</strong> {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(book.price)}</p>
          <p><strong>Description:</strong></p>
          <p>{book.description}</p>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
