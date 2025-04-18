import './CategoryDetails.css';
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Loader from '../../components/loader/Loader';

const CategoryDetails = () => {
  const { id } = useParams(); // Get category ID from URL
  const [category, setCategory] = useState(null); // Hold category and books
  const [error, setError] = useState(null); // Track errors

  useEffect(() => {
    fetch(`http://localhost:8000/api/categories/${id}/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch category details');
        }
        return response.json();
      })
      .then((data) => setCategory(data))
      .catch((error) => setError(error.message));
  }, [id]);

  if (!category) {
    return <div><Loader /></div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const books = category.books;

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">{category.name}</h2>
      <div className="row">
        {books && books.length > 0 ? (
          books.map(book => (
            <div className="col-md-3 mb-4" key={book.bookid}>
              <div className="card h-100 shadow">
                <Link to={`/book/${book.bookid}`} className="text-decoration-none text-dark">
                  <img src={`http://127.0.0.1:8000${book.photo}`} className="card-img-top" alt={book.name} />
                  <div className="card-body">
                    <h5 className="card-title">{book.name}</h5>
                    <p className="card-text"><strong>Author:</strong> {book.author}</p>
                    <strong>Price:</strong> {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(book.price)}
                  </div>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center">
            <p>No books available in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryDetails;
