import './CategoryDetails.css';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../../components/loader/Loader';

const CategoryDetails = () => {
    const { id } = useParams(); // Get the category ID from the URL params
    const [category, setCategory] = useState(null); // State to hold category data
    const [error, setError] = useState(null); // State to track any errors during fetch

    // Fetch category details based on the ID when the component mounts or the ID changes
    useEffect(() => {
        fetch(`http://localhost:8000/api/categories/${id}/`) // Update the URL if needed
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch category details');
                }
                return response.json();
            })
            .then((data) => setCategory(data)) // Store category data in the state
            .catch((error) => setError(error.message)); // Catch any errors and update the error state
    }, [id]); // Dependency array ensures this runs when `id` changes

    // Display loading text until the category data is fetched
    if (!category) {
        return <div><Loader/></div>;
    }

    // Handle errors if any
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="category-details">
            <h1><center>{category.name}</center></h1> {/* Display category name */}
            {/* You can add more category details here, like description, items, etc. */}
            {/* Example: If there's more info */}
            {/* <p>{category.description}</p> */}
        </div>
    );
};

export default CategoryDetails;
