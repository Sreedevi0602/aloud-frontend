import './CategoryList.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, Grid } from '@mui/material';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null); // To track if there's an error

    // Fetch categories from the backend
    useEffect(() => {
        fetch('http://localhost:8000/api/categories/')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();  // Parse the response as JSON
            })
            .then((data) => {
                console.log('Fetched Categories:', data);  // Log the response data
                setCategories(data);  // Update the state with fetched categories
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
                setError(error.message);  // Set the error state in case of failure
            });
    }, []);  // Empty array means this effect will run once when the component mounts

    return (
        <div className="category-list">
            {error && <p>Error: {error}</p>} {/* Display error message if there's an error */}
            {categories.length === 0 ? (
                <p>No categories available</p>  // Show message when there are no categories
            ) : (
                <Grid container spacing={3}>
                    {categories.map((category) => (
                        <Grid item xs={12} sm={6} md={3} lg={3} key={category.id}>
                            <Link to={`/category/${category.id}`} style={{ textDecoration: 'none' }}>
                                <Card style={{ height: '10rem', width: '18rem' }}>
                                    {/* Image part of the card */}
                                    <CardMedia
                                        component="img"
                                        height="80%"  // Take up 80% of the card height
                                        image={`https://via.placeholder.com/400x200?text=${category.name}`} // Placeholder image, replace with actual image URL if needed
                                        alt={category.name}
                                    />
                                    {/* Category name part of the card */}
                                    <CardContent style={{ height: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Typography variant="h4" component="div" align="center">
                                            {category.name}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            )}
        </div>
    );
};

export default CategoryList;
