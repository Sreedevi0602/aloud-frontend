import './CategoryList.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, Grid } from '@mui/material';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8000/api/categories/')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Fetched Categories:', data);
                setCategories(data);
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
                setError(error.message);
            });
    }, []);

    return (
        <div className="category-list">
            {error && <p>Error: {error}</p>}
            {categories.length === 0 ? (
                <p>No categories available</p>
            ) : (
                <Grid container spacing={3} justifyContent="center" padding={3}>
                    {categories.map((category) => (
                        <Grid item xs={12} sm={6} md={3} lg={3} key={category.id}>
                            <Link to={`/category/${category.id}`} style={{ textDecoration: 'none' }}>
                                <Card style={{ height: '18rem', width: '22rem' }}>
                                    <CardMedia
                                        component="img"
                                        height="215"
                                        image={category.image}  // ✅ Using full URL directly
                                        alt={category.name}
                                    />
                                    <CardContent style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Typography variant="h5" component="div" align="center">
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
