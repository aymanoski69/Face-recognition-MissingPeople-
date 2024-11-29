import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignUp.css'
function SignUp() {
  // State to store form input values
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh on form submit

    // Basic validation (You can add more robust validation here)
    if (!username || !email || !password) {
      setError('Please fill in all fields');
      return;
    }

    // Clear any previous errors
    setError('');

    // Mock sign-in process (replace this with actual registration logic)
    console.log('Signing in with:', { username, email, password });

    // Reset the form fields after successful sign-in (optional)
    setUsername('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="signin-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>
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

        <button type="submit" class="btn btn-success">Sign Up</button>
      </form>
      <p className="login-link">
        Already have an account? <Link to="/Login">Login In</Link>
      </p>
    </div>
  );
}

export default SignUp;
