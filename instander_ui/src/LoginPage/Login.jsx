import React from 'react';
import './Login.css'; // Import the CSS for styling

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login to Instander</h2>
        <form>
          <div className="form-group">
            <label htmlFor="username">Username or Phone number</label>
            <input type="text" id="username" name="username" aria-label="Phone number, username or email address" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit">Login</button>
        </form>
        <br />
        <hr />
        <p> OR </p>
        <p> Login with something (coming soon) </p>
        <p>
          Don't have an account? <a href="/register">Register here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
