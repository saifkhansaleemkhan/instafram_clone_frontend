import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './LoginPage/Login';
import Register from './RegistrationPage/Register'

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
