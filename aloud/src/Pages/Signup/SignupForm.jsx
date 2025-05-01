import './SignupForm.css'
import React, { useState } from 'react';
import axios from 'axios';

const SignupForm = () => {
    const [form, setForm] = useState({
      username: '',
      email: '',
      phone_number: '',
      password: '',
    });
  
    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  
    const handleSubmit = async e => {
      e.preventDefault();
      try {
        await axios.post('http://localhost:8000/api/register/', form);
        alert('Signup successful! Proceed to login.');
      } catch (err) {
        alert('Error signing up.');
      }
    };
  
    return (
      <form onSubmit={handleSubmit} className="container mt-4">
        <h2>Sign Up</h2>
        {['username', 'email', 'phone_number', 'password'].map((field) => (
          <div className="form-group" key={field}>
            <label>{field.replace('_', ' ').toUpperCase()}</label>
            <input
              type={field === 'password' ? 'password' : 'text'}
              className="form-control"
              name={field}
              value={form[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    );
  };
  
  export default SignupForm;