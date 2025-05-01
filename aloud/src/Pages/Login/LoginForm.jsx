import './LoginForm.css'
import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/login/', form);
      window.location.href = res.data.redirect_url;
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <h2>Login</h2>
      <div className="form-group">
        <label>Email</label>
        <input type="email" className="form-control" name="email" onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input type="password" className="form-control" name="password" onChange={handleChange} required />
      </div>
      <button type="submit" className="btn btn-success">Login</button>
    </form>
  );
};

export default LoginForm;