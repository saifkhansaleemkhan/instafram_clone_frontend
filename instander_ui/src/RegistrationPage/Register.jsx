import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // Import the CSS file for styling

const Register = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(''); // Add error message state
  const [successMessage, setSuccessMessage] = useState(''); // Add success message state
  const [countdown, setCountdown] = useState(5); // Add countdown state


  useEffect(() => {
    if (successMessage) {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(timer);
            navigate('/');
            return 0;
          }
          return prevCountdown - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [successMessage, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      username,
      email,
      password
    };

    try {
      const response = await fetch('https://instabookappserver.azurewebsites.net/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const responseData = await response.json();

      if (response.ok) {
        // Redirect to the login page after successful registration
        setSuccessMessage(responseData.message || 'Registration successful.');
        setErrorMessage('');
        // Redirect to the login page after 5 seconds
        setTimeout(() => {
          navigate('/');
        }, 5000);
      } else {
        setErrorMessage(responseData.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Registration for Instander</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && (
            <div className="error-message" style={{ color: 'red' }}>
              {errorMessage}
            </div>
          )}
          {successMessage && (
            <div className="success-message" style={{ color: 'green' }}>
              {successMessage} Redirecting to login page in {countdown} seconds...
            </div>
          )}
          <br/>
          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account? <a href="/">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
