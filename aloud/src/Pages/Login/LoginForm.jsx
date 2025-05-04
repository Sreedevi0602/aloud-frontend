/*import './LoginForm.css'
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
*/
/*
import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getCSRFToken } from "../../utils/csrf"; 

const LoginForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Fetch CSRF token from backend
      await getCSRFToken();

      // Step 2: Attempt login with credentials
      const response = await axios.post(
        "http://localhost:8000/api/login/",
        { email, password },
        { withCredentials: true } // Sends cookies like csrftoken
      );

      if (response.data.success) {
        // Optional: store user data or token
        navigate("/"); // Redirect to user home or dashboard
      } else {
        setError("Login failed: Invalid credentials");
      }
    } catch (err) {
      setError(
        err.response?.data?.detail || "Login failed: Something went wrong"
      );
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h5" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleLogin}>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && (
          <Typography color="error" variant="body2" align="center">
            {error}
          </Typography>
        )}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
    </Container>
  );
};

export default LoginForm;
*/

import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getCSRFToken } from "../../utils/csrf";

const LoginForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Step 1: Fetch CSRF token from backend
      await getCSRFToken();

      // Step 2: Attempt login with credentials
      const response = await axios.post(
        "http://localhost:8000/api/login/",
        { email, password },
        { withCredentials: true }
      );

      // Step 3: Check if redirect_url is present (means login succeeded)
      const redirectUrl = response.data.redirect_url;

      if (redirectUrl) {
        // If it's a full URL, use window.location.href
        if (redirectUrl.startsWith("http")) {
          window.location.href = redirectUrl;
        } else {
          // Otherwise treat it as a relative route and use navigate
          navigate(redirectUrl);
        }
      } else {
        setError("Login failed: Invalid credentials");
      }
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Login failed: Invalid credentials or server error"
      );
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h5" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleLogin}>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && (
          <Typography color="error" variant="body2" align="center">
            {error}
          </Typography>
        )}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
    </Container>
  );
};

export default LoginForm;

