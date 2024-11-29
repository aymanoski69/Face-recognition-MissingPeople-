import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
function LogIn() {
  // State to store form input values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh on form submit

    // Basic validation (You can add more robust validation here)
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    // Clear any previous errors
    setError('');

    // Mock Login process (replace this with actual authentication logic)
    console.log('Logging in with:', { email, password });

    // Perform backend authentication here
    // E.g., sending the credentials to a server with an API call

    // Reset the form fields after successful login (optional)
    setEmail('');
    setPassword('');
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        {error && <p className='error'>{error}</p>}

        <button type="submit" class="btn btn-primary">LogIn</button>
      </form>
      <p className="signup-link">
        Don't have an account? <Link to="/SignUp">Sign Up</Link>
      </p>
    </div>
  );
}

export default LogIn;
